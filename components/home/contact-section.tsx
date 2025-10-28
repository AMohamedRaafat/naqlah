'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
export default function ContactSection() {
  const t = useTranslations('contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messageTitle: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: '/assets/contact/address.svg',
      title: t('ourAddress'),
      description: 'حي النسيم الغربي',
    },
    {
      icon: '/assets/contact/email.svg',
      title: t('email'),
      description: 'info@naqlah.com',
    },
    {
      icon: '/assets/contact/phone.svg',
      title: t('contactUs'),
      description: '+966 555 555 555',
      textDirection: 'ltr',
    },
  ];
  return (
    <section id="contact" className="mb-6 px-4 bg-white">
      <div className="container mx-auto max-w-2xl border-2 border-[#ededed] rounded-3xl p-4">
        <h2 className="text-2xl md:text-3xl font-bold text-start text-[#4B4F63]  mb-2">
          {t('title')}
        </h2>
        <p className="text-start text-[#7E7E7E] mb-8  text-[14px]">{t('description')}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('fullName')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('fullNamePlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('messageTitle')}
            </label>
            <input
              type="text"
              name="messageTitle"
              value={formData.messageTitle}
              onChange={handleChange}
              placeholder={t('messageTitlePlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('message')}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('messagePlaceholder')}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent resize-none"
            ></textarea>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-[14px]"
          >
            {t('sendMessage')}
          </Button>
        </form>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between flex-wrap ">
          {contactInfo.map((info) => (
            <div key={info.title} className="flex items-center justify-center gap-0 mb-4">
              <Image src={info.icon} alt={info.title} width={54} height={54} />
              <div>
                <h3 className="text-md font-medium text-[#00B8A9]">{info.title}</h3>
                <p
                  className="text-[11.5px] text-[#7E7E7E]"
                  style={{ direction: info.textDirection === 'ltr' ? 'ltr' : 'rtl' }}
                >
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
