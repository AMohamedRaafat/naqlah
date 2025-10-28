'use client';

import { useLocalStorage } from './use-local-storage';

/**
 * Hook to manage sidebar open/closed state
 * Persists state in localStorage
 */
export function useSidebar() {
  const [isOpen, setIsOpen] = useLocalStorage('sidebar-open', true);

  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    toggle,
    open,
    close,
  };
}
