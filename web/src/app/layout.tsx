import type { Metadata } from "next";
import { Inter, Marck_Script } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const marckScript = Marck_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marck-script',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vtuwise.in'),
  title: "VTU Notes, Previous Question Papers & Study Materials for VTU Students | vtuwise",
  description: "Get premium engineering notes, previous year question papers, syllabus, and model papers for all branches. Designed exclusively for VTU students to excel in exams.",
  keywords: ["VTU", "VTU notes", "VTU question papers", "engineering notes", "VTU syllabus", "model question papers", "vtuwise"],
  openGraph: {
    title: "VTUwise | Premium Engineering Resources",
    description: "Get premium engineering notes, previous year question papers, syllabus, and model papers for all branches.",
    url: 'https://vtuwise.in',
    siteName: 'VTUwise',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "VTUwise | Engineering Resources",
    description: "Get premium engineering notes, previous year question papers, syllabus, and model papers for all branches.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${marckScript.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PFXKL7BH');
          `}
        </Script>
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5780720681894064" 
          crossOrigin="anonymous" 
          strategy="afterInteractive"
        />
      </head>
      <body>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PFXKL7BH"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
