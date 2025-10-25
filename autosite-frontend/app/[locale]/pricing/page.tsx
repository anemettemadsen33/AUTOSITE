'use client';

import { useState, useEffect } from 'react';
import { getPlans, subscribeToPlan, type Plan } from '@/lib/plans';
import { useAuthStore } from '@/stores/authStore';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const t = useTranslations('pricing');
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribingTo, setSubscribingTo] = useState<number | null>(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch {
        toast.error(t('errorLoadingPlans'));
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, [t]);

  const handleSubscribe = async (plan: Plan) => {
    if (!user || !token) {
      toast.error(t('pleaseLogin'));
      router.push('/login');
      return;
    }

    setSubscribingTo(plan.id);
    try {
      await subscribeToPlan(plan.id, token);
      toast.success(t('subscriptionSuccess'));
      router.push('/user/subscriptions');
    } catch {
      toast.error(t('subscriptionError'));
    } finally {
      setSubscribingTo(null);
    }
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        {plans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t('noPlans')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                  )}

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-600">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: plan.currency,
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(plan.price)}
                    </span>
                    <span className="text-gray-600 ml-2">
                      / {plan.duration_days} {t('days')}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {Object.entries(plan.features).map(([key, value]) => (
                      <li key={key} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{value}</span>
                      </li>
                    ))}

                    {plan.listing_limit && (
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">
                          {t('listingLimit', { limit: plan.listing_limit })}
                        </span>
                      </li>
                    )}

                    {!plan.listing_limit && (
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{t('unlimitedListings')}</span>
                      </li>
                    )}

                    {plan.featured_listings && (
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{t('featuredListings')}</span>
                      </li>
                    )}

                    {plan.priority_support && (
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{t('prioritySupport')}</span>
                      </li>
                    )}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={subscribingTo === plan.id}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    {subscribingTo === plan.id ? t('subscribing') : t('subscribe')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-gray-600">
          <p>{t('noPaymentNote')}</p>
        </div>
      </div>
    </div>
  );
}
