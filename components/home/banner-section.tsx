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
      <section id="banner" className="bg-white">
        <div className="mx-auto max-w-2xl bg-[#F4F4F4] p-4 flex items-center justify-between">
          <div className="w-48">
            <h2 className="text-[12 px] md:text-3xl font-medium text-start text-[##1E1F4B]  mb-2">
              {t('description')}
            </h2>
            <Button
              onClick={() => setShowRequestModal(true)}
              className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-[14px]"
            >
              {t('buttonText')}
            </Button>
          </div>
          <div className="w-72 text-end relative">
            <Image
              src="/assets/banner/truck.png"
              alt="banner"
              width={300}
              height={300}
              className="absolute bottom-0 left-0 -top-20 h-36 w-48"
            />
          </div>
        </div>
      </section>

      {/* Request Move Modal */}
      <RequestMoveModal open={showRequestModal} onOpenChange={setShowRequestModal} />
    </>
  );
}
