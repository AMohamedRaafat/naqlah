'use client';

import { useLanguage } from '@/contexts/language-context';
import { ArrowRight } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

export default function ProgressBar({ currentStep, totalSteps, onBack }: ProgressBarProps) {
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full flex items-center gap-3">
      {/* Back Arrow Button */}
      {onBack && currentStep > 1 && (
        <button
          onClick={onBack}
          className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Back"
        >
          <ArrowRight className={`w-5 h-5 text-gray-600 ${isRTL ? '' : 'rotate-180'}`} />
        </button>
      )}

      {/* Progress Bar */}
      <div className="flex-1">
        <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 h-full bg-[#00B8A9] transition-all duration-300 ease-in-out rounded-full"
            style={{
              width: `${progress}%`,
              [isRTL ? 'right' : 'left']: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
}

