'use client';

import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText = 'Explore Listings',
  ctaHref = '/listings',
  backgroundImage = '/images/hero-bg.jpg',
}: HeroSectionProps) {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: '#0E2A47',
        }}
      >
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 animate-slide-up">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {subtitle}
        </p>
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-accent hover:bg-accent-600 transition-all duration-300 hover:scale-105 shadow-lg animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          {ctaText}
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
