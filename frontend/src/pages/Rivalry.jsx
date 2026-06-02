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
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [myStats, setMyStats] = useState(null);

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
      
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000;

      const fetchStats = async (handle) => {
        try {
          const [statusRes, infoRes] = await Promise.all([
            axios.get(`https://codeforces.com/api/user.status?handle=${handle}`),
            axios.get(`https://codeforces.com/api/user.info?handles=${handle}`)
          ]);
          
          let monthlySolves = 0;
          let totalSolves = 0;
          
          if (statusRes.data.status === 'OK') {
            const solvedSet = new Set();
            const solvedThisMonth = new Set();
            statusRes.data.result.forEach(sub => {
              if (sub.verdict === 'OK') {
                const probId = `${sub.problem.contestId}-${sub.problem.index}`;
                solvedSet.add(probId);
                if (sub.creationTimeSeconds >= firstDayOfMonth) {
                  solvedThisMonth.add(probId);
                }
              }
            });
            totalSolves = solvedSet.size;
            monthlySolves = solvedThisMonth.size;
          }

          const rating = infoRes.data.result[0].rating || 0;
          // Final Score Calculation Formula
          const score = (rating * 2) + (monthlySolves * 50) + totalSolves;

          return { monthlySolves, totalSolves, rating, score };
        } catch (e) {
          return { monthlySolves: 0, totalSolves: 0, rating: 0, score: 0 };
        }
      };

      const myData = await fetchStats(cfHandle);
      setMyStats(myData);

      const rivalsWithStats = await Promise.all(active.map(async (r) => {
        const rivalStats = await fetchStats(r.rivalHandle);
        return { ...r, rivalStats };
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
    if (!endDate) {
      alert("Please select an end date for the rivalry.");
      return;
    }

    if (new Date(endDate) <= new Date()) {
      alert("End date must be in the future.");
      return;
    }

    try {
      const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
      if (res.data.status === 'OK') {
        const realHandle = res.data.result[0].handle;
        
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
          endDate: new Date(endDate).toISOString(),
          createdAt: new Date().toISOString()
        });
        setNewRivalHandle('');
        setEndDate('');
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
          Challenge your friends! Compare stats, calculate a final score, and see who wins before the deadline!
        </p>

        <form onSubmit={sendRequest} className="search-form" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', background: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Rival's CF Handle</label>
            <input 
              type="text" 
              placeholder="e.g., tourist" 
              value={newRivalHandle} 
              onChange={(e) => setNewRivalHandle(e.target.value)} 
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Rivalry End Date & Time</label>
            <input 
              type="datetime-local" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              style={{ width: '100%', padding: '0.8rem', borderRadius: '30px', border: '1px solid #333', background: '#222', color: '#fff' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button type="submit" style={{ height: '45px' }}>Send Request</button>
          </div>
        </form>

        {loading || !myStats ? (
          <p style={{ textAlign: 'center' }}>Loading rivalries and crunching stats...</p>
        ) : (
          <div>
            {/* Notifications */}
            {pendingRequests.length > 0 && (
              <div style={{ marginBottom: '2rem', background: 'rgba(255,184,108,0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid #ffb86c' }}>
                <h3 style={{ color: '#ffb86c', marginBottom: '1rem' }}>Rivalry Notifications ({pendingRequests.length})</h3>
                {pendingRequests.map(r => (
                  <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', background: '#111', padding: '0.8rem', borderRadius: '4px' }}>
                    <div>
                      <span><strong>{r.requesterHandle}</strong> challenged you!</span>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ends on: {new Date(r.endDate).toLocaleString()}</div>
                    </div>
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
                    - Waiting for {r.targetHandle} to accept (Ends: {new Date(r.endDate).toLocaleString()}). <button onClick={() => rejectOrStop(r.id)} style={{ background: 'transparent', color: '#ff5555', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Cancel</button>
                  </div>
                ))}
              </div>
            )}

            {/* Active Rivalries */}
            <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Active Rivalries</h2>
            {activeRivals.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>You have no active rivals yet. Send a request above!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {activeRivals.map(r => {
                  const isEnded = new Date(r.endDate) <= new Date();
                  const iWon = myStats.score > r.rivalStats.score;
                  const tie = myStats.score === r.rivalStats.score;
                  
                  return (
                    <div key={r.id} style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: isEnded ? (iWon ? '2px solid #50fa7b' : '2px solid #ff5555') : '1px solid #333', position: 'relative' }}>
                      <button 
                        onClick={() => rejectOrStop(r.id)}
                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', color: '#ff5555', border: '1px solid #ff5555', padding: '0.2rem 0.5rem', fontSize: '0.7rem', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        {isEnded ? "Dismiss" : "Stop Rivalry"}
                      </button>
                      
                      {isEnded ? (
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '1rem', background: iWon ? 'rgba(80, 250, 123, 0.1)' : 'rgba(255, 85, 85, 0.1)', borderRadius: '8px' }}>
                          <h2 style={{ margin: 0, color: iWon ? '#50fa7b' : '#ff5555' }}>
                            {iWon ? "🏆 YOU WON!" : "💀 YOU LOST!"}
                          </h2>
                          <p style={{ color: 'var(--text-muted)' }}>The rivalry ended on {new Date(r.endDate).toLocaleString()}</p>
                          <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
                            {iWon ? `An email would be sent to ${r.rivalHandle} saying "Better luck next time..."` : `An email would be sent to ${r.rivalHandle} saying "You won!"`}
                          </p>
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px' }}>
                          <strong style={{ color: '#ffb86c' }}>⏳ Ends on: </strong> {new Date(r.endDate).toLocaleString()}
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        {/* MY STATS */}
                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <h3 style={{ margin: '0 0 1rem 0', color: myStats.score > r.rivalStats.score ? '#50fa7b' : 'var(--text-main)' }}>You ({cfHandle})</h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                            <div className="c-stat-small" style={{ width: '120px' }}><span>Rating</span><strong>{myStats.rating}</strong></div>
                            <div className="c-stat-small" style={{ width: '120px' }}><span>Monthly Solves</span><strong>{myStats.monthlySolves}</strong></div>
                            <div className="c-stat-small" style={{ width: '120px' }}><span>Total Solves</span><strong>{myStats.totalSolves}</strong></div>
                          </div>
                          <div style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                            Score: {myStats.score}
                          </div>
                        </div>
                        
                        <div style={{ fontSize: '2rem', color: '#333', fontWeight: 'bold', padding: '0 1rem' }}>VS</div>

                        {/* RIVAL STATS */}
                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <h3 style={{ margin: '0 0 1rem 0', color: r.rivalStats.score > myStats.score ? '#50fa7b' : 'var(--text-main)' }}>{r.rivalHandle}</h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                            <div className="c-stat-small" style={{ width: '120px' }}><span>Rating</span><strong>{r.rivalStats.rating}</strong></div>
                            <div className="c-stat-small" style={{ width: '120px' }}><span>Monthly Solves</span><strong>{r.rivalStats.monthlySolves}</strong></div>
                            <div className="c-stat-small" style={{ width: '120px' }}><span>Total Solves</span><strong>{r.rivalStats.totalSolves}</strong></div>
                          </div>
                          <div style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                            Score: {r.rivalStats.score}
                          </div>
                        </div>
                      </div>

                      {!isEnded && (
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                          {iWon ? (
                            <p style={{ color: '#50fa7b', fontWeight: 'bold' }}>🔥 You are currently winning this rivalry! Keep it up!</p>
                          ) : tie ? (
                            <p style={{ color: '#8be9fd', fontWeight: 'bold' }}>⚖️ It's a dead tie!</p>
                          ) : (
                            <p style={{ color: '#ff5555', fontWeight: 'bold' }}>⚠️ Your rival is ahead. Time to solve more problems!</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
