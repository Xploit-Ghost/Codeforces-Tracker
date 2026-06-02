import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function GuestLock({ children }) {
  const { currentUser, cfHandle, logout } = useAuth();

  if (!currentUser || !cfHandle) {
    return (
      <div className="container" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card text-page" style={{ maxWidth: '500px', textAlign: 'center', padding: '3rem' }}>
          <h2 style={{ color: '#ffb86c', marginBottom: '1rem', fontSize: '2rem' }}>🔒 Access Restricted</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            This feature requires a verified Codeforces handle to track your progress and sync your stats.
          </p>
          <button 
            onClick={() => {
              logout();
              window.location.href = '/';
            }} 
            style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', background: 'var(--accent)', color: '#000' }}
          >
            Sign In / Verify Handle
          </button>
        </div>
      </div>
    );
  }

  return children;
}
