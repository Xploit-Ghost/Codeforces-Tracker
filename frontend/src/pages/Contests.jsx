import { useState, useEffect } from 'react';
import axios from 'axios';

function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timezone, setTimezone] = useState('Asia/Kolkata');

  useEffect(() => {
    axios.get('http://localhost:5000/api/contests')
      .then(res => {
        setContests(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const formatTime = (unixSeconds) => {
    const date = new Date(unixSeconds * 1000);
    return date.toLocaleString('en-US', {
      timeZone: timezone,
      weekday: 'short', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="container">
      <header>
        <h1>Upcoming Contests</h1>
      </header>

      <div className="search-form">
        <span style={{ fontWeight: 'bold' }}>Select Timezone: </span>
        <select 
          value={timezone} 
          onChange={(e) => setTimezone(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: 'var(--card-bg)', color: 'white', border: '1px solid #333' }}
        >
          <option value="Asia/Kolkata">India Standard Time (IST)</option>
          <option value="UTC">Universal Time (UTC)</option>
          <option value="America/New_York">Eastern Time (EST/EDT)</option>
          <option value="Europe/London">London (GMT/BST)</option>
        </select>
      </div>

      {loading ? <p>Loading Schedule...</p> : (
        <div className="contest-list">
          {contests.map(c => (
            <div key={c.id} className="contest-row">
              <div className="contest-name-container">
                <h3 className="contest-title">{c.name}</h3>
                <span className="contest-date" style={{ color: 'var(--accent)' }}>
                  {formatTime(c.startTimeSeconds)}
                </span>
              </div>
              <div className="contest-metrics">
                <div className="c-stat-small">
                  <span>Duration</span>
                  <strong>{c.durationSeconds / 3600} hrs</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Contests;