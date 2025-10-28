'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PartnersSection() {
  const t = useTranslations('partners');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Partners array - should be in pairs for 2 rows
  const partners = [
    { id: 1, name: 'Partner 1', logo: '/partners/partner1.png' },
    { id: 2, name: 'Partner 2', logo: '/partners/partner2.png' },
    { id: 3, name: 'Partner 3', logo: '/partners/partner3.png' },
    { id: 4, name: 'Partner 4', logo: '/partners/partner4.png' },
    { id: 5, name: 'Partner 5', logo: '/partners/partner5.png' },
    { id: 6, name: 'Partner 6', logo: '/partners/partner6.png' },
    { id: 7, name: 'Partner 7', logo: '/partners/partner7.png' },
    { id: 8, name: 'Partner 8', logo: '/partners/partner8.png' },
    { id: 9, name: 'Partner 9', logo: '/partners/partner9.png' },
    { id: 10, name: 'Partner 10', logo: '/partners/partner10.png' },
    { id: 11, name: 'Partner 11', logo: '/partners/partner11.png' },
    { id: 12, name: 'Partner 12', logo: '/partners/partner12.png' },
  ];

  // Organize partners into columns (2 items per column)
  const columnsPerSlide = 3;
  const partnersPerColumn = 2;
  const totalColumns = Math.ceil(partners.length / partnersPerColumn);
  const totalSlides = Math.ceil(totalColumns / columnsPerSlide);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section id="partners" className="py-12 px-4 bg-gray-50 ">
      <div className="container mx-auto max-w-4xl ">
        <h2 className="text-2xl md:text-3xl font-bold text-start text-[#4B4F63]  mb-8">
          {t('title')}
        </h2>

        {/* Partners Container */}
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border-2 border-[#ededed]">
          {/* Partners Grid - 3 columns, 2 rows with horizontal carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {/* Generate all columns */}
              {Array.from({ length: totalColumns }).map((_, colIndex) => {
                const columnPartners = partners.slice(
                  colIndex * partnersPerColumn,
                  (colIndex + 1) * partnersPerColumn
                );
                return (
                  <div
                    key={colIndex}
                    className="flex-shrink-0 w-1/3 grid grid-rows-2 gap-6 md:gap-8"
                  >
                    {columnPartners.map((partner) => (
                      <div
                        key={partner.id}
                        className="flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105"
                        style={{
                          borderLeftWidth:
                            colIndex !== 0 && colIndex % 3 !== 0 ? '2px' : '0px',
                          borderColor: '#ededed',
                        }}
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
                    {/* Fill empty space if column has only 1 partner */}
                    {columnPartners.length === 1 && (
                      <div
                        className="flex items-center justify-center p-4"
                        style={{
                          borderLeftWidth:
                            colIndex !== 0 && colIndex % 3 !== 0 ? '2px' : '0px',
                          borderColor: '#ededed',
                        }}
                      >
                        <div className="relative w-full aspect-square opacity-0"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-[#00B8A9] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
