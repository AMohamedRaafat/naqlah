'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ServicesSection() {
  const t = useTranslations('services');

  const services = [
    {
      icon: '/assets/services/fk.svg',
      titleKey: 'disassembly',
    },
    {
      icon: '/assets/services/track.svg',
      titleKey: 'liveTracking',
    },
    {
      icon: '/assets/services/move.svg',
      titleKey: 'furnitureMoving',
    },
    {
      icon: '/assets/services/cover.svg',
      titleKey: 'packing',
    },
    {
      icon: '/assets/services/clean.svg',
      titleKey: 'cleaning',
    },
    {
      icon: '/assets/services/secure.svg',
      titleKey: 'securityPacking',
    },
  ];

  return (
    <section id="services" className="mb-6 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-start text-[#4B4F63] mb-4">
          {t('title')}
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  md:gap-6 rounded-3xl border-2 border-[#ededed]">
          {services.map((service, index) => {
            const totalItems = services.length;
            const isLastRow = index >= totalItems - 2; // Last row in 2-col layout
            const isLastRowMd = index >= totalItems - 3; // Last row in 3-col layout
            const isLastRowLg = index >= totalItems - 6; // Last row in 6-col layout

            return (
              <div
                key={index}
                className="border-[#ededed] bg-white mx-2 mb-2 mt-2 py-2 px-2 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                style={{
                  borderTopWidth: '0px',
                  borderLeftWidth: index % 2 === 0 && index < totalItems - 1 ? '2px' : '0px', // Right border for left column items
                  borderBottomWidth: '0px', // Bottom border except last row
                  borderRightWidth: '0px',
                }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Image
                    src={service.icon}
                    alt={service.titleKey}
                    width={64}
                    height={64}
                    className=" text-white"
                  />
                </div>
                <h3 className="text-sm font-semibold text-[#6B6E80] leading-snug">
                  {t(service.titleKey)}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
