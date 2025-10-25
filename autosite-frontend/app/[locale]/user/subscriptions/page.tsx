'use client';

import { useState, useEffect } from 'react';
import { getMySubscriptions, cancelSubscription, type Subscription } from '@/lib/plans';
import { useAuthStore } from '@/stores/authStore';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import Link from 'next/link';

export default function SubscriptionsPage() {
  const t = useTranslations('subscriptions');
  const { token } = useAuthStore();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<number | null>(null);

  useEffect(() => {
    const loadSubscriptions = async () => {
      if (!token) return;
      
      try {
        const data = await getMySubscriptions(token);
        setSubscriptions(data);
      } catch {
        toast.error(t('errorLoading'));
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptions();
  }, [token, t]);

  const loadSubscriptions = async () => {
    if (!token) return;
    
    try {
      const data = await getMySubscriptions(token);
      setSubscriptions(data);
    } catch {
      toast.error(t('errorLoading'));
    }
  };

  const handleCancel = async (subscriptionId: number) => {
    if (!token) return;
    if (!confirm(t('confirmCancel'))) return;

    setCancelling(subscriptionId);
    try {
      await cancelSubscription(subscriptionId, token);
      toast.success(t('cancelSuccess'));
      await loadSubscriptions();
    } catch {
      toast.error(t('cancelError'));
    } finally {
      setCancelling(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      expired: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {t(`status.${status}`)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  const activeSubscription = subscriptions.find((s) => s.status === 'active');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>

        {activeSubscription && (
          <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 mb-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">{activeSubscription.plan.name}</h2>
                <p className="mb-4 opacity-90">{activeSubscription.plan.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="opacity-75">{t('startDate')}: </span>
                    <span className="font-semibold">
                      {format(new Date(activeSubscription.starts_at), 'PPP')}
                    </span>
                  </div>
                  <div>
                    <span className="opacity-75">{t('endDate')}: </span>
                    <span className="font-semibold">
                      {format(new Date(activeSubscription.ends_at), 'PPP')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-2">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: activeSubscription.plan.currency,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(activeSubscription.plan.price)}
                </div>
                <button
                  onClick={() => handleCancel(activeSubscription.id)}
                  disabled={cancelling === activeSubscription.id}
                  className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelling === activeSubscription.id ? t('cancelling') : t('cancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        {!activeSubscription && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-800 mb-4">{t('noActiveSubscription')}</p>
            <Link
              href="/pricing"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('viewPlans')}
            </Link>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{t('subscriptionHistory')}</h2>
          </div>

          {subscriptions.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 mb-4">{t('noSubscriptions')}</p>
              <Link
                href="/pricing"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('viewPlans')}
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {subscription.plan.name}
                        </h3>
                        {getStatusBadge(subscription.status)}
                      </div>
                      {subscription.plan.description && (
                        <p className="text-gray-600 mb-3">{subscription.plan.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">{t('startDate')}: </span>
                          {format(new Date(subscription.starts_at), 'PPP')}
                        </div>
                        <div>
                          <span className="font-medium">{t('endDate')}: </span>
                          {format(new Date(subscription.ends_at), 'PPP')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-gray-900 mb-2">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: subscription.plan.currency,
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(subscription.plan.price)}
                      </div>
                      {subscription.status === 'active' && (
                        <button
                          onClick={() => handleCancel(subscription.id)}
                          disabled={cancelling === subscription.id}
                          className="px-4 py-1 text-sm text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {cancelling === subscription.id ? t('cancelling') : t('cancel')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
