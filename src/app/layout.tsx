import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AutoTube AI - Autonomous YouTube Automation Platform',
  description:
    'Autonomous AI-powered YouTube automation platform for viral topic discovery, competitor analysis, scriptwriting, voiceover, scene editing, thumbnails, SEO, and channel publishing.',
  openGraph: {
    title: 'AutoTube AI - Autonomous YouTube Automation Platform',
    description:
      'Autonomous AI-powered YouTube automation platform for viral topic discovery, competitor analysis, scriptwriting, voiceover, scene editing, thumbnails, SEO, and channel publishing.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased font-sans select-none overflow-hidden">
        {children}
      </body>
    </html>
  );
}
