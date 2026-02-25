import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import './TakeQuiz.css';

const TakeQuiz = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { showToast } = useCart();

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [showStart, setShowStart] = useState(true);

    useEffect(() => {
        if (quizId) {
            fetchQuiz();
        }
    }, [quizId]);

    // Timer
    useEffect(() => {
        if (timeRemaining === null || submitted || showStart) return;

        if (timeRemaining <= 0) {
            handleSubmit();
            return;
        }

        const timer = setTimeout(() => {
            setTimeRemaining(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeRemaining, submitted, showStart]);

    const fetchQuiz = async () => {
        try {
            setLoading(true);
            const response = await apiService.request(`/api/quizzes/${quizId}`);
            setQuiz(response.data);

            // Initialize answers array
            if (response.data?.questions) {
                setAnswers(response.data.questions.map(q => ({
                    questionId: q.id,
                    optionId: null
                })));
            }
        } catch (error) {
            showToast('Failed to load quiz', 'error');
        } finally {
            setLoading(false);
        }
    };

    const startQuiz = () => {
        setShowStart(false);
        if (quiz?.timeLimit) {
            setTimeRemaining(quiz.timeLimit * 60);
        }
    };

    const selectAnswer = (questionId, optionId) => {
        setAnswers(prev => prev.map(a =>
            a.questionId === questionId ? { ...a, optionId } : a
        ));
    };

    const handleSubmit = async () => {
        if (submitted) return;

        // Check if all questions answered
        const unanswered = answers.filter(a => a.optionId === null).length;
        if (unanswered > 0 && !window.confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
            return;
        }

        try {
            const response = await apiService.request(`/api/quizzes/${quizId}/submit`, {
                method: 'POST',
                body: JSON.stringify({ answers: answers.filter(a => a.optionId !== null) })
            });

            setResults(response.data);
            setSubmitted(true);
            showToast(response.message || 'Quiz submitted!', response.data?.passed ? 'success' : 'info');
        } catch (error) {
            showToast(error.message || 'Failed to submit quiz', 'error');
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getQuestionResult = (questionId) => {
        return results?.results?.find(r => r.questionId === questionId);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Loading quiz...</p>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="error-container">
                <i className="fas fa-exclamation-triangle"></i>
                <h2>Quiz not found</h2>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    // Start Screen
    if (showStart) {
        return (
            <div className="quiz-start-screen">
                <div className="start-card">
                    <div className="quiz-icon">
                        <i className="fas fa-clipboard-list"></i>
                    </div>
                    <h1>{quiz.title}</h1>
                    {quiz.description && <p className="quiz-desc">{quiz.description}</p>}

                    <div className="quiz-info-grid">
                        <div className="info-item">
                            <i className="fas fa-question-circle"></i>
                            <span>{quiz.questions?.length || 0} Questions</span>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-percentage"></i>
                            <span>Pass: {quiz.passingScore}%</span>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-stopwatch"></i>
                            <span>{quiz.timeLimit ? `${quiz.timeLimit} min` : 'No limit'}</span>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-redo"></i>
                            <span>Max: {quiz.maxAttempts || '∞'} attempts</span>
                        </div>
                    </div>

                    <div className="start-actions">
                        <button className="btn-back-secondary" onClick={() => navigate(-1)}>
                            <i className="fas fa-arrow-left"></i> Go Back
                        </button>
                        <button className="btn-start-quiz" onClick={startQuiz}>
                            Start Quiz <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Results Screen
    if (submitted && results) {
        return (
            <div className="quiz-results-screen">
                <div className="results-card">
                    <div className={`result-header ${results.passed ? 'passed' : 'failed'}`}>
                        <div className="result-icon">
                            <i className={results.passed ? 'fas fa-trophy' : 'fas fa-redo-alt'}></i>
                        </div>
                        <h1>{results.passed ? 'Congratulations!' : 'Keep Practicing!'}</h1>
                        <p>{results.passed ? 'You passed the quiz!' : 'Better luck next time!'}</p>
                    </div>

                    <div className="score-display">
                        <div className="score-circle">
                            <span className="score-value">{results.scorePercentage}%</span>
                            <span className="score-label">Score</span>
                        </div>
                        <div className="score-details">
                            <div className="score-row">
                                <span>Correct</span>
                                <span className="correct">{results.earnedPoints} / {results.totalPoints} pts</span>
                            </div>
                            <div className="score-row">
                                <span>Passing Score</span>
                                <span>{results.passingScore}%</span>
                            </div>
                            <div className="score-row">
                                <span>Attempts Used</span>
                                <span>{results.attempts} / {results.maxAttempts || '∞'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Review Answers */}
                    <div className="review-section">
                        <h3>Review Answers</h3>
                        {quiz.questions?.map((question, index) => {
                            const result = getQuestionResult(question.id);
                            return (
                                <div key={question.id} className={`review-question ${result?.isCorrect ? 'correct' : 'incorrect'}`}>
                                    <div className="review-header">
                                        <span className="q-number">Q{index + 1}</span>
                                        <span className={`q-result ${result?.isCorrect ? 'correct' : 'incorrect'}`}>
                                            {result?.isCorrect ? (
                                                <><i className="fas fa-check"></i> Correct</>
                                            ) : (
                                                <><i className="fas fa-times"></i> Incorrect</>
                                            )}
                                        </span>
                                    </div>
                                    <p className="q-text">{question.questionText}</p>
                                    <div className="review-options">
                                        {question.options?.map(option => (
                                            <div
                                                key={option.id}
                                                className={`review-option 
                          ${option.id === result?.correctOptionId ? 'correct' : ''} 
                          ${option.id === result?.submittedOptionId && !result?.isCorrect ? 'wrong' : ''}
                        `}
                                            >
                                                {option.id === result?.correctOptionId && <i className="fas fa-check"></i>}
                                                {option.id === result?.submittedOptionId && !result?.isCorrect && <i className="fas fa-times"></i>}
                                                {option.optionText}
                                            </div>
                                        ))}
                                    </div>
                                    {result?.explanation && (
                                        <div className="explanation">
                                            <i className="fas fa-lightbulb"></i>
                                            {result.explanation}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="results-actions">
                        <button className="btn-back-secondary" onClick={() => navigate(-1)}>
                            Back to Course
                        </button>
                        {results.attempts < (results.maxAttempts || Infinity) && (
                            <button className="btn-retry" onClick={() => window.location.reload()}>
                                <i className="fas fa-redo"></i> Try Again
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Quiz Taking Screen
    const question = quiz.questions?.[currentQuestion];
    const selectedAnswer = answers.find(a => a.questionId === question?.id)?.optionId;

    return (
        <div className="quiz-taking-screen">
            {/* Header */}
            <div className="quiz-header">
                <button className="btn-exit" onClick={() => {
                    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
                        navigate(-1);
                    }
                }}>
                    <i className="fas fa-times"></i>
                </button>
                <div className="quiz-title">{quiz.title}</div>
                {timeRemaining !== null && (
                    <div className={`timer ${timeRemaining < 60 ? 'warning' : ''}`}>
                        <i className="fas fa-clock"></i>
                        {formatTime(timeRemaining)}
                    </div>
                )}
            </div>

            {/* Progress */}
            <div className="quiz-progress">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${((currentQuestion + 1) / (quiz.questions?.length || 1)) * 100}%` }}
                    ></div>
                </div>
                <span className="progress-text">
                    Question {currentQuestion + 1} of {quiz.questions?.length || 0}
                </span>
            </div>

            {/* Question */}
            <div className="question-container">
                <div className="question-text">
                    {question?.questionText}
                </div>

                <div className="options-container">
                    {question?.options?.map((option, index) => (
                        <button
                            key={option.id}
                            className={`option-btn ${selectedAnswer === option.id ? 'selected' : ''}`}
                            onClick={() => selectAnswer(question.id, option.id)}
                        >
                            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                            <span className="option-text">{option.optionText}</span>
                            {selectedAnswer === option.id && (
                                <i className="fas fa-check-circle"></i>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="quiz-navigation">
                <button
                    className="btn-nav prev"
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                >
                    <i className="fas fa-chevron-left"></i> Previous
                </button>

                <div className="question-dots">
                    {quiz.questions?.map((q, index) => (
                        <button
                            key={q.id}
                            className={`dot ${index === currentQuestion ? 'current' : ''} ${answers[index]?.optionId ? 'answered' : ''}`}
                            onClick={() => setCurrentQuestion(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {currentQuestion < (quiz.questions?.length || 1) - 1 ? (
                    <button
                        className="btn-nav next"
                        onClick={() => setCurrentQuestion(prev => prev + 1)}
                    >
                        Next <i className="fas fa-chevron-right"></i>
                    </button>
                ) : (
                    <button className="btn-submit-quiz" onClick={handleSubmit}>
                        Submit Quiz <i className="fas fa-paper-plane"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

export default TakeQuiz;
