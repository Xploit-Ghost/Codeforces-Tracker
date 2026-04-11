import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Friends() {
  const [handleInput, setHandleInput] = useState('');
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedFriends = localStorage.getItem('cf_friends');
    if (savedFriends) fetchFriendsData(JSON.parse(savedFriends));
  }, []);

  const fetchFriendsData = async (handles) => {
    if (handles.length === 0) {
      setFriends([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/leaderboard?handles=${handles.join(';')}`);
      setFriends(res.data);
      localStorage.setItem('cf_friends', JSON.stringify(handles));
    } catch (err) {
      console.error("Leaderboard error");
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
    setFriends([]);
    localStorage.removeItem('cf_friends');
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
        <button type="submit">Add Friend</button>
        <button type="button" onClick={clearAllFriends} style={{background: 'var(--error)'}}>Clear All</button>
      </form>

      <div className="card">
        <div className="contest-list">
          {friends.sort((a,b) => b.rating - a.rating).map((f, i) => (
            <div key={i} className="contest-row">
              <div className="contest-name-container">
                <h3 className="contest-title">{f.handle}</h3>
                <span className="contest-date">{f.rank}</span>
              </div>
              <div className="contest-metrics">
                <div className="c-stat-small">
                  <span>Rating</span>
                  <strong style={{color: 'var(--accent)'}}>{f.rating}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
