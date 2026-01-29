const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function for API requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  // Add token from localStorage if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Auth API
export const authAPI = {
  register: (data) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  login: (data) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getProfile: () => apiRequest('/auth/profile'),
  
  updateProfile: (data) => apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  logout: () => apiRequest('/auth/logout', {
    method: 'POST',
  }),
};

// Books API
export const booksAPI = {
  search: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/books/search${queryString ? `?${queryString}` : ''}`);
  },
  
  getBook: (id) => apiRequest(`/books/${id}`),
  
  getCategories: () => apiRequest('/books/categories'),
  
  getBooksByCategory: (categoryId, page = 1, limit = 20) => 
    apiRequest(`/books/category/${categoryId}?page=${page}&limit=${limit}`),
  
  getLanguages: () => apiRequest('/books/languages'),
  
  createBook: (formData) => {
    // Note: For file uploads, we need different handling
    const url = `${API_BASE_URL}/books`;
    const token = localStorage.getItem('token');
    
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // FormData for files
    }).then(res => res.json());
  },
};

// Payments API
export const paymentsAPI = {
  initiate: (bookFormatIds) => apiRequest('/payments/initiate', {
    method: 'POST',
    body: JSON.stringify({ bookFormatIds }),
  }),
  
  verify: (txRef) => apiRequest('/payments/verify', {
    method: 'POST',
    body: JSON.stringify({ tx_ref: txRef }),
  }),
  
  checkOwnership: (bookFormatIds) => apiRequest('/payments/check-ownership', {
    method: 'POST',
    body: JSON.stringify({ bookFormatIds }),
  }),
  
  getPurchasedBooks: (page = 1, limit = 20) => 
    apiRequest(`/payments/my-purchases?page=${page}&limit=${limit}`),
  
  getPaymentStatus: (txRef) => apiRequest(`/payments/status/${txRef}`),
  
  getPurchaseStatus: (formatIds) => {
    const ids = Array.isArray(formatIds) ? formatIds : [formatIds];
    const queryString = new URLSearchParams({ 
      formatIds: ids.join(',') 
    }).toString();
    return apiRequest(`/payments/purchase-status?${queryString}`);
  },
};