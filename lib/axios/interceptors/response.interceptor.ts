import { AxiosResponse, AxiosError } from 'axios';

/**
 * Response interceptor to handle successful responses
 */
export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  // Log response in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📥 Response:', {
      status: response.status,
      data: response.data,
      url: response.config.url,
    });
  }

  return response;
};

/**
 * Response error interceptor to handle errors globally
 */
export const responseErrorInterceptor = async (error: AxiosError) => {
  if (error.response) {
    const { status, data } = error.response;

    // Handle different status codes
    switch (status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/ar/login';
        }
        break;

      case 403:
        // Forbidden
        console.error('Access forbidden');
        break;

      case 404:
        // Not found
        console.error('Resource not found');
        break;

      case 500:
        // Server error
        console.error('Server error');
        break;

      default:
        console.error('API Error:', data);
    }

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Response Error:', {
        status,
        data,
        url: error.config?.url,
      });
    }
  } else if (error.request) {
    // Request was made but no response received
    console.error('Network Error: No response received');
  } else {
    // Something else happened
    console.error('Error:', error.message);
  }

  return Promise.reject(error);
};

