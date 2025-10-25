import axios from 'axios';
import { Vehicle } from './vehicles';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Favorite {
  id: number;
  user_id: number;
  vehicle_id: number;
  created_at: string;
  updated_at: string;
  vehicle: Vehicle;
}

export async function getFavorites(token: string): Promise<Favorite[]> {
  const response = await axios.get(`${API_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
}

export async function toggleFavorite(
  token: string,
  vehicleId: number
): Promise<{ message: string; is_favorited: boolean }> {
  const response = await axios.post(
    `${API_URL}/favorites/toggle`,
    { vehicle_id: vehicleId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function checkFavorite(token: string, vehicleId: number): Promise<boolean> {
  const response = await axios.get(`${API_URL}/favorites/check/${vehicleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.is_favorited;
}
