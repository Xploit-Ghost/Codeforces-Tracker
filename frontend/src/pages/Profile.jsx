import { useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import '../App.css';

const PIE_COLORS = ['#bb86fc', '#03dac6', '#cf6679', '#ffb86c', '#8be9fd', '#ff79c6', '#f1fa8c', '#50fa7b'];
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Profile() {
  const [handle, setHandle] = useState(''); 
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfile = async (e) => {
    e.preventDefault();
    if (!handle) return;
    
    setLoading(true);
    setError('');
    setProfileData(null);

    try {
      const response = await axios.get(`${BACKEND_URL}/api/profile/${handle}`);
      setProfileData(response.data);
    } catch (err) {
      setError('Failed to fetch profile. Please check the handle and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Solo Profile</h1>
      </header>

      <form onSubmit={fetchProfile} className="search-form">
        <input 
          type="text" 
          placeholder="Enter Codeforces Handle" 
          value={handle} 
          onChange={(e) => setHandle(e.target.value)} 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {profileData && (
        <div className="dashboard">
          
          {/* Main Stat Card */}
          <div className="card stat-card">
            <h2>{profileData.handle}</h2>
            <div className="big-stat" style={{ color: 'var(--accent)' }}>
              {profileData.rating || 'Unrated'}
            </div>
            <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>
              {profileData.rank || 'Unknown Rank'}
            </p>
            <div className="contest-stats-row" style={{ marginTop: '1.5rem' }}>
              <div className="c-stat">
                <span>Max Rating</span>
                <strong>{profileData.maxRating || 'N/A'}</strong>
              </div>
              <div className="c-stat">
                <span>Max Rank</span>
                <strong style={{textTransform: 'capitalize'}}>{profileData.maxRank || 'N/A'}</strong>
              </div>
              <div className="c-stat">
                <span>Contribution</span>
                <strong style={{ color: profileData.contribution > 0 ? '#50fa7b' : 'inherit' }}>
                  {profileData.contribution || 0}
                </strong>
              </div>
              <div className="c-stat">
                <span>Total Solved</span>
                <strong>{profileData.totalSolved || 0}</strong>
              </div>
            </div>
          </div>

          {/* Charts Row 1: Ratings and Verdicts */}
          <div className="cards-wrapper">
            <div className="card">
              <h2>Solved by Rating</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={profileData.ratingPie} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {profileData.ratingPie?.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="card">
              <h2>Submission Verdicts</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={profileData.verdictsPie} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {profileData.verdictsPie?.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2: Radar Topic Strength */}
          <div className="card" style={{ width: '100%' }}>
            <h2>Strongest Topics</h2>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={profileData.tagsRadar}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a0a0a0', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                <Radar name={profileData.handle} dataKey="count" stroke="#bb86fc" fill="#bb86fc" fillOpacity={0.6} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Row 3: Feed and History */}
          <div className="cards-wrapper" style={{ marginTop: '1rem' }}>
            <div className="card">
              <h2>Recent Activity</h2>
              <div className="feed-container">
                {profileData.recentSubs?.map((sub) => (
                  <div key={sub.id} className="feed-item">
                    <div className="feed-info">
                      <a href={`https://codeforces.com/contest/${sub.contestId}/problem/${sub.index}`} target="_blank" rel="noreferrer" className="feed-prob-name">
                        {sub.contestId}{sub.index} - {sub.name}
                      </a>
                      <span className="feed-time">{sub.time} • {sub.language}</span>
                    </div>
                    <span className={`verdict-badge ${sub.verdict === 'OK' ? 'verdict-ok' : 'verdict-bad'}`}>
                      {sub.verdict === 'OK' ? 'Accepted' : sub.verdict.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
                {(!profileData.recentSubs || profileData.recentSubs.length === 0) && (
                  <p style={{ color: 'var(--text-muted)' }}>No recent activity found.</p>
                )}
              </div>
            </div>
            
            <div className="card">
              <h2>Past 10 Contests</h2>
              <div className="contest-list">
                {profileData.recentContests?.map(c => (
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
                    </div>
                  </div>
                ))}
                {(!profileData.recentContests || profileData.recentContests.length === 0) && (
                  <p style={{ color: 'var(--text-muted)' }}>No rated contest history found.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
