'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';

export default function ThemeColor() {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect system theme preference
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial state
    setIsDark(darkModeQuery.matches);

    // Listen for theme changes
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    darkModeQuery.addEventListener('change', handleThemeChange);

    return () => {
      darkModeQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    // Check if current page uses app layout (custom layout with white navbar)
    const appLayoutPages = ['/dashboard', '/profile', '/settings', '/register-company'];
    const isAppLayout = appLayoutPages.some((page) => pathname.startsWith(page));

    // Determine theme color based on page type and system theme
    let themeColor: string;

    if (isLoggedIn || isAppLayout) {
      // App layout pages: White (light mode) or Dark gray (dark mode)
      themeColor = '#fff';
    } else {
      // Public pages: Primary teal (light mode) or Darker teal (dark mode)
      themeColor = '#00B8A9';
    }

    // Update existing meta tag or create new one
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    } else {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      metaThemeColor.setAttribute('content', themeColor);
      document.head.appendChild(metaThemeColor);
    }
  }, [isLoggedIn, isDark, pathname]);

  return null;
}
