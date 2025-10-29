'use client';

import { useSidebar } from '@/hooks/use-sidebar';
import { useLanguage } from '@/contexts/language-context';
import AppNavbar from './app-navbar';
import AppSidebar from './app-sidebar';

/**
 * Layout wrapper for app pages (dashboard, profile, settings, etc.)
 * Manages persistent sidebar on desktop
 */
export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen, toggle } = useSidebar();
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
        <AppNavbar onToggleSidebar={toggle} />
      </div>

      {/* Sidebar - Desktop only, persistent */}
      <AppSidebar isOpen={isOpen} />

      {/* Main Content Area */}
      <main
        className={`flex-grow pt-[73px] transition-all duration-300 ${
          isOpen && isRTL ? 'lg:pr-80' : isOpen && !isRTL ? 'lg:pl-80' : ''
        }`}
      >
        {children}
      </main>
    </div>
  );
}
