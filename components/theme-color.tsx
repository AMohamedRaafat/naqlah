'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';

export default function ThemeColor() {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    // Update theme color based on login state
    const themeColor = isLoggedIn ? '#ffffff' : '#00B8A9';
    
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
  }, [isLoggedIn]);

  return null;
}

