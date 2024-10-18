import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Devanshi NX Banquets - Best Banquet Hall in Navi Mumbai',
  description: 'Devanshi NX Banquets offers the best banquet hall in Navi Mumbai for weddings, engagements, birthdays, and corporate events. Book your perfect event venue today!',
  keywords: 'banquet hall, Navi Mumbai, wedding venue, event space, corporate events, birthday parties',
  openGraph: {
    title: 'Devanshi NX Banquets - Best Banquet Hall in Navi Mumbai',
    description: 'Book your perfect event at Devanshi NX Banquets, the best banquet hall in Navi Mumbai.',
    images: [
      {
        url: 'https://www.devanshiNXbanquets.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Devanshi NX Banquets Hall',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devanshi NX Banquets - Best Banquet Hall in Navi Mumbai',
    description: 'Book your perfect event at Devanshi NX Banquets, the best banquet hall in Navi Mumbai.',
    images: ['https://www.devanshiNXbanquets.com/images/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
