'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function PartnersSection() {
  const t = useTranslations('partners');
  const { locale } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const isRTL = locale === 'ar';

  // Partners array - 12 partners total, will show 6 per slide (3 cols x 2 rows)
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

  // Group partners into slides of 6 (3 columns x 2 rows)
  const partnersPerSlide = 6;
  const slides = [];
  for (let i = 0; i < partners.length; i += partnersPerSlide) {
    slides.push(partners.slice(i, i + partnersPerSlide));
  }

  // Track current slide
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="partners" className="mb-6 px-4 ">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-start text-[#4B4F63] mb-4">
          {t('title')}
        </h2>

        {/* Partners Container */}
        <div className="bg-white rounded-3xl shadow-sm p-4 md:p-10 border-2 border-[#ededed]">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              direction: isRTL ? 'rtl' : 'ltr',
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {slides.map((slidePartners, slideIndex) => (
                <CarouselItem key={slideIndex}>
                  {/* 3 columns x 2 rows grid */}
                  <div className="grid grid-cols-3 gap-6 md:gap-8">
                    {slidePartners.map((partner, index) => (
                      <div
                        key={partner.id}
                        className="flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105"
                        style={{
                          borderLeftWidth: '2px',
                          borderColor: '#ededed',
                        }}
                      >
                        <div className="relative w-full aspect-square">
                          {/* Placeholder for partner logo - replace with actual images */}
                          <div className="w-full h-full flex items-center justify-center  rounded-lg">
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
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === index ? 'bg-[#00B8A9] scale-125' : 'bg-gray-300 hover:bg-gray-400'
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
