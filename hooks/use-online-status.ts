'use client';

import { useState, useEffect } from 'react';
import { subscribeToOnlineStatus, checkOnlineStatus } from '@/lib/register-sw';

/**
 * Hook to detect and track online/offline status
 * @returns {boolean} Current online status
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Set initial status
    if (typeof window !== 'undefined') {
      setIsOnline(checkOnlineStatus());
    }

    // Subscribe to status changes
    const unsubscribe = subscribeToOnlineStatus((online) => {
      setIsOnline(online);
    });

    return unsubscribe;
  }, []);

  return isOnline;
}

