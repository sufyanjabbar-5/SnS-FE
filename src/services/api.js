const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || `HTTP ${response.status}`);
        error.status = response.status;
        error.errors = data.errors;
        throw error;
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getProfile() {
    return this.request('/api/auth/profile');
  }

  async forgotPassword(email) {
    return this.request('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyResetToken(data) {
    return this.request('/api/auth/verify-reset-token', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data) {
    return this.request('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async uploadCertificationIcon(file) {
    const formData = new FormData();
    formData.append('icon', file);
    const url = `${API_BASE_URL}/api/certifications/upload-icon`;
    const token = localStorage.getItem('access_token');
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Upload failed');
    return data;
  }

  // Certification endpoints
  async getCertifications() {
    return this.request('/api/certifications');
  }

  async getCertificationBySlug(slug) {
    return this.request(`/api/certifications/${slug}`);
  }

  async getUpcomingBatches() {
    return this.request('/api/certifications/upcoming-batches');
  }

  async getSelfStudyBundles() {
    return this.request('/api/certifications/self-study-bundles');
  }

  // Enrollment endpoints
  async createEnrollment(certificationId, offeringId, batchId = null, notes = '') {
    return this.request('/api/enrollments', {
      method: 'POST',
      body: JSON.stringify({ certificationId, offeringId, batchId, notes }),
    });
  }

  async getMyEnrollments() {
    return this.request('/api/enrollments/my-enrollments');
  }

  async getEnrollment(id) {
    return this.request(`/api/enrollments/${id}`);
  }

  // Payment endpoints
  async createCheckoutSession(enrollmentId) {
    return this.request('/api/payments/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ enrollmentId }),
    });
  }

  async getPaymentStatus(enrollmentId) {
    return this.request(`/api/payments/enrollment/${enrollmentId}`);
  }

  // Cancel enrollment
  async cancelEnrollment(enrollmentId) {
    return this.request(`/api/enrollments/${enrollmentId}`, {
      method: 'DELETE',
    });
  }

  // Combined registration + enrollment (using atomic transaction endpoint)
  async registerAndEnroll(userData, items = []) {
    try {
      // Use the new atomic endpoint that handles both operations in a single transaction
      const response = await this.request('/api/auth/register-with-enrollments', {
        method: 'POST',
        body: JSON.stringify({
          ...userData,
          items
        }),
      });
      
      // Store the tokens
      if (response.data?.accessToken) {
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return {
        success: true,
        user: response.data.user,
        enrollments: response.data.enrollments || [],
        checkoutUrl: response.data.checkoutUrl || null,
        error: response.data.error || null
      };
    } catch (error) {
      if (error.errors && Array.isArray(error.errors)) {
        // Format express-validator errors into a readable string
        const detailedMessage = error.errors.map(err => err.msg).join('. ');
        throw new Error(detailedMessage || error.message);
      }
      throw error;
    }
  }

  // Chat endpoints
  async createChat(message, mode = 'default', indexName = null) {
    return this.request('/api/student/chats', {
      method: 'POST',
      body: JSON.stringify({ message, mode, index_name: indexName }),
    });
  }

  async sendChatMessage(sessionId, message, mode, indexName = null) {
    return this.request(`/api/student/chats/${sessionId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message, mode, index_name: indexName }),
    });
  }

  async getChatSessions() {
    return this.request('/api/student/chats');
  }

  async getChatMessages(sessionId) {
    return this.request(`/api/student/chats/${sessionId}/messages`);
  }

  async deleteChatSession(sessionId) {
    return this.request(`/api/student/chats/${sessionId}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
