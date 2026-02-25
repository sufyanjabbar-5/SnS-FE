import React, { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import apiService from '../../../services/api';
import './ChatLeads.css';

const ChatLeads = () => {
    const { showToast } = useCart();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0
    });
    const [search, setSearch] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        fetchLeads();
    }, [pagination.page, search]);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: pagination.page,
                limit: pagination.limit
            });

            if (search) {
                params.append('search', search);
            }

            const response = await apiService.request(`/api/chat-leads?${params}`);

            if (response.success) {
                setLeads(response.data.leads || []);
                setPagination(prev => ({
                    ...prev,
                    total: response.data.pagination.total,
                    totalPages: response.data.pagination.totalPages
                }));
            }
        } catch (error) {
            console.error('Error fetching leads:', error);
            showToast('Failed to load chat leads', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this lead?')) {
            return;
        }

        try {
            setDeleteLoading(id);
            const response = await apiService.request(`/api/chat-leads/${id}`, {
                method: 'DELETE'
            });

            if (response.success) {
                showToast('Lead deleted successfully', 'success');
                setLeads(prev => prev.filter(lead => lead.id !== id));
            }
        } catch (error) {
            showToast(error.message || 'Failed to delete lead', 'error');
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading && leads.length === 0) {
        return (
            <div className="chat-leads-page">
                <div className="loading-state">
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Loading chat leads...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-leads-page">
            <div className="page-header">
                <div>
                    <h1>Chat Leads</h1>
                    <p>View and manage leads collected from the chatbot</p>
                </div>
                <div className="header-stats">
                    <div className="stat-badge">
                        <i className="fas fa-users"></i>
                        <span>{pagination.total} Total Leads</span>
                    </div>
                </div>
            </div>

            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <div className="search-input-wrapper">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search by email, name, or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button
                                type="button"
                                className="clear-btn"
                                onClick={() => {
                                    setSearch('');
                                    setPagination(prev => ({ ...prev, page: 1 }));
                                }}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </div>
                    <button type="submit" className="search-btn">
                        Search
                    </button>
                </form>
            </div>

            {leads.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-inbox"></i>
                    <h3>No Leads Found</h3>
                    <p>{search ? 'No leads match your search criteria' : 'No chat leads have been collected yet'}</p>
                </div>
            ) : (
                <>
                    <div className="leads-table-container">
                        <table className="leads-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Messages</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.id}>
                                        <td>
                                            <div className="lead-name">
                                                <div className="avatar">
                                                    {lead.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span>{lead.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href={`mailto:${lead.email}`} className="email-link">
                                                {lead.email}
                                            </a>
                                        </td>
                                        <td>
                                            {lead.phone ? (
                                                <a href={`tel:${lead.phone}`} className="phone-link">
                                                    {lead.phone}
                                                </a>
                                            ) : (
                                                <span className="no-data">—</span>
                                            )}
                                        </td>
                                        <td>
                                            {lead.messages ? (
                                                <div className="messages-cell" title={lead.messages}>
                                                    {lead.messages.length > 50
                                                        ? lead.messages.substring(0, 50) + '...'
                                                        : lead.messages}
                                                </div>
                                            ) : (
                                                <span className="no-data">—</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className="date">{formatDate(lead.createdAt)}</span>
                                        </td>
                                        <td>
                                            <div className="actions">
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(lead.id)}
                                                    disabled={deleteLoading === lead.id}
                                                    title="Delete lead"
                                                >
                                                    {deleteLoading === lead.id ? (
                                                        <i className="fas fa-spinner fa-spin"></i>
                                                    ) : (
                                                        <i className="fas fa-trash"></i>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {pagination.totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="page-btn"
                                disabled={pagination.page === 1}
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                            >
                                <i className="fas fa-chevron-left"></i>
                                Previous
                            </button>
                            <span className="page-info">
                                Page {pagination.page} of {pagination.totalPages}
                            </span>
                            <button
                                className="page-btn"
                                disabled={pagination.page === pagination.totalPages}
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                            >
                                Next
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ChatLeads;
