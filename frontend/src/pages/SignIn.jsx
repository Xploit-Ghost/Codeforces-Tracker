import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../App.css';

export default function SignIn() {
  const { loginWithGoogle, currentUser, updateHandle, logout, continueAsGuest } = useAuth();
  const [handleInput, setHandleInput] = useState('');
  const [lcHandleInput, setLcHandleInput] = useState('');
  const [error, setError] = useState('');
  
  const [claimedHandleInfo, setClaimedHandleInfo] = useState(null);
  const [appealDescription, setAppealDescription] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    import('../firebase').then(({ auth }) => {
      import('firebase/auth').then(({ getRedirectResult }) => {
        getRedirectResult(auth).catch((err) => {
          setError(`Google Sign-In Error: ${err.message}`);
          console.error(err);
        });
      });
    });
  }, []);

  const initiateVerification = async () => {
    const handle = handleInput.trim();
    if (!handle) return;
    setError('');
    setIsChecking(true);

    try {
      // 1. Check if handle exists on CF
      const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
      if (res.data.status !== 'OK') throw new Error("Handle not found on Codeforces");
      
      const realHandle = res.data.result[0].handle;

      // 2. Check if handle is already linked by ANOTHER user
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('cfHandle', '==', realHandle));
      const snap = await getDocs(q);
      
      let alreadyClaimed = false;
      let claimedByEmail = '';
      let claimedByUid = '';
      snap.forEach(doc => {
        if (doc.id !== currentUser.uid) {
          alreadyClaimed = true;
          claimedByEmail = doc.data().email || 'Unknown';
          claimedByUid = doc.id;
        }
      });

      if (alreadyClaimed) {
        setClaimedHandleInfo({ realHandle, claimedByEmail, claimedByUid });
        return;
      }

      // Success! Link handle directly without compilation error check
      await updateHandle(realHandle, lcHandleInput);
      alert("Success! Your handle has been linked.");
      
    } catch (err) {
      setError(err.response?.data?.comment || err.message);
    } finally {
      setIsChecking(false);
    }
  };



  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card text-page" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: '3rem 2rem' }}>
        
        <h1 style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '2.2rem' }}>
          Welcome to CP Tracker
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
          Sign in to access your dashboard, save your Codeforces handle, and sync your data.
        </p>

        {error && <div style={{ color: '#ef4444', marginBottom: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '4px', border: '1px solid #ef4444' }}>{error}</div>}

        {!currentUser ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              onClick={() => {
                setError('');
                loginWithGoogle().catch(err => {
                  setError(`Failed to sign in: ${err.message}`);
                  console.error(err);
                });
              }}
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
            <button 
              onClick={continueAsGuest}
              style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid #333', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer' }}
            >
              Skip Sign In (Guest Mode)
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img src={currentUser.photoURL} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--accent)' }} />
            <h2 style={{ margin: 0, color: 'var(--text-main)' }}>Hi, {currentUser.displayName}!</h2>
            
            <div style={{ width: '100%', marginTop: '1rem', backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
              {!claimedHandleInfo ? (
                <>
                  <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>Link Your Profiles</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Enter your Codeforces handle to link it to your account.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input 
                      type="text" 
                      placeholder="Codeforces Handle (Required)" 
                      value={handleInput} 
                      onChange={(e) => setHandleInput(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box' }}
                      disabled={isChecking}
                    />
                    <input 
                      type="text" 
                      placeholder="Leetcode ID (Optional)" 
                      value={lcHandleInput} 
                      onChange={(e) => setLcHandleInput(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box' }}
                      disabled={isChecking}
                    />
                    <button onClick={initiateVerification} disabled={isChecking} style={{ width: '100%' }}>
                      {isChecking ? 'Checking...' : 'Link Handles'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ marginTop: 0, color: '#ff5555' }}>Handle Already Taken</h3>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '1rem', textAlign: 'left', lineHeight: '1.5' }}>
                    The handle <strong>{claimedHandleInfo.realHandle}</strong> is already linked to another account.
                  </p>
                  <textarea 
                    placeholder="Provide a description/proof for your appeal..."
                    value={appealDescription}
                    onChange={(e) => setAppealDescription(e.target.value)}
                    style={{ width: '100%', height: '80px', boxSizing: 'border-box', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setClaimedHandleInfo(null)} style={{ flex: 1, background: 'transparent', color: 'var(--text-muted)', border: '1px solid #555' }}>Cancel</button>
                    <a 
                      href={`mailto:anveshpol1522008@gmail.com?subject=Appeal for Handle Switch: ${claimedHandleInfo.realHandle}&body=User Appeal for Handle Switch%0D%0AOld User Email: ${claimedHandleInfo.claimedByEmail}%0D%0ANew User Email: ${currentUser.email}%0D%0AHandle to switch: ${claimedHandleInfo.realHandle}%0D%0A%0D%0ADescription:%0D%0A${encodeURIComponent(appealDescription)}%0D%0A%0D%0A-----------------%0D%0AADMIN ACTIONS:%0D%0A%0D%0A[APPROVE]%0D%0Ahttps://codeforces-tracker.vercel.app/admin/approve?handle=${claimedHandleInfo.realHandle}&oldUid=${claimedHandleInfo.claimedByUid}&newUid=${currentUser.uid}&newEmail=${currentUser.email}%0D%0A%0D%0A[REJECT]%0D%0A(Simply ignore or reply to the user)`}
                      style={{ flex: 2, background: '#ffb86c', color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontWeight: 'bold' }}
                    >
                      APPEAL
                    </a>
                  </div>
                </>
              )}
            </div>
            
            <button 
              onClick={async () => {
                await logout();
              }} 
              style={{ marginTop: '1rem', backgroundColor: 'transparent', color: '#ef4444', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
              Sign out
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
