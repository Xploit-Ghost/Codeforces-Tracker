import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

export default function SignIn() {
  const { loginWithGoogle, currentUser, updateHandle, logout } = useAuth();
  const [handleInput, setHandleInput] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error(err);
    }
  };

  const handleSaveCF = async () => {
    if (!handleInput.trim()) return;
    try {
      await updateHandle(handleInput.trim());
    } catch (err) {
      setError('Failed to save Codeforces handle');
    }
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card text-page" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: '3rem 2rem' }}>
        
        <h1 style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '2.2rem' }}>
          Welcome to CP Tracker
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
          Please sign in to access your dashboard, save your Codeforces handle, and sync your data.
        </p>

        {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}

        {!currentUser ? (
          <button 
            onClick={handleGoogleSignIn}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              fontSize: '1.2rem', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '10px',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Sign in with Google
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img src={currentUser.photoURL} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--accent)' }} />
            <h2 style={{ margin: 0, color: 'var(--text-main)' }}>Hi, {currentUser.displayName}!</h2>
            
            <div style={{ width: '100%', marginTop: '1rem', backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
              <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>Link Codeforces Handle</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Enter your Codeforces handle. This will be automatically filled everywhere across the platform.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Codeforces Handle" 
                  value={handleInput} 
                  onChange={(e) => setHandleInput(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button onClick={handleSaveCF} style={{ whiteSpace: 'nowrap' }}>Save Handle</button>
              </div>
            </div>
            
            <button onClick={logout} style={{ marginTop: '1rem', backgroundColor: 'transparent', color: '#ef4444', border: 'none', textDecoration: 'underline' }}>
              Sign out
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
