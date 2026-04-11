import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Friends() {
  const [savedHandles, setSavedHandles] = useState(() => {
    const saved = localStorage.getItem('friends_list');
    return saved ? JSON.parse(saved) : [];
  });
  const [newHandle, setNewHandle] = useState('');
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('friends_list', JSON.stringify(savedHandles));
    if (savedHandles.length > 0) {
      fetchLeaderboard(savedHandles);
    } else {
      setFriends([]);
    }
  }, [savedHandles]);

  const fetchLeaderboard = async (handlesArray) => {
    if (handlesArray.length === 0) return;
    setLoading(true);
    try {
      const formattedHandles = handlesArray.join(';');
      const res = await axios.get(`http://localhost:5000/api/leaderboard?handles=${formattedHandles}`);
      const sorted = res.data.sort((a, b) => b.rating - a.rating);
      setFriends(sorted);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleAddFriend = () => {
    if (newHandle.trim() && !savedHandles.includes(newHandle.trim())) {
      setSavedHandles(prev => [...prev, newHandle.trim()]);
      setNewHandle('');
    }
  };

  const handleRemoveFriend = (handleToRemove) => {
    setSavedHandles(prev => prev.filter(h => h !== handleToRemove));
  };

  return (
    <div className="container">
      <header><h1>Friends Leaderboard</h1></header>
      
      <div className="search-form">
        <input 
          value={newHandle} 
          onChange={(e) => setNewHandle(e.target.value)} 
          placeholder="Enter a handle to add..."
          style={{ width: '300px' }}
          onKeyDown={(e) => e.key === 'Enter' && handleAddFriend()}
        />
        <button onClick={handleAddFriend} disabled={loading}>
          {loading ? 'Updating...' : 'Add Friend'}
        </button>
      </div>

      {friends.length > 0 && (
        <div className="dashboard">
          <div className="card" style={{ padding: '0' }}>
            {friends.map((friend, index) => (
              <div key={friend.handle} style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1.5rem', borderBottom: index !== friends.length - 1 ? '1px solid #333' : 'none'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ margin: '0 0 0.5rem 0', color: friend.rating >= 2400 ? '#cf6679' : 'var(--text-main)' }}>
                    #{index + 1} {friend.handle}
                  </h2>
                  <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                    {friend.rank} (Max: {friend.maxRating})
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rating:</span>
                    <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', lineHeight: '1' }}>
                      {friend.rating}
                    </span>
                  </div>
                  <button 
                    style={{ backgroundColor: '#50fa7b', color: '#000' }}
                    onClick={() => navigate('/profile', { state: { handle: friend.handle } })}
                  >
                    View Analytics
                  </button>
                  <button 
                    style={{ backgroundColor: 'transparent', color: 'var(--error)', border: '1px solid var(--error)', padding: '0.5rem' }}
                    onClick={() => handleRemoveFriend(friend.handle)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Friends;