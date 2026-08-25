import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Puskesmas Lenteng | Pelayanan Kesehatan Masyarakat',
  description: 'Puskesmas Lenteng melayani pendaftaran antrean online, informasi kesehatan, dan pelayanan terpadu masyarakat secara profesional dan cepat.',
  keywords: ['puskesmas', 'lenteng', 'antrean online', 'kesehatan', 'berita puskesmas'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${outfit.variable} ${inter.className}`}>
                {children}
      </body>
    </html>
  );
}
