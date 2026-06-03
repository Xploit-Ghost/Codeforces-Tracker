import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function AdminApprove() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState('Pending');
  const [error, setError] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const handleToTransfer = searchParams.get('handle');
  const oldUid = searchParams.get('oldUid');
  const newUid = searchParams.get('newUid');
  const newEmail = searchParams.get('newEmail');

  const isAdmin = currentUser && currentUser.email === 'anveshpol1522008@gmail.com';

  const approveTransfer = async () => {
    if (!isAdmin) {
      setError('You are not authorized to perform this action.');
      return;
    }

    if (!handleToTransfer || !oldUid || !newUid) {
      setError('Missing required parameters for transfer.');
      return;
    }

    setStatus('Processing...');
    
    try {
      // 1. Remove handle from old user
      await updateDoc(doc(db, 'users', oldUid), {
        cfHandle: ''
      });

      // 2. Add handle to new user
      await updateDoc(doc(db, 'users', newUid), {
        cfHandle: handleToTransfer
      });

      setStatus('Success');
    } catch (err) {
      console.error(err);
      setError(err.message);
      setStatus('Failed');
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#ffb86c' }}>Admin Approval Dashboard</h2>
      
      {!isAdmin ? (
        <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '2rem', borderRadius: '8px' }}>
          <h3>Access Denied</h3>
          <p>You must be signed in as the administrator (anveshpol1522008@gmail.com) to view this page.</p>
          <p>Currently signed in as: <strong>{currentUser?.email}</strong></p>
        </div>
      ) : (
        <div className="content-card">
          <h3>Handle Transfer Request</h3>
          <div style={{ margin: '2rem 0', textAlign: 'left', background: '#111', padding: '1.5rem', borderRadius: '8px' }}>
            <p><strong>Handle to Transfer:</strong> {handleToTransfer}</p>
            <p><strong>Transfer From (Old UID):</strong> {oldUid}</p>
            <p><strong>Transfer To (New UID):</strong> {newUid}</p>
            <p><strong>Transfer To (Email):</strong> {newEmail}</p>
          </div>

          {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
          
          {status === 'Success' ? (
            <div style={{ color: '#50fa7b', padding: '1rem', background: 'rgba(80, 250, 123, 0.1)', borderRadius: '4px' }}>
              Transfer completed successfully!
            </div>
          ) : (
            <button 
              onClick={approveTransfer} 
              disabled={status === 'Processing...'}
              style={{ padding: '1rem 2rem', fontSize: '1.2rem', background: '#50fa7b', color: '#000', fontWeight: 'bold' }}
            >
              {status === 'Processing...' ? 'Processing...' : 'APPROVE TRANSFER'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
