'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Truck from '@/public/assets/landing/truck.png';
import RequestMoveModal from '@/components/modals/request-move-modal';

export default function HeroSection() {
  const t = useTranslations('hero');
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="pt-8 md:pt-16 pb-12 md:pb-20 px-4 font-expo-arabic">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
            {t('title')}
            <br />
            <span className="text-[#00B8A9] mt-2 inline-block">{t('titleLine2')}</span>
          </h1>

          <p className="text-base font-medium md:text-lg text-[#2E3E5C] mb-6 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Ratings/Stats */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <p>{t('certifiedBy')}</p>
            <div>
              <Image src="/assets/hero/sakany.svg" alt="NHC" width={65} height={65} />
            </div>

            <div className="">
              <Image src="/assets/hero/nhc.svg" alt="NHC" width={65} height={65} />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Button
              onClick={() => setModalOpen(true)}
              className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-lg"
            >
              {t('ctaOrderMove')}
            </Button>
            <Button
              onClick={() => router.push('/register-company')}
              variant="outline"
              className="bg-[#18C9BF21] w-full border-2 border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9] hover:text-white font-semibold py-6 text-lg"
            >
              {t('ctaJoinPartner')}
            </Button>
          </div>
        </div>

        {/* Truck Illustration */}
        <div className="relative w-full max-w-2xl mx-auto mt-12">
          <div className="relative aspect-[16/10] w-full">
            <Image src={Truck} alt="Truck" width={1000} height={1000} />
          </div>
        </div>
      </div>

      {/* Request Move Modal */}
      <RequestMoveModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
}
