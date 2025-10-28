import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Get locale from the default (can be overridden client-side)
  const locale = 'ar';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
