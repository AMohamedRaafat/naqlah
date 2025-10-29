'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '../ui/button';
import RequestMoveModal from '../modals/request-move-modal';

export default function BannerSection() {
  const t = useTranslations('banner');
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <>
      <section id="banner" className="bg-white px-4 mb-8 md:mb-16">
        <div className="mx-auto max-w-4xl bg-[#F4F4F4] p-4 md:p-8 flex items-center justify-between rounded-3xl">
          <div className="w-48 md:w-64">
            <h2 className="text-[12px] md:text-2xl lg:text-3xl font-medium text-start text-[#1E1F4B] mb-2 md:mb-4">
              {t('description')}
            </h2>
            <Button
              onClick={() => setShowRequestModal(true)}
              className="w-full md:w-auto bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-[14px] md:px-8"
            >
              {t('buttonText')}
            </Button>
          </div>
          <div className="w-72 md:w-96 text-end relative">
            <Image
              src="/assets/banner/truck.png"
              alt="banner"
              width={300}
              height={300}
              className="absolute bottom-0 left-0 -top-20 h-36 w-48 md:h-48 md:w-64"
            />
          </div>
        </div>
      </section>

      {/* Request Move Modal */}
      <RequestMoveModal open={showRequestModal} onOpenChange={setShowRequestModal} />
    </>
  );
}
