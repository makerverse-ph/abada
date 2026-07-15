export const SITE_ORIGIN = 'https://stratsearch.org';

export interface SeoRoute {
  path: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  openGraph: {
    type: 'website';
    siteName: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
  };
  twitter: {
    card: 'summary_large_image';
  };
}

export const HOME_SEO: SeoRoute = {
  path: '/',
  title: 'StratSearch Foundation, Inc. | Evidence-Based Policy Research',
  description:
    'StratSearch Foundation, Inc. (SSFI) is a Philippine policy research and strategic development think tank championing science, evidence, and strategic insight in public decision-making.',
  canonical: `${SITE_ORIGIN}/`,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    type: 'website',
    siteName: 'StratSearch Foundation, Inc.',
    image:
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&h=630&fit=crop',
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: 'StratSearch Foundation, Inc. policy research and strategic development',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const INDEXABLE_ROUTES = [HOME_SEO] as const;

export const STRUCTURED_DATA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'StratSearch Foundation, Inc.',
    alternateName: 'SSFI',
    url: `${SITE_ORIGIN}/`,
    foundingDate: '1993',
    description:
      'StratSearch Foundation, Inc. is an independent policy research and strategic development think tank supporting public institutions, private organizations, and regional development actors through science-based research, program evaluations, and expert policy analysis.',
    email: 'mailto:stratsearchfoundation@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12 Makadios St., Sikatuna Village',
      addressLocality: 'Quezon City',
      postalCode: '1101',
      addressCountry: 'PH',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    name: 'StratSearch Foundation, Inc.',
    url: `${SITE_ORIGIN}/`,
    publisher: {
      '@id': `${SITE_ORIGIN}/#organization`,
    },
  },
] as const;
