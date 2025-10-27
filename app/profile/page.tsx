'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const t = useTranslations();
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if not logged in
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-4xl text-gray-600">👤</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{user?.name || 'User'}</h2>
            <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
            {user?.isCompany && (
              <span className="inline-block mt-2 px-3 py-1 bg-[#00B8A9] text-white text-sm rounded-full">
                Company Account
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Information</h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Name:</strong> {user?.name || 'User'}</p>
              <p><strong>Email:</strong> {user?.email || 'user@example.com'}</p>
              <p><strong>Account Type:</strong> {user?.isCompany ? 'Company' : 'Individual'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

