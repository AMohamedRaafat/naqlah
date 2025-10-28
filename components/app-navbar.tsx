'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { getMobileMenuItems, getPageTitle } from '@/constants/navigation';

/**
 * Simplified navbar for authenticated/app pages
 * Desktop: Toggles persistent sidebar
 * Mobile: Uses drawer/sheet overlay
 */
interface AppNavbarProps {
  onToggleSidebar?: () => void;
}

export default function AppNavbar({ onToggleSidebar }: AppNavbarProps) {
  const t = useTranslations();
  const { locale, setLocale } = useLanguage();
  const { isLoggedIn, isCompany, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRTL = locale === 'ar';

  // Get current page title
  const pageTitle = getPageTitle(pathname, t);

  // Get menu items - same as mobile navbar
  const menuItems = getMobileMenuItems({ isLoggedIn, isCompany, t });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  const switchLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    setLocale(newLocale);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  return (
    <div className="bg-white text-gray-900  font-expo-arabic">
      <div className="flex items-end justify-between px-4 py-5 lg:px-6 lg:py-5 container mx-auto">
        {/* Page Title - Simple and clean */}
        <div className={`flex items-center ${isRTL ? 'order-1' : 'order-1'}`}>
          <h1 className="text-md lg:text-2xl font-semibold">{pageTitle}</h1>
        </div>

        {/* Menu Button and User Avatar */}
        <div
          className={`flex items-center gap-3 rounded-xl px-2 py-1 border border-[#00B8A9] ${
            isRTL ? 'order-1' : 'order-2'
          }`}
        >
          {/* Desktop Menu Button - Toggles persistent sidebar */}
          <button
            onClick={onToggleSidebar}
            className={`p-0 hidden lg:block ${isRTL ? 'order-1' : 'order-2'}`}
          >
            <Menu className="w-6 h-6 text-[#00B8A9]" />
          </button>

          {/* Mobile Menu Button - Opens drawer */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className={`p-0 lg:hidden ${isRTL ? 'order-1' : 'order-2'}`}>
                <Menu className="w-6 h-6 text-[#00B8A9]" />
              </button>
            </SheetTrigger>

            {/* Same Drawer Menu as Mobile Navbar */}
            <SheetContent
              side={isRTL ? 'right' : 'left'}
              className="w-full max-w-none p-0 font-expo-arabic"
            >
              <div className="flex flex-col h-full bg-white">
                <nav className="flex-1 pt-10 pb-4 px-4 text-black font-regular">
                  <ul className="space-y-0 mt-3">
                    {menuItems.map((item, index) => {
                      const isActive = pathname === item.href;

                      return (
                        <li key={index}>
                          {item.isExternal ? (
                            <Link
                              href={item.href || '/'}
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center gap-4 px-4 py-3 transition-colors ${
                                isRTL ? 'flex-row text-right' : 'flex-row text-left'
                              } ${
                                isActive
                                  ? 'bg-[#D2F2F0] rounded-md border-r-2 border-[#00B8A9]'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <Image
                                src={item.icon}
                                alt="icon"
                                width={20}
                                height={20}
                                className="w-6 h-6"
                                style={
                                  isActive
                                    ? {
                                        filter:
                                          'invert(61%) sepia(85%) saturate(490%) hue-rotate(122deg) brightness(93%) contrast(101%)',
                                      }
                                    : undefined
                                }
                              />
                              <span
                                className={`text-[15px] ${
                                  isActive ? 'text-[#00B8A9] font-semibold' : 'text-gray-800'
                                }`}
                              >
                                {item.label}
                              </span>
                            </Link>
                          ) : (
                            <button
                              onClick={() => item.section && scrollToSection(item.section)}
                              className={`flex items-center gap-4 px-4 py-3 transition-colors w-full ${
                                isRTL ? 'flex-row text-right' : 'flex-row text-left'
                              } ${
                                isActive
                                  ? 'bg-[#D2F2F0] rounded-md border-r-2 border-[#00B8A9]'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <Image
                                src={item.icon}
                                alt="icon"
                                width={20}
                                height={20}
                                className="w-6 h-6"
                                style={
                                  isActive
                                    ? {
                                        filter:
                                          'invert(61%) sepia(85%) saturate(490%) hue-rotate(122deg) brightness(93%) contrast(101%)',
                                      }
                                    : undefined
                                }
                              />
                              <span
                                className={`text-[15px] ${
                                  isActive ? 'text-[#00B8A9] font-semibold' : 'text-gray-800'
                                }`}
                              >
                                {item.label}
                              </span>
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-gray-200 mt-4 py-3">
                    <button
                      onClick={switchLanguage}
                      className={`flex items-center gap-4 px-4 py-4 w-full hover:bg-gray-50 transition-colors ${
                        isRTL ? 'flex-row text-right' : 'flex-row text-left'
                      }`}
                    >
                      <Image src="/assets/menu-icons/out.svg" alt="icon" width={20} height={20} />
                      <span className="text-gray-800 text-[15px]">{t('common.language')}</span>
                    </button>
                    {isLoggedIn && (
                      <button
                        onClick={handleLogout}
                        className={`flex items-center gap-4 px-4 py-4 w-full hover:bg-gray-50 transition-colors ${
                          isRTL ? 'flex-row text-right' : 'flex-row text-left'
                        }`}
                      >
                        <Image
                          src="/assets/menu-icons/out.svg"
                          alt="icon"
                          width={20}
                          height={20}
                          className="w-6 h-6 text-gray-800"
                        />
                        <span className="text-gray-800 text-[15px]">{t('navigation.logout')}</span>
                      </button>
                    )}
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
