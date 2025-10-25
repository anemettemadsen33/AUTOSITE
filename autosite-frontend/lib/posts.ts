import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content?: string;
  featured_image: string | null;
  published_at: string;
  author: string;
  views: number;
  created_at?: string;
  updated_at?: string;
}

export interface PostsResponse {
  current_page: number;
  data: Post[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export async function getPosts(page: number = 1, locale: string = 'en'): Promise<PostsResponse> {
  const response = await axios.get(`${API_URL}/posts`, {
    params: { page },
    headers: { 'Accept-Language': locale },
  });
  return response.data;
}

export async function getPost(slug: string, locale: string = 'en'): Promise<Post> {
  const response = await axios.get(`${API_URL}/posts/${slug}`, {
    headers: { 'Accept-Language': locale },
  });
  return response.data;
}
