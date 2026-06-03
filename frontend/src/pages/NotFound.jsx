import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import '../components/StartScreen.css';

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="landing-page-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
      <div className="card text-page" style={{ maxWidth: '800px', width: '100%', textAlign: 'center', padding: '4rem' }}>
        
        <h1 style={{ 
          fontSize: '8rem', 
          margin: '0', 
          color: 'var(--accent)', 
          textShadow: '0 0 30px rgba(43, 179, 167, 0.6)',
          fontFamily: 'Space Grotesk, sans-serif'
        }}>
          404
        </h1>
        
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: 'var(--text-main)', 
          marginBottom: '2rem',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          Your request got committed to /dev/null
        </h2>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
          It seems the page you are looking for has been garbage collected or never existed in the first place.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={{ 
            padding: '1rem 2rem', 
            backgroundColor: 'rgba(43, 179, 167, 0.1)', 
            color: 'var(--accent)', 
            border: '1px solid var(--accent)', 
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontFamily: 'Space Grotesk',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--accent)'; e.target.style.color = '#000'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'rgba(43, 179, 167, 0.1)'; e.target.style.color = 'var(--accent)'; }}
          >
            Return to Home Page
          </Link>
          
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            Auto-redirecting in {countdown}s...
          </p>
        </div>

      </div>
    </div>
  );
}
