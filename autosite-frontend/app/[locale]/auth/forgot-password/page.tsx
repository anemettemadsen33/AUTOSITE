'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { Button, Input } from '@/components/ui';
import api from '@/lib/api';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const t = useTranslations('auth');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      await api.post('/password/forgot', { email: data.email });
      setEmailSent(true);
      toast.success(t('passwordResetEmailSent'));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('passwordResetError');
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('forgotPassword')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('forgotPasswordSubtitle')}
          </p>
        </div>

        {emailSent ? (
          /* Success Message */
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-green-800 dark:text-green-200">
              {t('checkYourEmail')}
            </h3>
            <p className="mt-2 text-sm text-green-700 dark:text-green-300">
              {t('passwordResetEmailSent')}
            </p>
            <Link
              href="/auth/login"
              className="mt-6 inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('backToLogin')}
            </Link>
          </div>
        ) : (
          /* Forgot Password Form */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label={t('email')}
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              fullWidth
              {...register('email', {
                required: t('emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('invalidEmail'),
                },
              })}
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              fullWidth
            >
              {t('sendResetLink')}
            </Button>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t('backToLogin')}
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
