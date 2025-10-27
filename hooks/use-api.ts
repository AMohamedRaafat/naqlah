'use client';

import { useState, useCallback } from 'react';

/**
 * Custom hook for handling API calls with loading and error states
 */
export function useApi<T, P = any>(
  apiFunc: (params?: P) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (params?: P) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunc(params);
        setData(result);
        return result;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

