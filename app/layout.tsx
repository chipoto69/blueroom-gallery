import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'BlueRoom Gallery',
  description: 'Interactive gallery showcase with stunning visual effects and seamless scanning technology',
  keywords: ['gallery', 'photography', 'art', 'interactive', 'visual effects'],
  authors: [{ name: 'BlueRoom' }],
  creator: 'BlueRoom',
  publisher: 'BlueRoom',
  metadataBase: new URL('https://blueroom.live'),
  openGraph: {
    title: 'BlueRoom Gallery',
    description: 'Interactive gallery showcase with stunning visual effects and seamless scanning technology',
    url: 'https://blueroom.live',
    siteName: 'BlueRoom Gallery',
    images: [
      {
        url: '/gallery/image00001.jpg',
        width: 720,
        height: 1080,
        alt: 'BlueRoom Gallery Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlueRoom Gallery',
    description: 'Interactive gallery showcase with stunning visual effects and seamless scanning technology',
    images: ['/gallery/image00001.jpg'],
    creator: '@blueroom',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
