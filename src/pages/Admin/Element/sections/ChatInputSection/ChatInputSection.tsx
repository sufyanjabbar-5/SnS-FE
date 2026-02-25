import React, { useRef, useEffect, KeyboardEvent } from "react";
import {
  ArrowUpIcon,
  ChevronDownIcon,
  MicIcon,
  MoreVerticalIcon,
  PinIcon,
  PlusIcon,
  Loader2Icon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface ChatInputSectionProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: (message: string) => void;
  isSending: boolean;
  error: string | null;
  activeSessionId: number | null;
  selectedCertification: string;
  setSelectedCertification: (value: string) => void;
}

const certifications = [
  { id: "pmi-pfmp", name: "Portfolio Management Professional (PfMP)" },
  { id: "pmi-pgmp", name: "Program Management Professional (PgMP)" },
  { id: "pmi-pmi-acp", name: "PMI Agile Certified Practitioner (PMI-ACP)" },
  { id: "pmi-pmi-cpmai", name: "PMI Certified Project Manager AI (CPMAI)" },
  { id: "pmi-pmi-rmp", name: "PMI Risk Management Professional (RMP)" },
  { id: "pmi-pmp", name: "Project Management Professional (PMP)" }
];

export const ChatInputSection = ({
  messages,
  inputValue,
  setInputValue,
  onSendMessage,
  isSending,
  error,
  activeSessionId,
  selectedCertification,
  setSelectedCertification,
}: ChatInputSectionProps): React.JSX.Element => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle keyboard events
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isSending) {
        onSendMessage(inputValue);
      }
    }
  };

  // Handle send button click
  const handleSend = () => {
    if (inputValue.trim() && !isSending) {
      onSendMessage(inputValue);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [inputValue]);

  const hasMessages = messages.length > 0 || activeSessionId;

  return (
    <section className="flex flex-col items-start px-[15.2px] py-0 flex-1 self-stretch grow overflow-hidden h-screen">
      <header className="flex h-[52px] items-center justify-between p-2 self-stretch w-full bg-[#212121]">
        <div className="flex items-center flex-1 gap-4 grow">
          <div className="relative group ml-2">
            <select
              value={selectedCertification}
              onChange={(e) => setSelectedCertification(e.target.value)}
              className={`bg-transparent text-white border-none outline-none font-segoe font-normal text-lg tracking-[0] leading-7 appearance-none pr-6 ${activeSessionId ? 'cursor-default opacity-80' : 'cursor-pointer'}`}
              style={{ background: 'none' }}
              disabled={!!activeSessionId || isSending}
            >
              {certifications.map((cert) => (
                <option key={cert.id} value={cert.id} className="bg-[#2f2f2f] text-white py-2">
                  {cert.name}
                </option>
              ))}
            </select>
            {!activeSessionId && <ChevronDownIcon className="w-4 h-4 text-white absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />}
          </div>
          <span className="font-segoe font-normal text-white/40 text-sm tracking-[0] leading-7 whitespace-nowrap">
            (AI Study Partner)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"
          >
            <PinIcon className="w-4 h-4 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"
          >
            <MoreVerticalIcon className="w-4 h-4 text-white" />
          </Button>
        </div>
      </header>

      {/* Messages area */}
      <div className="flex-1 w-full overflow-hidden">
        {hasMessages ? (
          <ScrollArea className="h-full w-full">
            <div className="flex flex-col gap-4 p-4 max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-[#2f2f2f] text-white rounded-br-sm"
                        : "bg-[#3b3b3b] text-white rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-[#3b3b3b] text-white px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex items-center gap-2">
                      <Loader2Icon className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="flex justify-center">
                  <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="font-segoe font-normal text-white text-[28px] text-center tracking-[0.38px] leading-[34px] whitespace-nowrap mb-7">
              What can I help with?
            </h1>
            
            {/* Input area - centered for new chat */}
            <div className="flex flex-col items-center w-full max-w-screen-md px-4">
              <div className="flex flex-col items-start self-stretch w-full relative">
                <div className="self-stretch w-full bg-[#303030] rounded-[28px] overflow-hidden shadow-[inset_0px_0px_1px_#ffffff33,0px_4px_12px_#0000001a] relative px-3 py-2.5">
                  {/* Row 1: Textarea */}
                  <div className="w-full mb-2">
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Message AI Study Partner..."
                      className="w-full bg-transparent text-white placeholder-gray-400 text-sm resize-none outline-none focus:outline-none focus:ring-0 border-none min-h-[24px] max-h-[150px]"
                      rows={1}
                      disabled={isSending}
                    />
                  </div>
                  
                  {/* Row 2: All icons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-9 h-9 hover:bg-white/10 shrink-0"
                      >
                        <PlusIcon className="w-4 h-4 text-white" />
                      </Button>
                      <div className="flex items-center gap-1.5">
                        <img
                          className="w-4 h-4"
                          alt="Frame"
                          src="https://c.animaapp.com/mjxh4buzH06Hhf/img/frame.svg"
                          style={{ filter: 'brightness(0) saturate(100%) invert(69%) sepia(24%) saturate(590%) hue-rotate(155deg) brightness(91%) contrast(88%)' }}
                        />
                        <span className="font-segoe font-normal text-[#6BB4CB] text-xs tracking-[0] leading-5 whitespace-nowrap">
                          AI Study Partner
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-9 h-9 hover:bg-white/10"
                      >
                        <MicIcon className="w-4 h-4 text-white" />
                      </Button>
                      <Button
                        size="icon"
                        className={`w-9 h-9 rounded-full transition-colors ${
                          inputValue.trim() && !isSending
                            ? "bg-white hover:bg-white/90"
                            : "bg-gray-600 cursor-not-allowed"
                        }`}
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isSending}
                      >
                        {isSending ? (
                          <Loader2Icon className="w-4 h-4 text-black animate-spin" />
                        ) : (
                          <ArrowUpIcon className="w-4 h-4 text-black" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area - at bottom when there are messages */}
      {hasMessages && (
        <div className="flex flex-col items-center w-full pb-4">
          <div className="flex flex-col items-center w-full max-w-screen-md px-4">
            <div className="flex flex-col items-start self-stretch w-full relative">
              <div className="self-stretch w-full bg-[#303030] rounded-[28px] overflow-hidden shadow-[inset_0px_0px_1px_#ffffff33,0px_4px_12px_#0000001a] relative px-3 py-2.5">
                {/* Row 1: Textarea */}
                <div className="w-full mb-2">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message AI Study Partner..."
                    className="w-full bg-transparent text-white placeholder-gray-400 text-sm resize-none outline-none focus:outline-none focus:ring-0 border-none min-h-[24px] max-h-[150px]"
                    rows={1}
                    disabled={isSending}
                  />
                </div>
                
                {/* Row 2: All icons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-9 h-9 hover:bg-white/10 shrink-0"
                    >
                      <PlusIcon className="w-4 h-4 text-white" />
                    </Button>
                    <div className="flex items-center gap-1.5">
                      <img
                        className="w-4 h-4"
                        alt="Frame"
                        src="https://c.animaapp.com/mjxh4buzH06Hhf/img/frame.svg"
                        style={{ filter: 'brightness(0) saturate(100%) invert(69%) sepia(24%) saturate(590%) hue-rotate(155deg) brightness(91%) contrast(88%)' }}
                      />
                      <span className="font-segoe font-normal text-[#6BB4CB] text-xs tracking-[0] leading-5 whitespace-nowrap">
                        AI Study Partner
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-9 h-9 hover:bg-white/10"
                    >
                      <MicIcon className="w-4 h-4 text-white" />
                    </Button>
                    <Button
                      size="icon"
                      className={`w-9 h-9 rounded-full transition-colors ${
                        inputValue.trim() && !isSending
                          ? "bg-white hover:bg-white/90"
                          : "bg-gray-600 cursor-not-allowed"
                      }`}
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isSending}
                    >
                      {isSending ? (
                        <Loader2Icon className="w-4 h-4 text-black animate-spin" />
                      ) : (
                        <ArrowUpIcon className="w-4 h-4 text-black" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
