import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Friends() {
  const [handleInput, setHandleInput] = useState('');
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load handles from LocalStorage immediately on mount
  useEffect(() => {
    const savedHandles = JSON.parse(localStorage.getItem('cf_friends') || '[]');
    if (savedHandles.length > 0) {
      fetchFriendsData(savedHandles);
    }
  }, []);

  const fetchFriendsData = async (handles) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/leaderboard?handles=${handles.join(';')}`);
      setFriends(res.data);
      // Save the raw handles to local storage so they persist after refresh
      localStorage.setItem('cf_friends', JSON.stringify(handles));
    } catch (err) {
      console.error("Failed to fetch friends data from backend.");
    } finally {
      setLoading(false);
    }
  };

  const addFriend = (e) => {
    e.preventDefault();
    if (!handleInput) return;

    const currentHandles = JSON.parse(localStorage.getItem('cf_friends') || '[]');
    if (!currentHandles.includes(handleInput)) {
      const newHandles = [...currentHandles, handleInput];
      fetchFriendsData(newHandles);
    }
    setHandleInput('');
  };

  const clearAllFriends = () => {
    if (window.confirm("Are you sure you want to clear your entire friends list?")) {
      setFriends([]);
      localStorage.removeItem('cf_friends');
    }
  };

  // Function to jump to Solo Profile with this handle
  const openInSoloProfile = (handle) => {
    // We navigate to /profile. To make it auto-load, you can pass state
    navigate('/profile', { state: { autoHandle: handle } });
  };

  return (
    <div className="container">
      <header><h1>Friends Leaderboard</h1></header>

      <form onSubmit={addFriend} className="search-form">
        <input 
          type="text" 
          placeholder="Friend's Handle" 
          value={handleInput} 
          onChange={(e) => setHandleInput(e.target.value)} 
        />
        <button type="submit" disabled={loading}>Add Friend</button>
        {friends.length > 0 && (
          <button type="button" onClick={clearAllFriends} style={{background: 'var(--error)', color: 'white'}}>
            Clear All
          </button>
        )}
      </form>

      {loading && <p style={{textAlign: 'center'}}>Updating leaderboard...</p>}

      <div className="card">
        <div className="contest-list">
          {friends.sort((a,b) => b.rating - a.rating).map((f, i) => (
            <div key={i} className="contest-row">
              <div className="contest-name-container">
                <h3 className="contest-title">{f.handle}</h3>
                <span className="contest-date">{f.rank}</span>
              </div>
              <div className="contest-metrics" style={{ flex: 1 }}>
                <div className="c-stat-small">
                  <span>Rating</span>
                  <strong style={{color: 'var(--accent)'}}>{f.rating}</strong>
                </div>
              </div>
              <button 
                onClick={() => openInSoloProfile(f.handle)}
                style={{ marginLeft: '1rem', padding: '0.5rem', fontSize: '0.8rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)' }}
              >
                View Profile
              </button>
            </div>
          ))}
          {friends.length === 0 && !loading && <p style={{textAlign: 'center', color: 'var(--text-muted)'}}>No friends added yet.</p>}
        </div>
      </div>
    </div>
  );
}
