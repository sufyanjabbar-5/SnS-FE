import React, { useState, useEffect, useRef } from 'react';
import { useCertifications } from '../../context/CertificationContext';
import { ArrowRight, X } from 'lucide-react';
import './ChatWidget.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ChatWidget = () => {
  const { appInfo: settings } = useCertifications();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatState, setChatState] = useState('intro'); // intro, privacy, email, name, phone, chat
  const [leadData, setLeadData] = useState({ email: '', name: '', phone: '' });
  const [userQuestions, setUserQuestions] = useState([]);
  const [leadId, setLeadId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize with privacy notice
      setMessages([
        {
          text: "By using our chat service, you acknowledge that your data will be monitored and recorded by Pearson VUE and our third-party providers to improve our service, as per our Privacy Notice. Do you wish to proceed?",
          sender: 'bot',
          time: new Date()
        }
      ]);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = (now - date) / 1000 / 60; // difference in minutes

    if (diff < 1) return 'now';
    if (diff < 60) return `${Math.floor(diff)} minute${Math.floor(diff) > 1 ? 's' : ''} ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { text, sender: 'bot', time: new Date() }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { text, sender: 'user', time: new Date() }]);
  };

  const saveLead = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/chat-leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data && result.data.id) {
          setLeadId(result.data.id);
        }
      } else {
        console.error('Failed to save lead');
      }
    } catch (error) {
      console.error('Error saving lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateLeadMessages = async (question) => {
    if (!leadId) return;

    const updatedQuestions = [...userQuestions, question];
    setUserQuestions(updatedQuestions);

    try {
      await fetch(`${API_BASE_URL}/api/chat-leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...leadData,
          messages: updatedQuestions.join(' | ')
        })
      });
    } catch (error) {
      console.error('Error updating lead messages:', error);
    }
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('pmp') || lowerMessage.includes('certification')) {
      return "We offer comprehensive PMP certification training. Would you like to see our class schedule?";
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('class')) {
      return "Our classes are available both online and in-person. Check our schedule page for upcoming sessions!";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Our PMP training starts at $1,299. This includes 35 contact hours and study materials.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone')) {
      return `You can reach us at ${settings.phone} or email ${settings.contactEmail}`;
    } else {
      return `Thanks for your message! Our team will get back to you shortly. You can also call us at ${settings.phone}.`;
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isSubmitting) return;

    const userInput = inputValue.trim();
    addUserMessage(userInput);
    setInputValue('');

    switch (chatState) {
      case 'privacy':
        if (userInput.toLowerCase() === 'yes' || userInput.toLowerCase() === 'y') {
          setTimeout(() => {
            addBotMessage("Hello there! Before we go ahead, can I get your email address? In case we get lost, I can always get back to you.");
          }, 500);
          setChatState('email');
        } else {
          setTimeout(() => {
            addBotMessage(`No problem! Feel free to reach out to us directly at ${settings.contactEmail} or ${settings.phone}.`);
          }, 500);
        }
        break;

      case 'email':
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(userInput)) {
          setLeadData(prev => ({ ...prev, email: userInput }));
          setTimeout(() => {
            addBotMessage("Can I have your First & Last name?");
          }, 500);
          setChatState('name');
        } else {
          setTimeout(() => {
            addBotMessage("That doesn't look like a valid email. Could you please provide your email address?");
          }, 500);
        }
        break;

      case 'name':
        if (userInput.length >= 2) {
          setLeadData(prev => ({ ...prev, name: userInput }));
          setTimeout(() => {
            addBotMessage("Can I have your phone number? It'll help us reach you quicker.");
          }, 500);
          setChatState('phone');
        } else {
          setTimeout(() => {
            addBotMessage("Please provide your full name.");
          }, 500);
        }
        break;

      case 'phone':
        // Phone validation - accepts formats like: 1234567890, 123-456-7890, (123) 456-7890, +1 234 567 8900
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
        const cleanedPhone = userInput.replace(/[\s\-\(\)\.]/g, '');

        if (cleanedPhone.length >= 7 && phoneRegex.test(userInput)) {
          // Save lead with all collected info
          const finalData = { ...leadData, phone: userInput };
          setLeadData(finalData);
          await saveLead(finalData);

          setTimeout(() => {
            addBotMessage("Thank you! How can I help you today? You can ask me about our PMP certification courses, schedules, pricing, or anything else!");
          }, 500);
          setChatState('chat');
        } else {
          setTimeout(() => {
            addBotMessage("That doesn't look like a valid phone number. Please enter a valid phone number (e.g., 123-456-7890 or +1 234 567 8900).");
          }, 500);
        }
        break;

      case 'chat':
      default:
        // Save user question
        updateLeadMessages(userInput);

        setTimeout(() => {
          const response = getBotResponse(userInput);
          addBotMessage(response);
        }, 1000);
        break;
    }
  };

  const getPlaceholder = () => {
    switch (chatState) {
      case 'privacy':
        return 'Type Yes to proceed...';
      case 'email':
        return 'Enter your email address...';
      case 'name':
        return 'Enter your full name...';
      case 'phone':
        return 'Enter your phone number...';
      default:
        return 'Type your message...';
    }
  };

  return (
    <>
      <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="header-content">
            <span className="bot-name">Customer Service Chat Bot</span>
          </div>
          <button onClick={toggleChat} className="close-chat">
            <X size={20} />
          </button>
        </div>

        {chatState === 'intro' ? (
          <div className="chat-intro">
            <div className="intro-card">
              <h2 className="intro-title">Hello 👋 I’m your S&S Chat Bot.</h2>
              <p className="intro-text">
                I’m here to help you for quick questions, use our chat bot.
                For detailed queries, you can schedule a call with our team.
                with courses, admissions, and general information.
              </p>

              <div className="intro-footer">
                <button
                  onClick={() => setChatState('privacy')}
                  className="btn-start"
                >
                  Let’s Start <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message-wrapper ${msg.sender}`}>
                  {msg.sender === 'bot' && (
                    <div className="bot-info">
                      <div className="bot-avatar-small">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23f5a623'/%3E%3Ccircle cx='22' cy='28' r='6' fill='white'/%3E%3Ccircle cx='42' cy='28' r='6' fill='white'/%3E%3Ccircle cx='22' cy='28' r='3' fill='%23333'/%3E%3Ccircle cx='42' cy='28' r='3' fill='%23333'/%3E%3Crect x='18' y='42' width='28' height='8' rx='4' fill='white'/%3E%3Crect x='10' y='8' width='12' height='8' rx='2' fill='%2300bcd4'/%3E%3Crect x='42' y='8' width='12' height='8' rx='2' fill='%2300bcd4'/%3E%3C/svg%3E" alt="Info Bot" />
                      </div>
                      <span className="sender-name">Info Bot</span>
                    </div>
                  )}
                  <div className={`message ${msg.sender}`}>
                    <div className="message-bubble">
                      {msg.text}
                    </div>
                  </div>
                  <div className={`message-time ${msg.sender}`}>
                    {formatTime(msg.time)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="chat-input">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={getPlaceholder()}
                disabled={isSubmitting}
              />
              <button type="submit" disabled={isSubmitting}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </>
        )}
      </div>

      <button
        className={`chat-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <img src="/chat-bubble.svg" alt="Chat" className="chat-bubble-icon" />
      </button>
    </>
  );
};

export default ChatWidget;
