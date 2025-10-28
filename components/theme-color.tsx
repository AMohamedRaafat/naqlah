'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';

export default function ThemeColor() {
  const { isLoggedIn } = useAuth();
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
    // Determine theme color based on login state and system theme
    let themeColor: string;

    if (isLoggedIn) {
      // Logged in: White (light mode) or Dark gray (dark mode)
      themeColor = isDark ? '#1F2937' : '#FFFFFF';
    } else {
      // Not logged in: Primary teal (light mode) or Darker teal (dark mode)
      themeColor = isDark ? '#007973' : '#00B8A9';
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
  }, [isLoggedIn, isDark]);

  return null;
}
