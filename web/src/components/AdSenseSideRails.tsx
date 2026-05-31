'use client';

import React, { useEffect, useState } from 'react';

interface AdSenseSideRailsProps {
  client?: string;
  slot?: string;
}

export const AdSenseSideRails: React.FC<AdSenseSideRailsProps> = ({
  client = 'ca-pub-5780720681894064',
  slot = '7758281762'
}) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [isClosedByUser, setIsClosedByUser] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const closed = sessionStorage.getItem('adRailsClosed') === 'true';
      if (closed) {
        setIsClosedByUser(true);
      }
    }
  }, []);

  const handleClose = () => {
    setIsClosedByUser(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('adRailsClosed', 'true');
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkSize = () => {
      const matchesWidth = window.innerWidth >= 1440;
      const matchesHeight = window.innerHeight >= 700;
      setShouldShow(matchesWidth && matchesHeight);
    };

    // Run initial size check
    checkSize();

    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  useEffect(() => {
    if (!shouldShow) return;

    // Small delay to ensure the elements are fully paint-rendered in the DOM tree
    const timer = setTimeout(() => {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        
        // Find all ins.adsbygoogle elements that have not been processed yet
        const unprocessed = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status])');
        
        unprocessed.forEach(() => {
          try {
            adsbygoogle.push({});
          } catch (pushErr) {
            console.error('AdSense push error:', pushErr);
          }
        });
      } catch (err) {
        console.error('AdSense side rails push error:', err);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [shouldShow]);

  if (!shouldShow || isClosedByUser) return null;

  return (
    <>
      {/* Left Side Rail Ad */}
      <div className="ad-rail ad-rail-left" aria-hidden="true">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="vertical"
          data-full-width-responsive="false"
        />
      </div>

      {/* Right Side Rail Ad */}
      <div className="ad-rail ad-rail-right" aria-hidden="true">
        <button 
          onClick={handleClose} 
          className="ad-rail-close" 
          title="Close Advertisements"
          aria-label="Close Advertisements"
        >
          &times;
        </button>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="vertical"
          data-full-width-responsive="false"
        />
      </div>
    </>
  );
};

export default AdSenseSideRails;
