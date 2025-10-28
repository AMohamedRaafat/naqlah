'use client';

import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#00B8A9] flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <Image
          src="/assets/logo.svg"
          alt="Loading..."
          width={300}
          height={120}
          className="w-64 h-auto animate-pulse"
          priority
        />
      </div>
    </div>
  );
}

