import { InternalAxiosRequestConfig } from 'axios';

/**
 * Request interceptor to add auth token to requests
 */
export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // Get token from localStorage or cookies
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  // Add language to headers
  const locale = typeof window !== 'undefined' 
    ? window.location.pathname.split('/')[1] || 'ar'
    : 'ar';
  
  if (config.headers) {
    config.headers['Accept-Language'] = locale;
  }

  // Log request in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📤 Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });
  }

  return config;
};

/**
 * Request error interceptor
 */
export const requestErrorInterceptor = (error: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Request Error:', error);
  }
  return Promise.reject(error);
};

