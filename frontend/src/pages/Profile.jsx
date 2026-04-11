import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const COLORS = ['#bb86fc', '#03dac6', '#cf6679', '#ffb86c', '#8be9fd', '#f1fa8c'];

function Profile() {
  const location = useLocation();
  const initialHandle = location.state?.handle || 'XploitGhost';
  
  const [handle, setHandle] = useState(initialHandle);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async (searchHandle) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/profile/${searchHandle}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (initialHandle) {
      fetchProfile(initialHandle);
    }
  }, [initialHandle]);

  return (
    <div className="container">
      <header><h1>Solo Profile Analytics</h1></header>
      
      <div className="search-form">
        <input 
          value={handle} 
          onChange={(e) => setHandle(e.target.value)} 
          placeholder="Enter Codeforces Handle"
        />
        <button onClick={() => fetchProfile(handle)} disabled={loading}>
          {loading ? 'Scanning...' : 'Analyze'}
        </button>
      </div>

      {data && (
        <div className="dashboard">
          
          <div className="card stat-card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Problems Solved</h3>
            <div className="big-stat" style={{ color: 'var(--accent)', margin: '0' }}>{data.totalSolved}</div>
          </div>

          <div className="cards-wrapper">
            <div className="card">
              <h3 style={{ textAlign: 'center' }}>Rating Distribution</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={data.ratingPie} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {data.ratingPie.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3 style={{ textAlign: 'center' }}>Strongest Topics</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <RadarChart cx="50%" cy="50%" outerRadius={90} data={data.tagsRadar}>
                    <PolarGrid stroke="#444" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#a0a0a0', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} />
                    <Radar name="Solved" dataKey="count" stroke="#bb86fc" fill="#bb86fc" fillOpacity={0.5} />
                    <RechartsTooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: '2rem' }}>
            <h3>Past 10 Contests</h3>
            <div className="contest-list">
              {data.recentContests.map(c => (
                <div key={c.id} className="contest-row">
                  <div className="contest-name-container">
                    <h3 className="contest-title">{c.name}</h3>
                    <span className="contest-date" style={{ color: 'var(--text-muted)' }}>{c.date}</span>
                  </div>
                  <div className="contest-metrics">
                    <div className="c-stat-small">
                      <span>Change</span>
                      <strong style={{ color: c.ratingChange >= 0 ? '#50fa7b' : '#cf6679' }}>
                        {c.ratingChange > 0 ? '+' : ''}{c.ratingChange}
                      </strong>
                    </div>
                    <div className="c-stat-small">
                      <span>New Rating</span>
                      <strong>{c.newRating}</strong>
                    </div>
                    <div className="c-stat-small">
                      <span>Solved</span>
                      <strong>{c.solvedCount}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginTop: '2rem' }}>
            <h3>Recent Submissions</h3>
            <div className="feed-container" style={{ maxHeight: 'none' }}>
              {data.recentSubs.map((sub, idx) => (
                <div key={idx} className="feed-item">
                  <div className="feed-info">
                    <a 
                      href={`https://codeforces.com/problemset/problem/${sub.contestId}/${sub.index}`}
                      target="_blank" rel="noopener noreferrer"
                      className="feed-prob-name"
                    >
                      {sub.name}
                    </a>
                    <span className="feed-time">{sub.time} • {sub.language}</span>
                  </div>
                  <span className={`verdict-badge ${sub.verdict === 'OK' ? 'verdict-ok' : 'verdict-bad'}`}>
                    {sub.verdict === 'OK' ? 'Accepted' : sub.verdict.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default Profile;