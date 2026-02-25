import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import './QuizQuestions.css';

const QuizQuestions = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { showToast } = useCart();

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);

    const [questionForm, setQuestionForm] = useState({
        questionText: '',
        questionType: 'mcq',
        points: 1,
        explanation: '',
        options: [
            { optionText: '', isCorrect: false },
            { optionText: '', isCorrect: false },
            { optionText: '', isCorrect: false },
            { optionText: '', isCorrect: false }
        ]
    });

    useEffect(() => {
        if (quizId) {
            fetchQuiz();
        }
    }, [quizId]);

    const fetchQuiz = async () => {
        try {
            setLoading(true);
            const response = await apiService.request(`/api/quizzes/${quizId}`);
            setQuiz(response.data);
        } catch (error) {
            showToast('Failed to load quiz', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();

        // Validate at least one correct answer
        const hasCorrect = questionForm.options.some(opt => opt.isCorrect);
        if (!hasCorrect) {
            showToast('Please mark at least one correct answer', 'error');
            return;
        }

        // Filter out empty options
        const validOptions = questionForm.options.filter(opt => opt.optionText.trim());
        if (validOptions.length < 2) {
            showToast('Please provide at least 2 options', 'error');
            return;
        }

        try {
            const data = {
                ...questionForm,
                options: validOptions
            };

            if (editingQuestion) {
                await apiService.request(`/api/quizzes/questions/${editingQuestion.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        questionText: data.questionText,
                        questionType: data.questionType,
                        points: data.points,
                        explanation: data.explanation
                    })
                });
                // Note: Updating options would require additional API calls
                showToast('Question updated successfully', 'success');
            } else {
                await apiService.request(`/api/quizzes/${quizId}/questions`, {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                showToast('Question added successfully', 'success');
            }

            setShowModal(false);
            resetForm();
            fetchQuiz();
        } catch (error) {
            showToast(error.message || 'Operation failed', 'error');
        }
    };

    const handleDeleteQuestion = async (questionId) => {
        if (!window.confirm('Are you sure you want to delete this question?')) return;

        try {
            await apiService.request(`/api/quizzes/questions/${questionId}`, { method: 'DELETE' });
            showToast('Question deleted successfully', 'success');
            fetchQuiz();
        } catch (error) {
            showToast(error.message || 'Delete failed', 'error');
        }
    };

    const openEditQuestion = (question) => {
        setEditingQuestion(question);

        // Pad options to 4 if less
        const options = [...(question.options || [])];
        while (options.length < 4) {
            options.push({ optionText: '', isCorrect: false });
        }

        setQuestionForm({
            questionText: question.questionText || '',
            questionType: question.questionType || 'mcq',
            points: question.points || 1,
            explanation: question.explanation || '',
            options: options.map(opt => ({
                optionText: opt.optionText || '',
                isCorrect: opt.isCorrect || false
            }))
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setQuestionForm({
            questionText: '',
            questionType: 'mcq',
            points: 1,
            explanation: '',
            options: [
                { optionText: '', isCorrect: false },
                { optionText: '', isCorrect: false },
                { optionText: '', isCorrect: false },
                { optionText: '', isCorrect: false }
            ]
        });
        setEditingQuestion(null);
    };

    const handleOptionChange = (index, field, value) => {
        setQuestionForm(prev => {
            const newOptions = [...prev.options];
            newOptions[index] = { ...newOptions[index], [field]: value };

            // For MCQ, only one can be correct
            if (field === 'isCorrect' && value && prev.questionType === 'mcq') {
                newOptions.forEach((opt, i) => {
                    if (i !== index) opt.isCorrect = false;
                });
            }

            return { ...prev, options: newOptions };
        });
    };

    const addOption = () => {
        setQuestionForm(prev => ({
            ...prev,
            options: [...prev.options, { optionText: '', isCorrect: false }]
        }));
    };

    const removeOption = (index) => {
        if (questionForm.options.length <= 2) {
            showToast('Need at least 2 options', 'error');
            return;
        }
        setQuestionForm(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }));
    };

    if (loading) {
        return (
            <div className="loading-container">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Loading quiz...</p>
            </div>
        );
    }

    return (
        <div className="quiz-questions-page">
            <div className="page-header">
                <div className="header-left">
                    <button className="btn-back" onClick={() => navigate(-1)}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <div>
                        <h1>Quiz Questions</h1>
                        <p>{quiz?.title || 'Quiz'}</p>
                    </div>
                </div>
                <div className="header-info">
                    <span className="info-badge">
                        <i className="fas fa-question-circle"></i> {quiz?.questions?.length || 0} Questions
                    </span>
                    <span className="info-badge">
                        <i className="fas fa-percentage"></i> Pass: {quiz?.passingScore}%
                    </span>
                </div>
                <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    <i className="fas fa-plus"></i> Add Question
                </button>
            </div>

            <div className="questions-list">
                {(!quiz?.questions || quiz.questions.length === 0) ? (
                    <div className="empty-state">
                        <i className="fas fa-clipboard-question"></i>
                        <h3>No Questions Yet</h3>
                        <p>Add questions to this quiz to assess student knowledge.</p>
                    </div>
                ) : (
                    quiz.questions.map((question, index) => (
                        <div key={question.id} className="question-card">
                            <div className="question-header">
                                <span className="question-number">Q{index + 1}</span>
                                <span className={`question-type ${question.questionType}`}>
                                    {question.questionType === 'mcq' ? 'Multiple Choice' : 'True/False'}
                                </span>
                                <span className="question-points">{question.points} pts</span>
                            </div>

                            <div className="question-text">
                                {question.questionText}
                            </div>

                            <div className="options-list">
                                {question.options?.map((option, optIndex) => (
                                    <div
                                        key={option.id}
                                        className={`option-item ${option.isCorrect ? 'correct' : ''}`}
                                    >
                                        <span className="option-letter">
                                            {String.fromCharCode(65 + optIndex)}
                                        </span>
                                        <span className="option-text">{option.optionText}</span>
                                        {option.isCorrect && (
                                            <i className="fas fa-check-circle correct-icon"></i>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {question.explanation && (
                                <div className="question-explanation">
                                    <i className="fas fa-lightbulb"></i>
                                    <span>{question.explanation}</span>
                                </div>
                            )}

                            <div className="question-actions">
                                <button className="btn-icon" onClick={() => openEditQuestion(question)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn-icon danger" onClick={() => handleDeleteQuestion(question.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Question Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingQuestion ? 'Edit Question' : 'Add Question'}</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={handleQuestionSubmit} className="question-form">
                            <div className="form-group">
                                <label>Question *</label>
                                <textarea
                                    value={questionForm.questionText}
                                    onChange={(e) => setQuestionForm(prev => ({ ...prev, questionText: e.target.value }))}
                                    rows="3"
                                    required
                                    placeholder="Enter your question here..."
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Question Type</label>
                                    <select
                                        value={questionForm.questionType}
                                        onChange={(e) => setQuestionForm(prev => ({ ...prev, questionType: e.target.value }))}
                                    >
                                        <option value="mcq">Multiple Choice</option>
                                        <option value="true_false">True/False</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Points</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={questionForm.points}
                                        onChange={(e) => setQuestionForm(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Options (Mark correct answer)</label>
                                <div className="options-editor">
                                    {questionForm.options.map((option, index) => (
                                        <div key={index} className="option-row">
                                            <span className="option-label">{String.fromCharCode(65 + index)}</span>
                                            <input
                                                type="text"
                                                value={option.optionText}
                                                onChange={(e) => handleOptionChange(index, 'optionText', e.target.value)}
                                                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                            />
                                            <label className="correct-checkbox">
                                                <input
                                                    type={questionForm.questionType === 'mcq' ? 'radio' : 'checkbox'}
                                                    name="correctOption"
                                                    checked={option.isCorrect}
                                                    onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                                                />
                                                <span className="checkmark">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </label>
                                            <button
                                                type="button"
                                                className="btn-remove-option"
                                                onClick={() => removeOption(index)}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className="btn-add-option" onClick={addOption}>
                                        <i className="fas fa-plus"></i> Add Option
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Explanation (shown after answering)</label>
                                <textarea
                                    value={questionForm.explanation}
                                    onChange={(e) => setQuestionForm(prev => ({ ...prev, explanation: e.target.value }))}
                                    rows="2"
                                    placeholder="Explain why this is the correct answer..."
                                />
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    {editingQuestion ? 'Update Question' : 'Add Question'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizQuestions;
