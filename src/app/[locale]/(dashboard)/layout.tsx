import type { Metadata } from 'next';

import Navbar from './_components/navbar';

export const metadata: Metadata = {
  title: '   لوحة التحكم',
  description: 'لوحة تحكم كافي دلي',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Navbar />
      <main className="mr-64 flex-1 min-h-screen bg-gray-50">{children}</main>
    </div>
  );
}
