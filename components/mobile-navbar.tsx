'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';
import { Menu, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { getMobileMenuItems, getPageTitle as getTitle } from '@/constants/navigation';

export default function MobileNavbar() {
  const t = useTranslations();
  const { locale, setLocale } = useLanguage();
  const { isLoggedIn, isCompany, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isRTL = locale === 'ar';

  // Get current page title from centralized function
  const pageTitle = getTitle(pathname, t);

  // Get menu items from centralized configuration
  const menuItems = useMemo(() => {
    return getMobileMenuItems({ isLoggedIn, isCompany, t });
  }, [isLoggedIn, isCompany, t]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  const switchLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    setLocale(newLocale);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div
        className={`lg:hidden font-expo-arabic ${
          isLoggedIn ? 'bg-white text-gray-900 border-b border-gray-200' : 'bg-[#00B8A9] text-white'
        }`}
      >
        <div className="flex items-end justify-between px-4 py-5">
          {/* Logo or Page Title */}
          {isLoggedIn ? (
            <div className={`flex items-center ${isRTL ? 'order-1' : 'order-1'}`}>
              <h1 className="text-xl font-semibold">{pageTitle}</h1>
            </div>
          ) : (
            <Link href="/" className={`flex items-center ${isRTL ? 'order-1' : 'order-1'}`}>
              <Image
                src="/assets/logo.svg"
                alt="سكني"
                width={22}
                height={22}
                className="h-full w-auto"
              />
            </Link>
          )}

          {/* Hamburger Menu and User Avatar - Same Border */}
          <div
            className={`flex items-center gap-3 rounded-xl px-2 py-1 ${
              isRTL ? 'order-1' : 'order-2'
            } ${isLoggedIn ? 'border border-gray-300' : 'border border-white'}`}
          >
            {/* Menu Button */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className={`p-0 ${isRTL ? 'order-1' : 'order-2'}`}>
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>

              <SheetContent
                side={isRTL ? 'right' : 'left'}
                className="w-full max-w-none p-0 font-expo-arabic"
              >
                <div className="flex flex-col h-full bg-white">
                  {/* Menu Items */}
                  <nav className="flex-1 pt-10 pb-4 px-4 text-black font-regular">
                    <ul className="space-y-0">
                      {menuItems.map((item, index) => {
                        // Check if this item is active
                        const isActive = pathname === item.href;

                        return (
                          <li key={index}>
                            {item.isExternal ? (
                              <Link
                                href={item.href || '/'}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-4 px-4 py-3 transition-colors ${
                                  isRTL ? 'flex-row text-right' : 'flex-row text-left'
                                } ${
                                  isActive
                                    ? 'bg-[#D2F2F0] border-r-2 border-[#00B8A9]'
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
                                    ? 'bg-[#D2F2F0] border-r-2 border-[#00B8A9]'
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
                    <div className="border-t border-gray-200 mt-4 py-3 ">
                      <button
                        onClick={switchLanguage}
                        className={`flex items-center gap-4 px-4 py-4 w-full hover:bg-gray-50 transition-colors  ${
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
                          <span className="text-gray-800 text-[15px]">
                            {t('navigation.logout')}
                          </span>
                        </button>
                      )}
                    </div>
                  </nav>

                  {/* Menu Footer */}
                </div>
              </SheetContent>
            </Sheet>

            {/* User Avatar - Navigate to Profile */}
            <Link
              href="/profile"
              className={`w-7 h-7 rounded-full overflow-hidden border-2 border-white ${
                isLoggedIn ? 'bg-gray-200' : 'bg-white'
              }`}
            >
              {!isLoggedIn ? <div className="w-full h-full p-1 bg-[#007973] " /> : ''}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
