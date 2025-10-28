'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function PartnersSection() {
  const t = useTranslations('partners');

  const partners = [
    { id: 1, name: 'Partner 1', logo: '/partners/partner1.png' },
    { id: 2, name: 'Partner 2', logo: '/partners/partner2.png' },
    { id: 3, name: 'Partner 3', logo: '/partners/partner3.png' },
    { id: 4, name: 'Partner 4', logo: '/partners/partner4.png' },
    { id: 5, name: 'Partner 5', logo: '/partners/partner5.png' },
  ];

  return (
    <section id="partners" className="py-12 px-4 bg-gray-50 ">
      <div className="container mx-auto max-w-4xl ">
        <h2 className="text-2xl md:text-3xl font-bold text-start text-[#4B4F63]  mb-8">
          {t('title')}
        </h2>

        {/* Partners Container */}
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border-2 border-[#ededed]">
          {/* Partners Grid - 3 columns, 2 rows */}
          <div className="grid grid-cols-3 gap-6 md:gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105 border-l-2 border-[#ededed]"
              >
                <div className="relative w-full aspect-square">
                  {/* Placeholder for partner logo - replace with actual images */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
                    <span className="text-4xl">🏢</span>
                  </div>
                  {/* Uncomment when you have actual images */}
                  {/* <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  /> */}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00B8A9]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
