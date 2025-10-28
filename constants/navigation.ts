/**
 * Centralized Navigation Configuration
 * Edit navigation items in one place for both desktop and mobile navbars
 */

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuItem {
  icon: string;
  label: string;
  href: string;
  section?: string;
  isExternal?: boolean;
}

interface NavigationConfig {
  isLoggedIn: boolean;
  isCompany: boolean;
  t: (key: string) => string;
}

/**
 * Get navigation items for desktop navbar
 */
export const getNavItems = ({ isLoggedIn, isCompany, t }: NavigationConfig): NavItem[] => {
  const items: NavItem[] = [];

  // Home - Always visible
  items.push({
    label: t('navigation.home'),
    href: '/',
  });

  // Dashboard - Only when logged in
  if (isLoggedIn) {
    items.push({
      label: t('navigation.dashboard'),
      href: '/dashboard',
    });
  }
  if (!isLoggedIn) {
    items.push({
      label: t('navigation.logIn'),
      href: '/dashboard',
    });
  }

  // Partners - Hidden for companies when logged in
  if (!isLoggedIn || !isCompany) {
    items.push({
      label: t('navigation.partners'),
      href: '#partners',
    });
  }

  // Services - Always visible
  if (!isLoggedIn) {
    items.push({
      label: t('navigation.services'),
      href: '#services',
    });
  }
  // About - Always visible
  if (!isLoggedIn) {
    items.push({
      label: t('common.about'),
      href: '#about',
    });
  }
  // Contact - Always visible
  if (!isLoggedIn) {
    items.push({
      label: t('common.contact'),
      href: '#contact',
    });
  }

  return items;
};

/**
 * Get menu items for mobile navbar
 */
export const getMobileMenuItems = ({
  isLoggedIn,
  isCompany,
  t,
}: NavigationConfig): MobileMenuItem[] => {
  const items: MobileMenuItem[] = [];

  // Home - Always visible
  items.push({
    icon: '/assets/menu-icons/home.svg',
    label: t('navigation.home'),
    href: '/',
    isExternal: true,
  });

  // Dashboard - Only when logged in
  if (isLoggedIn) {
    items.push({
      icon: '/assets/menu-icons/dashboard.svg',
      label: t('navigation.dashboard'),
      href: '/dashboard',
      isExternal: true,
    });
  }
  if (!isLoggedIn) {
    items.push({
      icon: '/assets/menu-icons/login.svg',
      label: t('navigation.logIn'),
      href: '/login',
      isExternal: true,
    });
  }

  // Partners - Hidden for companies when logged in
  if (!isLoggedIn) {
    items.push({
      icon: '/assets/menu-icons/partners.svg',
      label: t('navigation.partners'),
      href: '#partners',
      section: 'partners',
    });
  }

  if (!isLoggedIn) {
    items.push({
      icon: '/assets/menu-icons/who.svg',
      label: t('common.about'),
      href: '#about',
      section: 'about',
    });
  }
  if (!isLoggedIn) {
    items.push({
      icon: '/assets/menu-icons/phone.svg',
      label: t('common.contact'),
      href: '#contact',
      section: 'contact',
    });
  }

  return items;
};

/**
 * Get page title based on pathname
 */
export const getPageTitle = (pathname: string, t: (key: string) => string): string => {
  if (pathname === '/dashboard') return t('navigation.dashboard');
  if (pathname === '/settings') return t('navigation.settings');
  if (pathname === '/profile') return t('navigation.profile');
  if (pathname === '/register-company') return t('registerCompany.pageTitle');
  return t('navigation.home');
};
