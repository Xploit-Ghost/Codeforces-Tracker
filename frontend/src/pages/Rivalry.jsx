import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import '../App.css';

export default function Rivalry() {
  const { cfHandle } = useAuth();
  const [activeRivals, setActiveRivals] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [newRivalHandle, setNewRivalHandle] = useState('');
  const [loading, setLoading] = useState(true);
  const [myMonthlySolves, setMyMonthlySolves] = useState(0);

  const fetchRivalries = async () => {
    if (!cfHandle) return;
    setLoading(true);
    try {
      const rivalriesRef = collection(db, 'rivalries');
      
      const qTarget = query(rivalriesRef, where('targetHandle', '==', cfHandle));
      const qRequester = query(rivalriesRef, where('requesterHandle', '==', cfHandle));
      
      const [targetSnap, requesterSnap] = await Promise.all([getDocs(qTarget), getDocs(qRequester)]);
      
      const pending = [];
      const active = [];
      const sent = [];

      targetSnap.forEach(d => {
        const data = d.data();
        if (data.status === 'pending') pending.push({ id: d.id, ...data });
        if (data.status === 'accepted') active.push({ id: d.id, ...data, rivalHandle: data.requesterHandle });
      });

      requesterSnap.forEach(d => {
        const data = d.data();
        if (data.status === 'pending') sent.push({ id: d.id, ...data });
        if (data.status === 'accepted') active.push({ id: d.id, ...data, rivalHandle: data.targetHandle });
      });

      setPendingRequests(pending);
      setSentRequests(sent);
      
      // Fetch stats for active rivals
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000;

      const fetchMonthlySolves = async (handle) => {
        const res = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
        if (res.data.status === 'OK') {
          const solvedThisMonth = new Set();
          res.data.result.forEach(sub => {
            if (sub.verdict === 'OK' && sub.creationTimeSeconds >= firstDayOfMonth) {
              solvedThisMonth.add(`${sub.problem.contestId}-${sub.problem.index}`);
            }
          });
          return solvedThisMonth.size;
        }
        return 0;
      };

      const mySolves = await fetchMonthlySolves(cfHandle);
      setMyMonthlySolves(mySolves);

      const rivalsWithStats = await Promise.all(active.map(async (r) => {
        const rivalSolves = await fetchMonthlySolves(r.rivalHandle);
        return { ...r, rivalSolves };
      }));

      setActiveRivals(rivalsWithStats);
    } catch (error) {
      console.error("Error fetching rivalries", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRivalries();
  }, [cfHandle]);

  const sendRequest = async (e) => {
    e.preventDefault();
    const handle = newRivalHandle.trim();
    if (!handle || handle === cfHandle) return;

    try {
      // Check if user exists on CF
      const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
      if (res.data.status === 'OK') {
        const realHandle = res.data.result[0].handle;
        
        // Check if already requested or active
        const exists = [...pendingRequests, ...sentRequests, ...activeRivals].some(
          r => r.requesterHandle === realHandle || r.targetHandle === realHandle
        );

        if (exists) {
          alert("A rivalry or request with this user already exists.");
          return;
        }

        await addDoc(collection(db, 'rivalries'), {
          requesterHandle: cfHandle,
          targetHandle: realHandle,
          status: 'pending',
          createdAt: new Date().toISOString()
        });
        setNewRivalHandle('');
        fetchRivalries();
      }
    } catch (e) {
      alert("Could not find this handle on Codeforces.");
    }
  };

  const acceptRequest = async (id) => {
    await updateDoc(doc(db, 'rivalries', id), { status: 'accepted' });
    fetchRivalries();
  };

  const rejectOrStop = async (id) => {
    await deleteDoc(doc(db, 'rivalries', id));
    fetchRivalries();
  };

  if (!cfHandle) {
    return <div className="container"><p style={{ textAlign: 'center', color: 'var(--error)' }}>Please link your Codeforces handle to use Rivalry Mode.</p></div>;
  }

  return (
    <div className="container">
      <div className="card text-page" style={{ maxWidth: '1000px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--accent)' }}>Rivalry Mode</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          Challenge your friends! Compare monthly problem solves and push each other to improve.
        </p>

        <form onSubmit={sendRequest} className="search-form" style={{ marginBottom: '2rem' }}>
          <input 
            type="text" 
            placeholder="Enter friend's Codeforces handle" 
            value={newRivalHandle} 
            onChange={(e) => setNewRivalHandle(e.target.value)} 
          />
          <button type="submit">Add Rival</button>
        </form>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading rivalries...</p>
        ) : (
          <div>
            {/* Notifications Section */}
            {pendingRequests.length > 0 && (
              <div style={{ marginBottom: '2rem', background: 'rgba(255,184,108,0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid #ffb86c' }}>
                <h3 style={{ color: '#ffb86c', marginBottom: '1rem' }}>Rivalry Notifications ({pendingRequests.length})</h3>
                {pendingRequests.map(r => (
                  <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', background: '#111', padding: '0.8rem', borderRadius: '4px' }}>
                    <span><strong>{r.requesterHandle}</strong> wants to be your rival!</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => acceptRequest(r.id)} style={{ padding: '0.3rem 0.8rem', background: '#50fa7b', color: '#000', fontSize: '0.8rem' }}>Accept</button>
                      <button onClick={() => rejectOrStop(r.id)} style={{ padding: '0.3rem 0.8rem', background: '#ff5555', color: '#fff', fontSize: '0.8rem' }}>Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sentRequests.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Sent Requests Pending...</h3>
                {sentRequests.map(r => (
                  <div key={r.id} style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    - Waiting for {r.targetHandle} to accept. <button onClick={() => rejectOrStop(r.id)} style={{ background: 'transparent', color: '#ff5555', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Cancel</button>
                  </div>
                ))}
              </div>
            )}

            {/* Active Rivalries */}
            <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Monthly Summary (vs Rivals)</h2>
            {activeRivals.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>You have no active rivals yet. Add one above!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeRivals.map(r => (
                  <div key={r.id} style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333', position: 'relative' }}>
                    <button 
                      onClick={() => rejectOrStop(r.id)}
                      style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', color: '#ff5555', border: '1px solid #ff5555', padding: '0.2rem 0.5rem', fontSize: '0.7rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Stop Rivalry
                    </button>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ margin: 0, color: myMonthlySolves >= r.rivalSolves ? '#50fa7b' : 'var(--text-main)' }}>You ({cfHandle})</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{myMonthlySolves}</div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>solves this month</span>
                      </div>
                      
                      <div style={{ fontSize: '2rem', color: '#ffb86c', fontWeight: 'bold' }}>VS</div>

                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ margin: 0, color: r.rivalSolves >= myMonthlySolves ? '#50fa7b' : 'var(--text-main)' }}>{r.rivalHandle}</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{r.rivalSolves}</div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>solves this month</span>
                      </div>
                    </div>
                    {myMonthlySolves > r.rivalSolves ? (
                      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#50fa7b', fontWeight: 'bold' }}>You are currently winning this rivalry!</p>
                    ) : myMonthlySolves < r.rivalSolves ? (
                      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#ff5555', fontWeight: 'bold' }}>Your rival is ahead. Time to solve more!</p>
                    ) : (
                      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#8be9fd', fontWeight: 'bold' }}>It's a tie!</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
