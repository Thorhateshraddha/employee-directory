
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Common API error handler
export const getErrorMessage = (error) => {
  if (error.response) {
    return (
      error.response.data?.message ||
      error.response.data?.error ||
      'Something went wrong on the server.'
    );
  }

  if (error.code === 'ECONNABORTED') {
    return 'Server request timed out. Please try again.';
  }

  if (error.request) {
    return 'Unable to connect to the server. Please check your backend.';
  }

  return error.message || 'An unexpected error occurred.';
};

export default api;
