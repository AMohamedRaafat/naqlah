import axiosInstance from '@/lib/axios';

/**
 * Example service for API calls
 * You can create multiple service files for different API endpoints
 */

export interface ExampleData {
  id: number;
  title: string;
  description: string;
}

export const exampleService = {
  /**
   * Get all items
   */
  getAll: async (): Promise<ExampleData[]> => {
    const response = await axiosInstance.get('/items');
    return response.data;
  },

  /**
   * Get item by ID
   */
  getById: async (id: number): Promise<ExampleData> => {
    const response = await axiosInstance.get(`/items/${id}`);
    return response.data;
  },

  /**
   * Create new item
   */
  create: async (data: Omit<ExampleData, 'id'>): Promise<ExampleData> => {
    const response = await axiosInstance.post('/items', data);
    return response.data;
  },

  /**
   * Update item
   */
  update: async (id: number, data: Partial<ExampleData>): Promise<ExampleData> => {
    const response = await axiosInstance.put(`/items/${id}`, data);
    return response.data;
  },

  /**
   * Delete item
   */
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/items/${id}`);
  },
};

