import React, { useEffect } from 'react';
import '../App.css';

export default function VerticalAd({ side }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`vertical-ad-container ${side}`}>
      {/* Vertical Side ads */}
      <ins className="adsbygoogle"
           style={{ display: 'block', minWidth: '160px', height: '600px' }}
           data-ad-client="ca-pub-9308316127561984"
           data-ad-slot="7019153737"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
