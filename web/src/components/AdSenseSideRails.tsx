'use client';

import React, { useEffect, useRef } from 'react';

interface AdSenseSideRailsProps {
  client?: string;
  slot?: string;
}

export const AdSenseSideRails: React.FC<AdSenseSideRailsProps> = ({
  client = 'ca-pub-5780720681894064',
  slot = '7758281762'
}) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple push calls during React strict-mode double mount in dev
    if (initializedRef.current) return;
    initializedRef.current = true;

    try {
      if (typeof window !== 'undefined') {
        // Ensure adsbygoogle is defined
        const adsbygoogle = (window as any).adsbygoogle || [];
        
        // Push once for left ad unit
        adsbygoogle.push({});
        // Push once for right ad unit
        adsbygoogle.push({});
      }
    } catch (err) {
      console.error('AdSense side rails push error:', err);
    }
  }, []);

  return (
    <>
      {/* Left Side Rail Ad */}
      <div className="ad-rail ad-rail-left" aria-hidden="true">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '160px', height: '600px' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="vertical"
          data-full-width-responsive="false"
        />
      </div>

      {/* Right Side Rail Ad */}
      <div className="ad-rail ad-rail-right" aria-hidden="true">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '160px', height: '600px' }}
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
