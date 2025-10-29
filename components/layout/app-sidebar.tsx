'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';
import { getMobileMenuItems } from '@/constants/navigation';
import LanguageModal from '@/components/modals/language-modal';
import LogoutModal from '@/components/modals/logout-modal';

interface AppSidebarProps {
  isOpen: boolean;
}

/**
 * Persistent sidebar for desktop app pages
 * Stays open and allows interaction with page content
 */
export default function AppSidebar({ isOpen }: AppSidebarProps) {
  const t = useTranslations();
  const { locale, setLocale } = useLanguage();
  const { isLoggedIn, isCompany, logout } = useAuth();
  const pathname = usePathname();
  const isRTL = locale === 'ar';
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Get menu items
  const menuItems = useMemo(() => {
    return getMobileMenuItems({ isLoggedIn, isCompany, t });
  }, [isLoggedIn, isCompany, t]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isOpen) return null;

  return (
    <aside
      className={`hidden lg:block fixed top-[73px] ${
        isRTL ? 'right-0' : 'left-0'
      } h-[calc(100vh-73px)] w-80 bg-white border-${
        isRTL ? 'l' : 'r'
      } border-gray-200 z-40 overflow-y-auto`}
    >
      <nav className="flex flex-col h-full pt-6 pb-4 px-4 text-black font-expo-arabic">
        <ul className="space-y-0">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <li key={index}>
                {item.isExternal ? (
                  <Link
                    href={item.href || '/'}
                    className={`flex items-center gap-4 px-4 py-3 transition-colors rounded-md ${
                      isRTL ? 'flex-row text-right' : 'flex-row text-left'
                    } ${
                      isActive ? 'bg-[#D2F2F0] border-r-2 border-[#00B8A9]' : 'hover:bg-gray-50'
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
                    className={`flex items-center gap-4 px-4 py-3 transition-colors w-full rounded-md ${
                      isRTL ? 'flex-row text-right' : 'flex-row text-left'
                    } ${
                      isActive ? 'bg-[#D2F2F0] border-r-2 border-[#00B8A9]' : 'hover:bg-gray-50'
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
            onClick={() => setLanguageModalOpen(true)}
            className={`flex items-center gap-4 px-4 py-4 w-full hover:bg-gray-50 transition-colors rounded-md ${
              isRTL ? 'flex-row text-right' : 'flex-row text-left'
            }`}
          >
            <Image src="/assets/menu-icons/out.svg" alt="icon" width={20} height={20} />
            <span className="text-gray-800 text-[15px]">{t('common.language')}</span>
          </button>
          {isLoggedIn && (
            <button
              onClick={() => setLogoutModalOpen(true)}
              className={`flex items-center gap-4 px-4 py-4 w-full hover:bg-gray-50 transition-colors rounded-md ${
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
      
      {/* Language Modal */}
      <LanguageModal open={languageModalOpen} onOpenChange={setLanguageModalOpen} />
      
      {/* Logout Modal */}
      <LogoutModal open={logoutModalOpen} onOpenChange={setLogoutModalOpen} />
    </aside>
  );
}
