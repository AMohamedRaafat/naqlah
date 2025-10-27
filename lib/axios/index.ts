import axiosInstance from './axios-instance';
import {
  requestInterceptor,
  requestErrorInterceptor,
} from './interceptors/request.interceptor';
import {
  responseInterceptor,
  responseErrorInterceptor,
} from './interceptors/response.interceptor';

// Setup request interceptors
axiosInstance.interceptors.request.use(
  requestInterceptor,
  requestErrorInterceptor
);

// Setup response interceptors
axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

export default axiosInstance;

