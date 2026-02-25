import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import './StudentLibrary.css';

const StudentLibrary = () => {
    const { certificationId } = useParams();
    const navigate = useNavigate();
    const { showToast } = useCart();

    const [certification, setCertification] = useState(null);
    const [libraryItems, setLibraryItems] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeItem, setActiveItem] = useState(null);
    const [activeTab, setActiveTab] = useState('content');

    useEffect(() => {
        if (certificationId) {
            fetchCertification();
            fetchProgress();
            fetchQuizzes();
        }
    }, [certificationId]);

    const fetchCertification = async () => {
        try {
            const response = await apiService.request(`/api/certifications/detail/${certificationId}`);
            setCertification(response.data);
        } catch (error) {
            showToast('Failed to load certification', 'error');
        }
    };

    const fetchProgress = async () => {
        try {
            setLoading(true);
            const response = await apiService.request(`/api/library/progress/${certificationId}`);
            setProgress(response.data);
            setLibraryItems(response.data?.items || []);

            // Set first incomplete item as active
            const firstIncomplete = response.data?.items?.find(item =>
                !item.progress?.[0]?.isCompleted
            );
            if (firstIncomplete) {
                setActiveItem(firstIncomplete);
            } else if (response.data?.items?.length > 0) {
                setActiveItem(response.data.items[0]);
            }
        } catch (error) {
            console.error('Failed to load progress', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchQuizzes = async () => {
        try {
            const response = await apiService.request(`/api/quizzes/certification/${certificationId}`);
            setQuizzes(response.data || []);
        } catch (error) {
            console.error('Failed to load quizzes', error);
        }
    };

    const handleVideoProgress = async (itemId, watchedDuration) => {
        try {
            await apiService.request(`/api/library/${itemId}/progress`, {
                method: 'PUT',
                body: JSON.stringify({ watchedDuration })
            });
        } catch (error) {
            console.error('Failed to update progress', error);
        }
    };

    const formatDuration = (seconds) => {
        if (!seconds) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'video': return 'fas fa-play-circle';
            case 'document': return 'fas fa-file-pdf';
            case 'link': return 'fas fa-external-link-alt';
            default: return 'fas fa-file';
        }
    };

    const isItemCompleted = (item) => {
        return item.progress?.[0]?.isCompleted || false;
    };

    if (loading) {
        return (
            <div className="loading-container">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Loading certification content...</p>
            </div>
        );
    }

    return (
        <div className="student-library">
            {/* Header */}
            <div className="library-header">
                <button className="btn-back" onClick={() => navigate('/student/dashboard')}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <div className="header-info">
                    <h1>{certification?.shortName || 'Certification Library'}</h1>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress?.progressPercentage || 0}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">
                        {progress?.completedItems || 0} / {progress?.totalItems || 0} completed
                        ({progress?.progressPercentage || 0}%)
                    </span>
                </div>
            </div>

            <div className="library-content">
                {/* Sidebar */}
                <div className="library-sidebar">
                    <div className="sidebar-tabs">
                        <button
                            className={`sidebar-tab ${activeTab === 'content' ? 'active' : ''}`}
                            onClick={() => setActiveTab('content')}
                        >
                            <i className="fas fa-book-open"></i> Content
                        </button>
                        <button
                            className={`sidebar-tab ${activeTab === 'quizzes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('quizzes')}
                        >
                            <i className="fas fa-clipboard-check"></i> Quizzes
                        </button>
                    </div>

                    {activeTab === 'content' ? (
                        <div className="content-list">
                            {libraryItems.length === 0 ? (
                                <div className="empty-sidebar">
                                    <p>No content available yet</p>
                                </div>
                            ) : (
                                libraryItems.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`content-item ${activeItem?.id === item.id ? 'active' : ''} ${isItemCompleted(item) ? 'completed' : ''}`}
                                        onClick={() => setActiveItem(item)}
                                    >
                                        <div className="item-status">
                                            {isItemCompleted(item) ? (
                                                <i className="fas fa-check-circle"></i>
                                            ) : (
                                                <span className="item-number">{index + 1}</span>
                                            )}
                                        </div>
                                        <div className="item-info">
                                            <span className="item-title">{item.title}</span>
                                            <span className="item-meta">
                                                <i className={getTypeIcon(item.type)}></i>
                                                {item.type === 'video' && item.duration && ` ${formatDuration(item.duration)}`}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="quizzes-list">
                            {quizzes.length === 0 ? (
                                <div className="empty-sidebar">
                                    <p>No quizzes available yet</p>
                                </div>
                            ) : (
                                quizzes.map((quiz) => (
                                    <div
                                        key={quiz.id}
                                        className="quiz-item"
                                        onClick={() => navigate(`/student/quizzes/${quiz.id}`)}
                                    >
                                        <div className="quiz-icon">
                                            <i className="fas fa-question-circle"></i>
                                        </div>
                                        <div className="quiz-info">
                                            <span className="quiz-title">{quiz.title}</span>
                                            <span className="quiz-meta">
                                                Pass: {quiz.passingScore}% • {quiz.timeLimit ? `${quiz.timeLimit} min` : 'No limit'}
                                            </span>
                                        </div>
                                        <i className="fas fa-chevron-right"></i>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="main-content">
                    {activeItem ? (
                        <div className="content-viewer">
                            <div className="viewer-header">
                                <h2>{activeItem.title}</h2>
                                <span className={`type-badge ${activeItem.type}`}>
                                    <i className={getTypeIcon(activeItem.type)}></i> {activeItem.type}
                                </span>
                            </div>

                            {activeItem.type === 'video' && activeItem.fileUrl && (
                                <div className="video-container">
                                    <video
                                        controls
                                        src={`${import.meta.env.VITE_API_URL}${activeItem.fileUrl}`}
                                        onTimeUpdate={(e) => {
                                            // Update progress every 10 seconds
                                            const currentTime = Math.floor(e.target.currentTime);
                                            if (currentTime % 10 === 0) {
                                                handleVideoProgress(activeItem.id, currentTime);
                                            }
                                        }}
                                        onEnded={() => {
                                            handleVideoProgress(activeItem.id, activeItem.duration || 0);
                                            fetchProgress();
                                        }}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}

                            {activeItem.type === 'document' && activeItem.fileUrl && (
                                <div className="document-container">
                                    <a
                                        href={`${import.meta.env.VITE_API_URL}${activeItem.fileUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-download"
                                    >
                                        <i className="fas fa-download"></i> Download Document
                                    </a>
                                    <iframe
                                        src={`${import.meta.env.VITE_API_URL}${activeItem.fileUrl}`}
                                        title={activeItem.title}
                                    />
                                </div>
                            )}

                            {activeItem.type === 'link' && activeItem.fileUrl && (
                                <div className="link-container">
                                    <a
                                        href={activeItem.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-external"
                                    >
                                        <i className="fas fa-external-link-alt"></i> Open External Link
                                    </a>
                                </div>
                            )}

                            {activeItem.description && (
                                <div className="content-description">
                                    <h3>Description</h3>
                                    <p>{activeItem.description}</p>
                                </div>
                            )}

                            {/* Related Quiz */}
                            {activeItem.quizzes?.length > 0 && (
                                <div className="related-quiz">
                                    <h3>Related Quiz</h3>
                                    {activeItem.quizzes.map(quiz => (
                                        <div
                                            key={quiz.id}
                                            className="quiz-card"
                                            onClick={() => navigate(`/student/quizzes/${quiz.id}`)}
                                        >
                                            <i className="fas fa-clipboard-check"></i>
                                            <div>
                                                <span className="quiz-name">{quiz.title}</span>
                                                <span className="quiz-details">
                                                    Pass: {quiz.passingScore}% • {quiz.timeLimit ? `${quiz.timeLimit} min` : 'Untimed'}
                                                </span>
                                            </div>
                                            <button className="btn-take-quiz">
                                                Take Quiz <i className="fas fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="no-content-selected">
                            <i className="fas fa-hand-pointer"></i>
                            <h3>Select Content</h3>
                            <p>Choose an item from the sidebar to start learning</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentLibrary;
