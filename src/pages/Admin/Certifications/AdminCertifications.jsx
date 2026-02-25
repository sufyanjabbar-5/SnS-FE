import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import './AdminCertifications.css';

const AdminCertifications = () => {
    const navigate = useNavigate();
    const { showToast } = useCart();
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCert, setEditingCert] = useState(null);
    const [uploading, setUploading] = useState(false);
    const iconFileRef = useRef(null);
    const [formData, setFormData] = useState({
        shortName: '',
        longName: '',
        slug: '',
        description: '',
        icon: '',
        displayOrder: 0,
        isActive: true
    });

    const [showOfferingsModal, setShowOfferingsModal] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);
    const [offerings, setOfferings] = useState([]);
    const [showOfferingForm, setShowOfferingForm] = useState(false);
    const [editingOffering, setEditingOffering] = useState(null);
    const [offeringFormData, setOfferingFormData] = useState({
        type: 'self_study',
        price: '',
        discountPrice: '',
        isActive: true
    });

    const [showBatchesModal, setShowBatchesModal] = useState(false);
    const [selectedOffering, setSelectedOffering] = useState(null);
    const [batches, setBatches] = useState([]);
    const [showBatchForm, setShowBatchForm] = useState(false);
    const [editingBatch, setEditingBatch] = useState(null);
    const [batchFormData, setBatchFormData] = useState({
        instructor: '',
        startDate: '',
        endDate: '',
        timeRange: '',
        location: 'Online',
        isUpcoming: true,
        seatsTotal: 0,
        isActive: true
    });

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            setLoading(true);
            const response = await apiService.request('/api/certifications/admin/all');
            setCertifications(response.data || []);
        } catch (error) {
            showToast('Failed to load certifications', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingCert) {
                await apiService.request(`/api/certifications/${editingCert.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(formData)
                });
                showToast('Certification updated successfully', 'success');
            } else {
                await apiService.request('/api/certifications', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
                showToast('Certification created successfully', 'success');
            }

            setShowModal(false);
            resetForm();
            fetchCertifications();
        } catch (error) {
            showToast(error.message || 'Operation failed', 'error');
        }
    };

    const handleEdit = (cert) => {
        setEditingCert(cert);
        setFormData({
            shortName: cert.shortName || '',
            longName: cert.longName || '',
            slug: cert.slug || '',
            description: cert.description || '',
            icon: cert.icon || '',
            displayOrder: cert.displayOrder || 0,
            isActive: cert.isActive !== undefined ? cert.isActive : true
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this certification?')) return;

        try {
            await apiService.request(`/api/certifications/${id}`, { method: 'DELETE' });
            showToast('Certification deleted successfully', 'success');
            fetchCertifications();
        } catch (error) {
            showToast(error.message || 'Failed to delete certification', 'error');
        }
    };

    const resetForm = () => {
        setFormData({
            shortName: '',
            longName: '',
            slug: '',
            description: '',
            icon: '',
            displayOrder: 0,
            isActive: true
        });
        setEditingCert(null);
        if (iconFileRef.current) iconFileRef.current.value = '';
    };

    const openCreateModal = () => {
        resetForm();
        setShowModal(true);
    };

    const handleIconFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setUploading(true);
            const res = await apiService.uploadCertificationIcon(file);
            setFormData(prev => ({ ...prev, icon: res.data.fileUrl }));
            showToast('Icon uploaded successfully', 'success');
        } catch (error) {
            showToast(error.message || 'Failed to upload icon', 'error');
            if (iconFileRef.current) iconFileRef.current.value = '';
        } finally {
            setUploading(false);
        }
    };

    // Offerings Management
    const handleManageOfferings = async (cert) => {
        setSelectedCert(cert);
        setShowOfferingsModal(true);
        fetchOfferings(cert.id);
    };

    const fetchOfferings = async (certId) => {
        try {
            const response = await apiService.request(`/api/offerings/certification/${certId}`);
            setOfferings(response.data || []);
        } catch (error) {
            showToast('Failed to load offerings', 'error');
        }
    };

    const handleOfferingSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...offeringFormData, certificationId: selectedCert.id };
            if (editingOffering) {
                await apiService.request(`/api/offerings/${editingOffering.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data)
                });
                showToast('Offering updated successfully', 'success');
            } else {
                await apiService.request('/api/offerings', {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                showToast('Offering created successfully', 'success');
            }
            setShowOfferingForm(false);
            setEditingOffering(null);
            fetchOfferings(selectedCert.id);
            fetchCertifications(); // Update the main grid
        } catch (error) {
            showToast(error.message || 'Operation failed', 'error');
        }
    };

    const handleEditOffering = (offering) => {
        setEditingOffering(offering);
        setOfferingFormData({
            type: offering.type,
            price: offering.price,
            discountPrice: offering.discountPrice || '',
            isActive: offering.isActive
        });
        setShowOfferingForm(true);
    };

    const handleDeleteOffering = async (id) => {
        if (!window.confirm('Are you sure you want to delete this offering?')) return;
        try {
            await apiService.request(`/api/offerings/${id}`, { method: 'DELETE' });
            showToast('Offering deleted successfully', 'success');
            fetchOfferings(selectedCert.id);
            fetchCertifications();
        } catch (error) {
            showToast(error.message || 'Failed to delete', 'error');
        }
    };

    // Batches Management
    const handleManageBatches = async (offering) => {
        setSelectedOffering(offering);
        setShowBatchesModal(true);
        fetchBatches(selectedCert.id);
    };

    const fetchBatches = async (certId) => {
        try {
            const response = await apiService.request(`/api/batches/certification/${certId}`);
            setBatches(response.data || []);
        } catch (error) {
            showToast('Failed to load batches', 'error');
        }
    };

    const handleBatchSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...batchFormData, certificationId: selectedCert.id };
            if (editingBatch) {
                await apiService.request(`/api/batches/${editingBatch.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data)
                });
                showToast('Batch updated successfully', 'success');
            } else {
                await apiService.request('/api/batches', {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                showToast('Batch created successfully', 'success');
            }
            setShowBatchForm(false);
            setEditingBatch(null);
            fetchBatches(selectedCert.id);
        } catch (error) {
            showToast(error.message || 'Operation failed', 'error');
        }
    };

    const handleEditBatch = (batch) => {
        setEditingBatch(batch);
        setBatchFormData({
            instructor: batch.instructor,
            startDate: batch.startDate.split('T')[0],
            endDate: batch.endDate.split('T')[0],
            timeRange: batch.timeRange,
            location: batch.location,
            isUpcoming: batch.isUpcoming,
            seatsTotal: batch.seatsTotal,
            isActive: batch.isActive
        });
        setShowBatchForm(true);
    };

    const handleDeleteBatch = async (id) => {
        if (!window.confirm('Are you sure you want to delete this batch?')) return;
        try {
            await apiService.request(`/api/batches/${id}`, { method: 'DELETE' });
            showToast('Batch deleted successfully', 'success');
            fetchBatches(selectedCert.id);
        } catch (error) {
            showToast(error.message || 'Failed to delete', 'error');
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Loading certifications...</p>
            </div>
        );
    }

    return (
        <div className="admin-courses">
            <div className="page-header">
                <div>
                    <h1>Certifications Management</h1>
                    <p>Manage all professional certifications in the system</p>
                </div>
                <button className="btn-primary" onClick={openCreateModal}>
                    <i className="fas fa-plus"></i> Add New Certification
                </button>
            </div>

            <div className="courses-grid">
                {certifications.map((cert) => (
                    <div key={cert.id} className="course-card-admin">
                        <div className="course-header">
                            <h3>{cert.shortName}</h3>
                        </div>

                        <div className="course-details">
                            <p className="course-desc"><strong>{cert.longName}</strong></p>
                            <p className="course-desc">{cert.description}</p>

                            <div className="course-meta">
                                <div className="meta-item">
                                    <i className="fas fa-link"></i>
                                    <span>/{cert.slug}</span>
                                </div>
                                <div className="meta-item">
                                    <i className="fas fa-sort"></i>
                                    <span>Order: {cert.displayOrder}</span>
                                </div>
                                <div className="meta-item">
                                    <i className={`fas fa-circle ${cert.isActive ? 'text-green-500' : 'text-red-500'}`}></i>
                                    <span>{cert.isActive ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="course-actions">
                            <button className="btn-library" onClick={() => navigate(`/admin/certifications/${cert.id}/library`)}>
                                <i className="fas fa-book-open"></i> Library
                            </button>
                            <button className="btn-offerings" onClick={() => handleManageOfferings(cert)}>
                                <i className="fas fa-tags"></i> Offerings
                            </button>
                            <button className="btn-edit" onClick={() => handleEdit(cert)}>
                                <i className="fas fa-edit"></i> Edit
                            </button>
                            <button className="btn-delete" onClick={() => handleDelete(cert.id)}>
                                <i className="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingCert ? 'Edit Certification' : 'Create New Certification'}</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="course-form">
                            <div className="form-group">
                                <label>Short Name * (e.g., PMP)</label>
                                <input
                                    type="text"
                                    name="shortName"
                                    value={formData.shortName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Long Name * (e.g., Project Management Professional)</label>
                                <input
                                    type="text"
                                    name="longName"
                                    value={formData.longName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Slug * (URL path component)</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    placeholder="e.g., pmp-certification"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                />
                            </div>

                            {/* Icon - full width */}
                            <div className="form-group">
                                <label>Icon / Course Image</label>

                                {/* Preview */}
                                <div className="icon-preview-box">
                                    {formData.icon ? (
                                        formData.icon.startsWith('http') || formData.icon.startsWith('/uploads')
                                            ? <img src={formData.icon} alt="icon preview" className="icon-preview-img" />
                                            : <i className={formData.icon} style={{ fontSize: 36, color: '#4f46e5' }}></i>
                                    ) : (
                                        <i className="fas fa-image" style={{ fontSize: 36, color: '#cbd5e1' }}></i>
                                    )}
                                </div>

                                {/* File Upload */}
                                <div className="icon-upload-row">
                                    <label className={`icon-upload-btn ${uploading ? 'uploading' : ''}`}>
                                        {uploading
                                            ? <><i className="fas fa-spinner fa-spin"></i> Uploading...</>
                                            : <><i className="fas fa-upload"></i> Upload Image</>}
                                        <input
                                            ref={iconFileRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/gif,image/webp"
                                            onChange={handleIconFileChange}
                                            disabled={uploading}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                    <span className="icon-or">or</span>
                                    <input
                                        type="text"
                                        name="icon"
                                        value={formData.icon.startsWith('http') || formData.icon.startsWith('/uploads') ? '' : formData.icon}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            if (iconFileRef.current) iconFileRef.current.value = '';
                                        }}
                                        placeholder="Font Awesome class, e.g. fas fa-project-diagram"
                                        className="icon-fa-input"
                                        disabled={uploading}
                                    />
                                </div>
                                {formData.icon && (
                                    <button type="button" className="icon-clear-btn" onClick={() => {
                                        setFormData(prev => ({ ...prev, icon: '' }));
                                        if (iconFileRef.current) iconFileRef.current.value = '';
                                    }}>
                                        <i className="fas fa-times"></i> Clear icon
                                    </button>
                                )}
                            </div>

                            {/* Display Order */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Display Order</label>
                                    <input
                                        type="number"
                                        name="displayOrder"
                                        value={formData.displayOrder}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleInputChange}
                                    />
                                    Is Active
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    {editingCert ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Offerings Modal */}
            {showOfferingsModal && (
                <div className="modal-overlay" onClick={() => setShowOfferingsModal(false)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Manage Offerings - {selectedCert?.shortName}</h2>
                            <button className="close-btn" onClick={() => setShowOfferingsModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="offering-controls">
                            {!showOfferingForm && (
                                <button className="btn-primary" onClick={() => {
                                    setEditingOffering(null);
                                    setOfferingFormData({ type: 'self_study', price: '', discountPrice: '', isActive: true });
                                    setShowOfferingForm(true);
                                }}>
                                    <i className="fas fa-plus"></i> Add Offering
                                </button>
                            )}
                        </div>

                        {showOfferingForm ? (
                            <form onSubmit={handleOfferingSubmit} className="offering-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Type</label>
                                        <select
                                            value={offeringFormData.type}
                                            onChange={(e) => setOfferingFormData({ ...offeringFormData, type: e.target.value })}
                                        >
                                            <option value="self_study">Self-Study</option>
                                            <option value="live_training">Live Training</option>
                                            <option value="hybrid">Hybrid</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input
                                            type="number"
                                            value={offeringFormData.price}
                                            onChange={(e) => setOfferingFormData({ ...offeringFormData, price: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Discount Price</label>
                                        <input
                                            type="number"
                                            value={offeringFormData.discountPrice}
                                            onChange={(e) => setOfferingFormData({ ...offeringFormData, discountPrice: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="button" onClick={() => setShowOfferingForm(false)} className="btn-cancel">Cancel</button>
                                    <button type="submit" className="btn-submit">{editingOffering ? 'Update' : 'Create'}</button>
                                </div>
                            </form>
                        ) : (
                            <div className="offerings-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Price</th>
                                            <th>Discount</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {offerings.map(offering => (
                                            <tr key={offering.id}>
                                                <td style={{ textTransform: 'capitalize' }}>{offering.type.replace('_', ' ')}</td>
                                                <td>${offering.price}</td>
                                                <td>{offering.discountPrice ? `$${offering.discountPrice}` : '-'}</td>
                                                <td>{offering.isActive ? 'Active' : 'Inactive'}</td>
                                                <td className="table-actions">
                                                    {offering.type === 'live_training' && (
                                                        <button className="btn-batches" onClick={() => handleManageBatches(offering)}>
                                                            <i className="fas fa-calendar-alt"></i> Batches
                                                        </button>
                                                    )}
                                                    <button className="btn-edit-small" onClick={() => handleEditOffering(offering)}>
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="btn-delete-small" onClick={() => handleDeleteOffering(offering.id)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Batches Modal */}
            {showBatchesModal && (
                <div className="modal-overlay" onClick={() => setShowBatchesModal(false)}>
                    <div className="modal-content extra-large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Manage Batches - {selectedCert?.shortName}</h2>
                            <button className="close-btn" onClick={() => setShowBatchesModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="batch-controls">
                            {!showBatchForm && (
                                <button className="btn-primary" onClick={() => {
                                    setEditingBatch(null);
                                    setBatchFormData({
                                        instructor: '',
                                        startDate: '',
                                        endDate: '',
                                        timeRange: '',
                                        location: 'Online',
                                        isUpcoming: true,
                                        seatsTotal: 0,
                                        isActive: true
                                    });
                                    setShowBatchForm(true);
                                }}>
                                    <i className="fas fa-plus"></i> Add Batch
                                </button>
                            )}
                        </div>

                        {showBatchForm ? (
                            <form onSubmit={handleBatchSubmit} className="batch-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Instructor</label>
                                        <input
                                            type="text"
                                            value={batchFormData.instructor}
                                            onChange={(e) => setBatchFormData({ ...batchFormData, instructor: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input
                                            type="text"
                                            value={batchFormData.location}
                                            onChange={(e) => setBatchFormData({ ...batchFormData, location: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input
                                            type="date"
                                            value={batchFormData.startDate}
                                            onChange={(e) => setBatchFormData({ ...batchFormData, startDate: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input
                                            type="date"
                                            value={batchFormData.endDate}
                                            onChange={(e) => setBatchFormData({ ...batchFormData, endDate: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Time Range</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 9:00 AM - 5:00 PM EST"
                                            value={batchFormData.timeRange}
                                            onChange={(e) => setBatchFormData({ ...batchFormData, timeRange: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Max Seats</label>
                                        <input
                                            type="number"
                                            value={batchFormData.seatsTotal}
                                            onChange={(e) => setBatchFormData({ ...batchFormData, seatsTotal: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="button" onClick={() => setShowBatchForm(false)} className="btn-cancel">Cancel</button>
                                    <button type="submit" className="btn-submit">{editingBatch ? 'Update' : 'Create'}</button>
                                </div>
                            </form>
                        ) : (
                            <div className="batches-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Instructor</th>
                                            <th>Dates</th>
                                            <th>Time</th>
                                            <th>Seats</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {batches.map(batch => (
                                            <tr key={batch.id}>
                                                <td>{batch.instructor}</td>
                                                <td>{new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}</td>
                                                <td>{batch.timeRange}</td>
                                                <td>{batch.seatsBooked} / {batch.seatsTotal}</td>
                                                <td>{batch.isUpcoming ? 'Upcoming' : 'Past'}</td>
                                                <td className="table-actions">
                                                    <button className="btn-edit-small" onClick={() => handleEditBatch(batch)}>
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="btn-delete-small" onClick={() => handleDeleteBatch(batch.id)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCertifications;
