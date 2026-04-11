import { useEffect } from 'react';

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '728px', height: '90px' }}
           data-ad-client="ca-pub-9308316127561984"
           data-ad-slot="YOUR_AD_SLOT_ID"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
