import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Plan {
  id: number;
  name: string;
  description: string | null;
  features: string[];
  price: number;
  currency: string;
  duration_days: number;
  is_active: boolean;
  listing_limit: number | null;
  featured_listings: boolean;
  priority_support: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: number;
  user_id: number;
  plan_id: number;
  starts_at: string;
  ends_at: string;
  status: 'active' | 'expired' | 'cancelled';
  plan: Plan;
  created_at: string;
  updated_at: string;
}

/**
 * Get all active plans (public endpoint)
 */
export async function getPlans(): Promise<Plan[]> {
  const response = await axios.get(`${API_URL}/api/plans`);
  return response.data;
}

/**
 * Subscribe to a plan
 */
export async function subscribeToPlan(planId: number, token: string): Promise<{ message: string; subscription: Subscription }> {
  const response = await axios.post(
    `${API_URL}/api/plans/${planId}/subscribe`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

/**
 * Get user's subscriptions
 */
export async function getMySubscriptions(token: string): Promise<Subscription[]> {
  const response = await axios.get(`${API_URL}/api/subscriptions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(subscriptionId: number, token: string): Promise<{ message: string; subscription: Subscription }> {
  const response = await axios.post(
    `${API_URL}/api/subscriptions/${subscriptionId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
