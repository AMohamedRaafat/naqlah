'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';
import MobileNavbar from './mobile-navbar';
import DesktopUserMenu from './desktop-user-menu';
import LoginModal from '@/components/modals/login-modal';
import { getNavItems, getPageTitle as getTitle } from '@/constants/navigation';

export default function Navbar() {
  const t = useTranslations();
  const { locale, setLocale } = useLanguage();
  const { isLoggedIn, isCompany } = useAuth();
  const pathname = usePathname();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Get current page title from centralized function
  const pageTitle = getTitle(pathname, t);

  // Check if we're on a page that should show logged-in style nav
  const showLoggedInStyle = isLoggedIn || pathname === '/register-company';

  // Get nav items from centralized configuration
  const navItems = useMemo(() => {
    return getNavItems({ isLoggedIn, isCompany, t });
  }, [isLoggedIn, isCompany, t]);

  const switchLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    setLocale(newLocale);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if this is the login link
    if (href === '/login') {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <>
      {/* Mobile Navbar */}
      <MobileNavbar />

      {/* Desktop Navbar */}
      <nav
        className={`hidden lg:block font-expo-arabic shadow-md ${
          showLoggedInStyle
            ? 'bg-white text-gray-900 border-b border-gray-200'
            : 'bg-[#00B8A9] text-white'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo or Page Title - Right side in RTL */}
            {showLoggedInStyle ? (
              <div className="flex items-center order-3">
                <h1 className="text-2xl font-semibold">{pageTitle}</h1>
              </div>
            ) : (
              <Link href="/" className="flex items-center order-1">
                <Image
                  src="/assets/logo.svg"
                  alt="سكني"
                  width={180}
                  height={80}
                  className="h-16 w-auto"
                />
              </Link>
            )}

            {/* Navigation Links - Center/Left in RTL */}
            <div className="flex items-center gap-8 order-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-medium relative group transition-colors ${
                    showLoggedInStyle
                      ? 'text-gray-900 hover:text-[#00B8A9]'
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                      showLoggedInStyle ? 'bg-[#00B8A9]' : 'bg-white'
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 order-3">
              {/* Language Switcher */}
              <button
                onClick={switchLanguage}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  showLoggedInStyle
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {locale === 'ar' ? 'English' : 'العربية'}
              </button>

              {/* User Menu Dropdown */}
              {isLoggedIn && <DesktopUserMenu />}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
}
