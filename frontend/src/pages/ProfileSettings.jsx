import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default function ProfileSettings() {
  const { currentUser, cfHandle, updateHandle, logout } = useAuth();
  
  const [newCfHandle, setNewCfHandle] = useState('');
  const [newLcHandle, setNewLcHandle] = useState('');
  
  const [claimedHandleInfo, setClaimedHandleInfo] = useState(null);
  const [appealDescription, setAppealDescription] = useState('');
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Load current handles
    const loadData = async () => {
      if (!currentUser) return;
      try {
        const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
        if (docSnap.exists()) {
          setNewCfHandle(docSnap.data().cfHandle || '');
          setNewLcHandle(docSnap.data().lcHandle || '');
        }
      } catch (err) {
        console.error("Failed to load user data", err);
      }
    };
    loadData();
  }, [currentUser]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setError('');
    setSuccess('');
    
    const targetCf = newCfHandle.trim();
    const targetLc = newLcHandle.trim();

    if (!targetCf) {
      setError("Codeforces handle is required.");
      setIsUpdating(false);
      return;
    }

    try {
      // Check if CF handle is claimed by someone else
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('cfHandle', '==', targetCf));
      const snap = await getDocs(q);
      
      let alreadyClaimed = false;
      let claimedByEmail = '';
      let claimedByUid = '';
      
      snap.forEach(document => {
        if (document.id !== currentUser.uid) {
          alreadyClaimed = true;
          claimedByEmail = document.data().email || 'Unknown';
          claimedByUid = document.id;
        }
      });

      if (alreadyClaimed) {
        setClaimedHandleInfo({ realHandle: targetCf, claimedByEmail, claimedByUid });
        setIsUpdating(false);
        return;
      }

      // Safe to update
      await updateHandle(targetCf, targetLc);
      setSuccess("Handles updated successfully!");
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Profile Settings</h2>
      
      <div className="content-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Update Handles</h3>
        
        {success && <div style={{ color: '#50fa7b', marginBottom: '1rem', background: 'rgba(80, 250, 123, 0.1)', padding: '1rem', borderRadius: '4px', border: '1px solid #50fa7b' }}>{success}</div>}
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '4px', border: '1px solid #ef4444' }}>{error}</div>}

        {!claimedHandleInfo ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Codeforces Handle (Required)</label>
              <input 
                type="text" 
                value={newCfHandle} 
                onChange={e => setNewCfHandle(e.target.value)} 
                style={{ width: '100%', boxSizing: 'border-box' }}
                disabled={isUpdating}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>LeetCode ID (Optional)</label>
              <input 
                type="text" 
                value={newLcHandle} 
                onChange={e => setNewLcHandle(e.target.value)} 
                style={{ width: '100%', boxSizing: 'border-box' }}
                disabled={isUpdating}
              />
            </div>
            <button onClick={handleUpdate} disabled={isUpdating} style={{ marginTop: '1rem' }}>
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <button 
          onClick={async () => {
            await logout();
          }} 
          style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          SIGN OUT
        </button>
      </div>
    </div>
  );
}
