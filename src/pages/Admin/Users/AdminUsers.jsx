import React, { useState, useEffect } from 'react';
import apiService from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import './AdminUsers.css';

const AdminUsers = () => {
  const { showToast } = useCart();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    phone: '',
    company: '',
    isActive: true
  });
  const [updating, setUpdating] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.request('/api/admin/users');
      if (response.success) {
        setUsers(response.data || []);
      }
    } catch (error) {
      showToast('Failed to load users', 'error');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setEditedUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      company: user.company || '',
      isActive: user.isActive
    });
    setShowModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      setUpdating(true);
      const response = await apiService.request(`/api/admin/users/${selectedUser.id}`, {
        method: 'PUT',
        body: JSON.stringify(editedUser)
      });

      if (response.success) {
        showToast('User updated successfully', 'success');
        fetchUsers();
        setShowModal(false);
        setSelectedUser(null);
        setEditedUser(null);
      }
    } catch (error) {
      showToast(error.message || 'Failed to update user', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      const response = await apiService.request('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify(newUser)
      });

      if (response.success) {
        showToast('User created successfully', 'success');
        fetchUsers();
        setShowCreateModal(false);
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'student',
          phone: '',
          company: '',
          isActive: true
        });
      }
    } catch (error) {
      showToast(error.message || 'Failed to create user', 'error');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await apiService.request(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });

      if (response.success) {
        showToast('User deleted successfully', 'success');
        fetchUsers();
      }
    } catch (error) {
      showToast(error.message || 'Failed to delete user', 'error');
    }
  };

  const getFilteredUsers = () => {
    let filtered = users;

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(u => u.isActive === isActive);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(u => {
        const searchLower = searchTerm.toLowerCase();
        const fullName = `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase();
        const email = u.email?.toLowerCase() || '';
        const company = u.company?.toLowerCase() || '';

        return fullName.includes(searchLower) ||
          email.includes(searchLower) ||
          company.includes(searchLower);
      });
    }

    return filtered;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredUsers = getFilteredUsers();

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    students: users.filter(u => u.role === 'student').length,
    active: users.filter(u => u.isActive).length
  };

  if (loading) {
    return (
      <div className="admin-users">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users">
      <div className="page-header">
        <div>
          <h1>User Management</h1>
          <p>Manage all system users and their permissions</p>
        </div>
        <button className="btn-add-user" onClick={() => setShowCreateModal(true)}>
          <i className="fas fa-plus"></i> Create New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon admin">
            <i className="fas fa-user-shield"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.admins}</h3>
            <p>Administrators</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon student">
            <i className="fas fa-user-graduate"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.students}</h3>
            <p>Students</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.active}</h3>
            <p>Active Users</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="controls-bar">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Role:</label>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-user-slash"></i>
            <h3>No users found</h3>
            <p>
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'No users match the selected filters'}
            </p>
          </div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div>
                        <div className="user-name">
                          {user.firstName} {user.lastName}
                        </div>
                        {user.phone && (
                          <div className="user-phone">{user.phone}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="user-email">{user.email}</td>
                  <td>{user.company || '-'}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role === 'admin' ? (
                        <><i className="fas fa-shield-alt"></i> Admin</>
                      ) : (
                        <><i className="fas fa-graduation-cap"></i> Student</>
                      )}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.isActive ? 'status-active' : 'status-inactive'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-view"
                        onClick={() => handleViewDetails(user)}
                        title="View details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      {user.role !== 'admin' && (
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete user"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Details</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Personal Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>First Name:</label>
                    <input
                      type="text"
                      value={editedUser?.firstName || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                      disabled={updating}
                    />
                  </div>
                  <div className="detail-item">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      value={editedUser?.lastName || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                      disabled={updating}
                    />
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={editedUser?.email || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      disabled={updating}
                    />
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <input
                      type="text"
                      value={editedUser?.phone || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                      disabled={updating}
                      placeholder="N/A"
                    />
                  </div>
                  <div className="detail-item">
                    <label>Company:</label>
                    <input
                      type="text"
                      value={editedUser?.company || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, company: e.target.value })}
                      disabled={updating}
                      placeholder="N/A"
                    />
                  </div>
                  <div className="detail-item">
                    <label>Account Status:</label>
                    <select
                      value={editedUser?.isActive ? 'active' : 'inactive'}
                      onChange={(e) => setEditedUser({ ...editedUser, isActive: e.target.value === 'active' })}
                      disabled={updating}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Account Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">
                      <i className="fas fa-user-plus"></i>
                    </div>
                    <div className="activity-content">
                      <strong>Account Created</strong>
                      <span>{formatDate(selectedUser.createdAt)}</span>
                    </div>
                  </div>
                  {selectedUser.updatedAt !== selectedUser.createdAt && (
                    <div className="activity-item">
                      <div className="activity-icon">
                        <i className="fas fa-edit"></i>
                      </div>
                      <div className="activity-content">
                        <strong>Last Updated</strong>
                        <span>{formatDate(selectedUser.updatedAt)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)} disabled={updating}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleUpdateUser} disabled={updating}>
                {updating ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New User</h2>
              <button className="close-btn" onClick={() => setShowCreateModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleCreateUser}>
              <div className="modal-body">
                <div className="detail-section">
                  <h3>Personal Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>First Name:</label>
                      <input
                        type="text"
                        required
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                        disabled={creating}
                      />
                    </div>
                    <div className="detail-item">
                      <label>Last Name:</label>
                      <input
                        type="text"
                        required
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                        disabled={creating}
                      />
                    </div>
                    <div className="detail-item">
                      <label>Email:</label>
                      <input
                        type="email"
                        required
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        disabled={creating}
                      />
                    </div>
                    <div className="detail-item">
                      <label>Password:</label>
                      <input
                        type="password"
                        required
                        minLength="6"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        disabled={creating}
                      />
                    </div>
                    <div className="detail-item">
                      <label>Role:</label>
                      <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        disabled={creating}
                      >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="detail-item">
                      <label>Phone:</label>
                      <input
                        type="text"
                        value={newUser.phone}
                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                        disabled={creating}
                      />
                    </div>
                    <div className="detail-item">
                      <label>Company:</label>
                      <input
                        type="text"
                        value={newUser.company}
                        onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                        disabled={creating}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)} disabled={creating}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={creating}>
                  {creating ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
