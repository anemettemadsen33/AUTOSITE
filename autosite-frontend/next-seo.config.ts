const config = {
  titleTemplate: '%s | AutoMarket',
  defaultTitle: 'AutoMarket - International Auto Marketplace',
  description: 'Find your perfect vehicle from verified dealers across Europe. Browse thousands of quality cars, trucks, and motorcycles.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    siteName: 'AutoMarket',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AutoMarket - International Auto Marketplace',
      },
    ],
  },
  twitter: {
    handle: '@automarket',
    site: '@automarket',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'keywords',
      content: 'cars, vehicles, auto marketplace, used cars, new cars, car dealers, Europe',
    },
  ],
};

export default config;
