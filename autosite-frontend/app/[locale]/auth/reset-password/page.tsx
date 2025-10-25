'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { Button, Input } from '@/components/ui';
import api from '@/lib/api';

interface ResetPasswordFormData {
  email: string;
  password: string;
  password_confirmation: string;
}

export default function ResetPasswordPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const password = watch('password');

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      toast.error(t('invalidResetToken'));
      router.push('/auth/forgot-password');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams, router, t]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error(t('invalidResetToken'));
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/password/reset', {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        token,
      });
      toast.success(t('passwordResetSuccess'));
      router.push('/auth/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('passwordResetError');
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('validatingToken')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('resetPassword')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('resetPasswordSubtitle')}
          </p>
        </div>

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
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

          {/* New Password */}
          <Input
            label={t('newPassword')}
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            fullWidth
            {...register('password', {
              required: t('passwordRequired'),
              minLength: {
                value: 8,
                message: t('passwordMinLength'),
              },
            })}
          />

          {/* Confirm Password */}
          <Input
            label={t('confirmPassword')}
            type="password"
            placeholder="••••••••"
            error={errors.password_confirmation?.message}
            fullWidth
            {...register('password_confirmation', {
              required: t('confirmPasswordRequired'),
              validate: (value) =>
                value === password || t('passwordsDoNotMatch'),
            })}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            fullWidth
          >
            {t('resetPasswordButton')}
          </Button>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              href="/auth/login"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('backToLogin')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
