'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import { login } from '@/lib/auth';
import { Button, Input } from '@/components/ui';

export const metadata = {
  title: 'Login | AutoMarket',
  description: 'Sign in to your AutoMarket account to manage your vehicle listings',
};

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await login({ email: data.email, password: data.password });
      setAuth(response.token, response.user);
      toast.success(`Welcome back, ${response.user.name}!`);
      router.push('/user/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
      setError(errorMessage);
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
            {t('login')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('loginSubtitle')}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <Input
            label={t('email')}
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            fullWidth
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />

          {/* Password */}
          <Input
            label={t('password')}
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            fullWidth
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            fullWidth
          >
            {t('login')}
          </Button>
        </form>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {t('noAccount')}{' '}
            <Link
              href="/auth/register"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {t('register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
