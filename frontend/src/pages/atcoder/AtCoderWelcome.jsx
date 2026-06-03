
import React from 'react';
export default function AtCoderWelcome() {
  return (
    <div className="page-container">
      <div className="content-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#222', backgroundColor: '#fff', display: 'inline-block', padding: '0 1rem', borderRadius: '8px' }}>AtCoder Hub</h1>
        <p className="subtitle" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '2rem auto' }}>
          Your central dashboard for AtCoder. Explore Japanese competitive programming contests, track user submissions via Kenkoooo API, and practice beginner rounds.
        </p>
      </div>
    </div>
  );
}