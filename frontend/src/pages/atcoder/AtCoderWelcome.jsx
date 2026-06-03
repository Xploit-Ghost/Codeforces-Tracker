
import React from 'react';
import { Link } from 'react-router-dom';

export default function AtCoderWelcome() {
  return (
    <div className="page-container" style={{ padding: '2rem 5%' }}>
      <div className="content-card" style={{ textAlign: 'center', padding: '4rem 2rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#222', backgroundColor: '#fff', display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: '8px' }}>AtCoder Hub</h1>
        <p className="subtitle" style={{ fontSize: '1.4rem', maxWidth: '800px', margin: '1rem auto', color: '#ccc', lineHeight: '1.6' }}>
          Your central dashboard for Japanese Competitive Programming. Track your Kenkoooo submissions and never miss an upcoming ABC or ARC contest again.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px', border: '1px solid #333' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>🇯🇵 Recent Contests</h3>
          <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Instantly pull the last 50 AtCoder Beginner, Regular, and Grand Contests directly from the Kenkoooo API. Practice the freshest problems.</p>
          <Link to="/atcoder/contests" style={{ color: '#4da6ff', textDecoration: 'none', fontWeight: 'bold' }}>Browse Contests &rarr;</Link>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px', border: '1px solid #333' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>📊 Kenkoooo Submissions</h3>
          <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Look up any AtCoder handle to track exactly how many submissions they have ever made on the platform, bypassing AtCoder's lack of a native profile API.</p>
          <Link to="/atcoder/lookup" style={{ color: '#4da6ff', textDecoration: 'none', fontWeight: 'bold' }}>Find a User &rarr;</Link>
        </div>

      </div>
    </div>
  );
}