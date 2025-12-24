import Providers from '@/components/providers';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Sarabun, Tajawal, Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import localFont from 'next/font/local';

// Generate static params for each layout
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Fonts
// Sarabun English Font
const sarabun = Sarabun({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],

  variable: '--font-sarabun',
  display: 'swap',
});

// Tajawal Arabic Font
const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['arabic'],
  display: 'swap',
  weight: ['400', '500', '700', '800'],
});

// Edwardian English Font
const edwardian = localFont({
  src: '../../../public/fonts/ITCEDSCR.woff2',
  variable: '--font-edwardian',
  display: 'swap',
});

// Inter English Font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

// Types
type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

// Meta Data
export async function generateMetadata({ params: { locale } }: Pick<LayoutProps, 'params'>) {
  const t = await getTranslations({ locale });
  return {
    title: 'Nour El Sabah - لوحة التحكم',
  };
}

export default function LocaleLayout({ children, params: { locale } }: LayoutProps) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div
      className={`
        antialiased
        ${locale === 'ar' ? `${tajawal.variable} font-tajawal` : `${sarabun.variable} font-sarabun`}
        ${edwardian.variable} ${inter.variable}
      `}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Desktop only */}
      <div className="desktop-only">
        <Providers>{children}</Providers>
        <Toaster />
      </div>

      {/* Mobile message */}
      <div className="mobile-message flex items-center justify-center h-screen bg-purple-100 px-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center border border-purple-300">
          <h2 className="text-purple-700 text-3xl font-bold mb-4">
            هذا الموقع غير متاح على الموبايل
          </h2>
          <p className="text-purple-600 text-lg font-medium">
            من فضلك استخدم جهاز كمبيوتر للحصول على أفضل تجربة.
          </p>
        </div>
      </div>
    </div>
  );
}
