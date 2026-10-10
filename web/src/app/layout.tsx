import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import Preloader from "@/components/Preloader";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import AdSenseSideRails from "@/components/AdSenseSideRails";
import SealPdfFloatingBanner from "@/components/SealPdfFloatingBanner";

  
export const metadata: Metadata = {
  metadataBase: new URL('https://vtuwise.in'),
  title: "VTU Notes, Previous Question Papers & Study Materials for VTU Students | vtuwise",
  description: "Get premium engineering notes, previous year question papers, syllabus, and model papers for all branches. Designed exclusively for VTU students to excel in exams.",
  keywords: ["VTU", "VTU notes", "VTU question papers", "engineering notes", "VTU syllabus", "model question papers", "vtuwise", "vtu 25 scheme notes", "vtu 22 scheme notes", "vtu code", "VTU question papers", "VTU study materials", "VTU syllabus", "engineering notes", "vtu pyq", "vtu study material", "vtu resources", "vtu student community", "vtu engineering notes", "Visvesvaraya Technological University"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Marck+Script&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="monetag" content="f742637c8e38e1b97a1d2a49930d2b82" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="VTUwise" />
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
        <Script
          async
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
          custom-element="amp-auto-ads"
          strategy="afterInteractive"
        />
        {/* Yandex Autoplacement 19658567 */}
        <Script
          async
          src="https://yandex.ru/ads/system/context.js"
          strategy="afterInteractive"
        />
        <Script
          async
          data-page-id="19658567"
          src="https://yandex.ru/ads/system/ap-loader.js"
          strategy="afterInteractive"
        />
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uu18fl0e9s");
          `}
        </Script>
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').catch(function(err) {
                  console.log('ServiceWorker registration failed:', err);
                });
              });
            }
          `}
        </Script>
      </head>
      <body>
        {/* AMP Auto Ads */}
        {React.createElement('amp-auto-ads', {
          type: 'adsense',
          'data-ad-client': 'ca-pub-5780720681894064',
        })}
        <Preloader />
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
        <AdSenseSideRails />
        <WhatsAppPopup />
        <WhatsAppFloating />
        <SealPdfFloatingBanner />
        <Footer />
      </body>
    </html>
  );
}
