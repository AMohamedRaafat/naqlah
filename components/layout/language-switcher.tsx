'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/button';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');
    
    router.push(newPathname);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={locale === 'ar' ? 'default' : 'outline'}
        onClick={() => switchLanguage('ar')}
        size="sm"
      >
        العربية
      </Button>
      <Button
        variant={locale === 'en' ? 'default' : 'outline'}
        onClick={() => switchLanguage('en')}
        size="sm"
      >
        English
      </Button>
    </div>
  );
}

