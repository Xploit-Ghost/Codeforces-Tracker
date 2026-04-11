import { useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import '../App.css';

const PIE_COLORS = ['#bb86fc', '#03dac6', '#cf6679', '#ffb86c', '#8be9fd', '#ff79c6', '#f1fa8c', '#50fa7b'];
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Analytics() {
  const [handle1, setHandle1] = useState('');
  const [handle2, setHandle2] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCompare = async (e) => {
    e.preventDefault();
    if (!handle1 || !handle2) return;
    setLoading(true);
    setErrorMsg('');
    setData(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/compare/${handle1}/${handle2}`);
      setData(response.data);
    } catch (err) {
      setErrorMsg('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header><h1>CP Tracker: Analytics</h1></header>
      <form onSubmit={handleCompare} className="search-form">
        <input type="text" placeholder="Handle 1" value={handle1} onChange={(e) => setHandle1(e.target.value)} />
        <span className="vs">VS</span>
        <input type="text" placeholder="Handle 2" value={handle2} onChange={(e) => setHandle2(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? 'Analyzing...' : 'Compare'}</button>
      </form>

      {errorMsg && <p className="error">{errorMsg}</p>}

      {data && (
        <div className="dashboard">
          
          <div className="card">
            <h2>Total Problems Solved</h2>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart layout="vertical" data={[{ name: data.user1.handle, solved: data.user1.totalSolved, fill: '#bb86fc' }, { name: data.user2.handle, solved: data.user2.totalSolved, fill: '#03dac6' }]}>
                <XAxis type="number" stroke="#a0a0a0" />
                <YAxis dataKey="name" type="category" stroke="#fff" width={100} />
                <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }}/>
                <Bar dataKey="solved" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2>Contest Rating Timeline</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.ratingHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#a0a0a0" />
                <YAxis stroke="#a0a0a0" domain={['auto', 'auto']} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
                <Legend />
                <Line type="monotone" dataKey={data.user1.handle} stroke="#bb86fc" strokeWidth={3} connectNulls={true} dot={{ r: 4, fill: "#bb86fc" }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey={data.user2.handle} stroke="#03dac6" strokeWidth={3} connectNulls={true} dot={{ r: 4, fill: "#03dac6" }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="cards-wrapper">
            <div className="card">
              <h2>{data.user1.handle}'s Solved by Rating</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={data.user1.ratingPie} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {data.user1.ratingPie.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h2>{data.user2.handle}'s Solved by Rating</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={data.user2.ratingPie} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {data.user2.ratingPie.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="cards-wrapper">
            <div className="card">
              <h2>{data.user1.handle}'s Strongest Topics</h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.user1.tagsRadar}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#a0a0a0', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                  <Radar name={data.user1.handle} dataKey="count" stroke="#bb86fc" fill="#bb86fc" fillOpacity={0.6} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h2>{data.user2.handle}'s Strongest Topics</h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.user2.tagsRadar}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#a0a0a0', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                  <Radar name={data.user2.handle} dataKey="count" stroke="#03dac6" fill="#03dac6" fillOpacity={0.6} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="cards-wrapper">
            <div className="card">
              <h2>{data.user1.handle}'s Recent Activity</h2>
              <div className="feed-container">
                {data.user1.recentSubs.map((sub) => (
                  <div key={sub.id} className="feed-item">
                    <div className="feed-info">
                      <a href={`https://codeforces.com/contest/${sub.contestId}/problem/${sub.index}`} target="_blank" rel="noreferrer" className="feed-prob-name">{sub.contestId}{sub.index} - {sub.name}</a>
                      <span className="feed-time">{sub.time} • {sub.language}</span>
                    </div>
                    <span className={`verdict-badge ${sub.verdict === 'OK' ? 'verdict-ok' : 'verdict-bad'}`}>{sub.verdict === 'OK' ? 'Accepted' : sub.verdict.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h2>{data.user2.handle}'s Recent Activity</h2>
              <div className="feed-container">
                {data.user2.recentSubs.map((sub) => (
                  <div key={sub.id} className="feed-item">
                    <div className="feed-info">
                      <a href={`https://codeforces.com/contest/${sub.contestId}/problem/${sub.index}`} target="_blank" rel="noreferrer" className="feed-prob-name">{sub.contestId}{sub.index} - {sub.name}</a>
                      <span className="feed-time">{sub.time} • {sub.language}</span>
                    </div>
                    <span className={`verdict-badge ${sub.verdict === 'OK' ? 'verdict-ok' : 'verdict-bad'}`}>{sub.verdict === 'OK' ? 'Accepted' : sub.verdict.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="cards-wrapper" style={{ marginTop: '2rem' }}>
            <div className="card">
              <h2>{data.user1.handle}'s Past 10 Contests</h2>
              <div className="contest-list">
                {data.user1.recentContests?.map(c => (
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
              </div>
            </div>
            
            <div className="card">
              <h2>{data.user2.handle}'s Past 10 Contests</h2>
              <div className="contest-list">
                {data.user2.recentContests?.map(c => (
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
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}