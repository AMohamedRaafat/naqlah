'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { safeValidate, emailSchema, nonEmptyStringSchema } from '@/lib/validations/schemas';

// Contact form schema
const contactSchema = z.object({
  name: nonEmptyStringSchema.min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  messageTitle: nonEmptyStringSchema.min(3, 'Subject must be at least 3 characters'),
  message: nonEmptyStringSchema.min(10, 'Message must be at least 10 characters'),
});

export default function ContactSection() {
  const t = useTranslations('contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messageTitle: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    messageTitle: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate using Zod
    const validation = safeValidate(contactSchema, formData);

    if (!validation.success) {
      setErrors({
        name: validation.errors?.name || '',
        email: validation.errors?.email || '',
        messageTitle: validation.errors?.messageTitle || '',
        message: validation.errors?.message || '',
      });
      return;
    }

    // Handle successful form submission
    setIsSubmitting(true);
    console.log('Form submitted:', validation.data);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', messageTitle: '', message: '' });
      setErrors({ name: '', email: '', messageTitle: '', message: '' });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
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

        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="text-center font-medium">
              {t('successMessage') || 'Message sent successfully!'}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('fullName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('fullNamePlaceholder')}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('email')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('messageTitle')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="messageTitle"
              value={formData.messageTitle}
              onChange={handleChange}
              placeholder={t('messageTitlePlaceholder')}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent ${
                errors.messageTitle ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.messageTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.messageTitle}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('message')} <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('messagePlaceholder')}
              rows={4}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00B8A9] hover:bg-[#009688] text-white font-semibold py-6 text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('sending') || 'Sending...' : t('sendMessage')}
          </Button>
        </form>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between flex-wrap ">
          {contactInfo.map((info) => (
            <div key={info.title} className="flex items-center justify-center gap-2 mb-4">
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
