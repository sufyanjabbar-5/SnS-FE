import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import './AdminLibrary.css';

const AdminLibrary = () => {
    const { certificationId } = useParams();
    const navigate = useNavigate();
    const { showToast } = useCart();

    const [certification, setCertification] = useState(null);
    const [libraryItems, setLibraryItems] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('content'); // 'content' or 'quizzes'

    // Modal states
    const [showItemModal, setShowItemModal] = useState(false);
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [previewItem, setPreviewItem] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [editingQuiz, setEditingQuiz] = useState(null);

    // Library item form
    const [itemForm, setItemForm] = useState({
        title: '',
        description: '',
        type: 'video',
        fileUrl: '',
        duration: ''
    });

    // Quiz form
    const [quizForm, setQuizForm] = useState({
        title: '',
        description: '',
        passingScore: 70,
        timeLimit: '',
        maxAttempts: 3,
        libraryItemId: '',
        questions: []
    });

    // File upload state
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        if (certificationId) {
            fetchCertification();
            fetchLibraryItems();
            fetchQuizzes();
        }
    }, [certificationId]);

    const fetchCertification = async () => {
        try {
            const response = await apiService.request(`/api/certifications/admin/${certificationId}`);
            setCertification(response.data);
        } catch (error) {
            showToast('Failed to load certification', 'error');
        }
    };

    const fetchLibraryItems = async () => {
        try {
            setLoading(true);
            const response = await apiService.request(`/api/library/certification/${certificationId}`);
            setLibraryItems(response.data || []);
        } catch (error) {
            console.error('Failed to load library items', error);
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

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/library/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setItemForm(prev => ({ ...prev, fileUrl: data.data.fileUrl }));
                showToast('File uploaded successfully', 'success');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            showToast(error.message || 'Upload failed', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleItemSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = { ...itemForm, certificationId: parseInt(certificationId) };
            if (data.duration) data.duration = parseInt(data.duration);
            else delete data.duration;

            if (editingItem) {
                await apiService.request(`/api/library/${editingItem.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data)
                });
                showToast('Item updated successfully', 'success');
            } else {
                await apiService.request('/api/library', {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                showToast('Item created successfully', 'success');
            }

            setShowItemModal(false);
            resetItemForm();
            fetchLibraryItems();
        } catch (error) {
            showToast(error.message || 'Operation failed', 'error');
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            await apiService.request(`/api/library/${id}`, { method: 'DELETE' });
            showToast('Item deleted successfully', 'success');
            fetchLibraryItems();
        } catch (error) {
            showToast(error.message || 'Delete failed', 'error');
        }
    };

    const handleQuizSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                ...quizForm,
                certificationId: parseInt(certificationId),
                passingScore: parseInt(quizForm.passingScore),
                maxAttempts: parseInt(quizForm.maxAttempts),
                timeLimit: quizForm.timeLimit ? parseInt(quizForm.timeLimit) : null,
                libraryItemId: quizForm.libraryItemId ? parseInt(quizForm.libraryItemId) : null
            };

            if (editingQuiz) {
                await apiService.request(`/api/quizzes/${editingQuiz.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data)
                });
                showToast('Quiz updated successfully', 'success');
            } else {
                await apiService.request('/api/quizzes', {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                showToast('Quiz created successfully', 'success');
            }

            setShowQuizModal(false);
            resetQuizForm();
            fetchQuizzes();
        } catch (error) {
            showToast(error.message || 'Operation failed', 'error');
        }
    };

    const handleDeleteQuiz = async (id) => {
        if (!window.confirm('Are you sure you want to delete this quiz?')) return;

        try {
            await apiService.request(`/api/quizzes/${id}`, { method: 'DELETE' });
            showToast('Quiz deleted successfully', 'success');
            fetchQuizzes();
        } catch (error) {
            showToast(error.message || 'Delete failed', 'error');
        }
    };

    const openEditItem = (item) => {
        setEditingItem(item);
        setItemForm({
            title: item.title || '',
            description: item.description || '',
            type: item.type || 'video',
            fileUrl: item.fileUrl || '',
            duration: item.duration || ''
        });
        setShowItemModal(true);
    };

    const openEditQuiz = (quiz) => {
        setEditingQuiz(quiz);
        setQuizForm({
            title: quiz.title || '',
            description: quiz.description || '',
            passingScore: quiz.passingScore || 70,
            timeLimit: quiz.timeLimit || '',
            maxAttempts: quiz.maxAttempts || 3,
            libraryItemId: quiz.libraryItemId || '',
            questions: quiz.questions || []
        });
        setShowQuizModal(true);
    };

    const resetItemForm = () => {
        setItemForm({
            title: '',
            description: '',
            type: 'video',
            fileUrl: '',
            duration: ''
        });
        setEditingItem(null);
    };

    const resetQuizForm = () => {
        setQuizForm({
            title: '',
            description: '',
            passingScore: 70,
            timeLimit: '',
            maxAttempts: 3,
            libraryItemId: '',
            questions: []
        });
        setEditingQuiz(null);
    };

    const formatDuration = (seconds) => {
        if (!seconds) return 'N/A';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'video': return 'fas fa-play-circle';
            case 'document': return 'fas fa-file-pdf';
            case 'link': return 'fas fa-link';
            default: return 'fas fa-file';
        }
    };

    const openPreview = (item) => {
        setPreviewItem(item);
        setShowPreviewModal(true);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Loading library...</p>
            </div>
        );
    }

    return (
        <div className="admin-library">
            <div className="page-header">
                <div className="header-left">
                    <button className="btn-back" onClick={() => navigate('/admin/certifications')}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <div>
                        <h1>Certification Library</h1>
                        <p>{certification?.shortName || 'Certification'}</p>
                    </div>
                </div>
                <div className="header-actions">
                    {activeTab === 'content' ? (
                        <button className="btn-primary" onClick={() => { resetItemForm(); setShowItemModal(true); }}>
                            <i className="fas fa-plus"></i> Add Content
                        </button>
                    ) : (
                        <button className="btn-primary" onClick={() => { resetQuizForm(); setShowQuizModal(true); }}>
                            <i className="fas fa-plus"></i> Add Quiz
                        </button>
                    )}
                </div>
            </div>

            <div className="library-tabs">
                <button
                    className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                    onClick={() => setActiveTab('content')}
                >
                    <i className="fas fa-video"></i> Content ({libraryItems.length})
                </button>
                <button
                    className={`tab-btn ${activeTab === 'quizzes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('quizzes')}
                >
                    <i className="fas fa-question-circle"></i> Quizzes ({quizzes.length})
                </button>
            </div>

            {activeTab === 'content' ? (
                <div className="library-grid">
                    {libraryItems.length === 0 ? (
                        <div className="empty-state">
                            <i className="fas fa-film"></i>
                            <h3>No Content Yet</h3>
                            <p>Add video lectures, documents, or links for this course.</p>
                        </div>
                    ) : (
                        libraryItems.map((item, index) => (
                            <div key={item.id} className="library-card">
                                <div className="card-order">{index + 1}</div>
                                <div className="card-icon">
                                    <i className={getTypeIcon(item.type)}></i>
                                </div>
                                <div className="card-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <div className="card-meta">
                                        <span className="type-badge">{item.type}</span>
                                        {item.type === 'video' && item.duration && (
                                            <span><i className="fas fa-clock"></i> {formatDuration(item.duration)}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button className="btn-icon preview" onClick={() => openPreview(item)} title="Preview">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button className="btn-icon" onClick={() => openEditItem(item)} title="Edit">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn-icon danger" onClick={() => handleDeleteItem(item.id)} title="Delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className="quizzes-grid">
                    {quizzes.length === 0 ? (
                        <div className="empty-state">
                            <i className="fas fa-clipboard-list"></i>
                            <h3>No Quizzes Yet</h3>
                            <p>Create quizzes to assess student learning.</p>
                        </div>
                    ) : (
                        quizzes.map((quiz) => (
                            <div key={quiz.id} className="quiz-card">
                                <div className="quiz-header">
                                    <h3>{quiz.title}</h3>
                                    {quiz.libraryItem && (
                                        <span className="linked-item">
                                            <i className="fas fa-link"></i> {quiz.libraryItem.title}
                                        </span>
                                    )}
                                </div>
                                <p>{quiz.description}</p>
                                <div className="quiz-stats">
                                    <span><i className="fas fa-percentage"></i> Pass: {quiz.passingScore}%</span>
                                    <span><i className="fas fa-redo"></i> Attempts: {quiz.maxAttempts || '∞'}</span>
                                    {quiz.timeLimit && (
                                        <span><i className="fas fa-stopwatch"></i> {quiz.timeLimit} min</span>
                                    )}
                                </div>
                                <div className="card-actions">
                                    <button
                                        className="btn-secondary"
                                        onClick={() => navigate(`/admin/quizzes/${quiz.id}/questions`)}
                                    >
                                        <i className="fas fa-list-ol"></i> Manage Questions
                                    </button>
                                    <button className="btn-icon" onClick={() => openEditQuiz(quiz)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn-icon danger" onClick={() => handleDeleteQuiz(quiz.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Library Item Modal */}
            {showItemModal && (
                <div className="modal-overlay" onClick={() => setShowItemModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingItem ? 'Edit Content' : 'Add Content'}</h2>
                            <button className="close-btn" onClick={() => setShowItemModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={handleItemSubmit} className="library-form">
                            <div className="form-group">
                                <label>Title *</label>
                                <input
                                    type="text"
                                    value={itemForm.title}
                                    onChange={(e) => setItemForm(prev => ({ ...prev, title: e.target.value }))}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={itemForm.description}
                                    onChange={(e) => setItemForm(prev => ({ ...prev, description: e.target.value }))}
                                    rows="3"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Type *</label>
                                    <select
                                        value={itemForm.type}
                                        onChange={(e) => setItemForm(prev => ({ ...prev, type: e.target.value }))}
                                    >
                                        <option value="video">Video</option>
                                        <option value="document">Document</option>
                                        <option value="link">External Link</option>
                                    </select>
                                </div>
                                {itemForm.type === 'video' && (
                                    <div className="form-group">
                                        <label>Duration (seconds)</label>
                                        <input
                                            type="number"
                                            value={itemForm.duration}
                                            onChange={(e) => setItemForm(prev => ({ ...prev, duration: e.target.value }))}
                                            placeholder="e.g., 600 for 10 min"
                                        />
                                    </div>
                                )}
                            </div>

                            {itemForm.type === 'video' || itemForm.type === 'document' ? (
                                <div className="form-group">
                                    <label>Upload File</label>
                                    <div className="file-upload-area">
                                        <input
                                            type="file"
                                            accept={itemForm.type === 'video' ? 'video/*' : '.pdf,.doc,.docx,.ppt,.pptx'}
                                            onChange={handleFileUpload}
                                            disabled={uploading}
                                        />
                                        {uploading && <span className="upload-status">Uploading...</span>}
                                        {itemForm.fileUrl && (
                                            <span className="file-uploaded">
                                                <i className="fas fa-check-circle"></i> File uploaded
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="form-group">
                                    <label>External URL *</label>
                                    <input
                                        type="url"
                                        value={itemForm.fileUrl}
                                        onChange={(e) => setItemForm(prev => ({ ...prev, fileUrl: e.target.value }))}
                                        placeholder="https://..."
                                        required={itemForm.type === 'link'}
                                    />
                                </div>
                            )}

                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowItemModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit" disabled={uploading}>
                                    {editingItem ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Quiz Modal */}
            {showQuizModal && (
                <div className="modal-overlay" onClick={() => setShowQuizModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingQuiz ? 'Edit Quiz' : 'Create Quiz'}</h2>
                            <button className="close-btn" onClick={() => setShowQuizModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={handleQuizSubmit} className="quiz-form">
                            <div className="form-group">
                                <label>Quiz Title *</label>
                                <input
                                    type="text"
                                    value={quizForm.title}
                                    onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={quizForm.description}
                                    onChange={(e) => setQuizForm(prev => ({ ...prev, description: e.target.value }))}
                                    rows="2"
                                />
                            </div>

                            <div className="form-group">
                                <label>Link to Content (Optional)</label>
                                <select
                                    value={quizForm.libraryItemId}
                                    onChange={(e) => setQuizForm(prev => ({ ...prev, libraryItemId: e.target.value }))}
                                >
                                    <option value="">Standalone Quiz</option>
                                    {libraryItems.map(item => (
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Passing Score (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={quizForm.passingScore}
                                        onChange={(e) => setQuizForm(prev => ({ ...prev, passingScore: e.target.value }))}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Max Attempts</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quizForm.maxAttempts}
                                        onChange={(e) => setQuizForm(prev => ({ ...prev, maxAttempts: e.target.value }))}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Time Limit (min)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quizForm.timeLimit}
                                        onChange={(e) => setQuizForm(prev => ({ ...prev, timeLimit: e.target.value }))}
                                        placeholder="No limit"
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowQuizModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {showPreviewModal && previewItem && (
                <div className="modal-overlay" onClick={() => setShowPreviewModal(false)}>
                    <div className="modal-content preview-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{previewItem.title}</h2>
                            <button className="close-btn" onClick={() => setShowPreviewModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="preview-content">
                            {previewItem.type === 'video' && previewItem.fileUrl && (
                                <video controls autoPlay className="preview-video">
                                    <source src={`${import.meta.env.VITE_API_URL}${previewItem.fileUrl}`} />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            {previewItem.type === 'document' && previewItem.fileUrl && (
                                <div className="preview-document">
                                    <iframe
                                        src={`${import.meta.env.VITE_API_URL}${previewItem.fileUrl}`}
                                        title={previewItem.title}
                                    />
                                    <a
                                        href={`${import.meta.env.VITE_API_URL}${previewItem.fileUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-download"
                                    >
                                        <i className="fas fa-download"></i> Download
                                    </a>
                                </div>
                            )}
                            {previewItem.type === 'link' && previewItem.fileUrl && (
                                <div className="preview-link">
                                    <i className="fas fa-external-link-alt"></i>
                                    <p>External Link</p>
                                    <a
                                        href={previewItem.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-open-link"
                                    >
                                        Open Link <i className="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            )}
                            {previewItem.description && (
                                <div className="preview-description">
                                    <h4>Description</h4>
                                    <p>{previewItem.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLibrary;
