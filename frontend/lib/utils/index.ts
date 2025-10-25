import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number,
  currency: string = 'EUR',
  locale: string = 'en'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(
  value: number,
  locale: string = 'en'
): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatDate(
  date: string | Date,
  locale: string = 'en'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function generateBreadcrumbs(pathname: string, locale: string = 'en') {
  const paths = pathname.split('/').filter(Boolean);
  if (paths[0] === locale) {
    paths.shift();
  }
  
  const breadcrumbs = [
    { label: 'Home', href: `/${locale}` },
  ];

  let currentPath = `/${locale}`;
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    breadcrumbs.push({
      label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
      href: currentPath,
    });
  });

  return breadcrumbs;
}
