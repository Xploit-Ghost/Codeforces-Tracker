import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const CF_TOPICS = [
  "math", "greedy", "dp", "data structures", "brute force", 
  "constructive algorithms", "sortings", "dfs and similar", 
  "binary search", "graphs", "strings", "number theory", 
  "geometry", "combinatorics", "bitmasks", "two pointers", 
  "dsu", "shortest paths", "trees", "probabilities"
];

const RATINGS = Array.from({ length: 28 }, (_, i) => 800 + i * 100);

export default function CodeforcesTopics() {
  const [selectedRating, setSelectedRating] = useState(800);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTopicToggle = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const fetchProblems = async () => {
    if (selectedTopics.length === 0) {
      setErrorMsg('Please select at least one topic.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setProblems([]);
    
    try {
      const tagsParam = selectedTopics.join(',');
      const res = await axios.get(`${BACKEND_URL}/api/problems-filtered?rating=${selectedRating}&tags=${encodeURIComponent(tagsParam)}`);
      
      if (res.data && res.data.length > 0) {
        setProblems(res.data);
      } else {
        setErrorMsg('No problems found for the selected rating and topics.');
      }
    } catch (err) {
      setErrorMsg('Error fetching problems. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card text-page" style={{ maxWidth: '1000px', width: '100%', marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Problems Sorted by Topics</h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3>1. Select Rating</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {RATINGS.map(rating => (
              <button 
                key={rating}
                onClick={() => setSelectedRating(rating)}
                style={{
                  backgroundColor: selectedRating === rating ? 'var(--accent)' : 'rgba(0,0,0,0.3)',
                  color: selectedRating === rating ? '#000' : 'var(--text-main)',
                  borderColor: selectedRating === rating ? 'var(--accent)' : 'rgba(255,255,255,0.1)'
                }}
              >
                {rating}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>2. Select Topics (Multiple allowed)</h3>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {CF_TOPICS.map(topic => (
              <div 
                key={topic}
                onClick={() => handleTopicToggle(topic)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  border: `1px solid ${selectedTopics.includes(topic) ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                  backgroundColor: selectedTopics.includes(topic) ? 'rgba(43, 179, 167, 0.2)' : 'rgba(0,0,0,0.3)',
                  color: selectedTopics.includes(topic) ? 'var(--accent)' : 'var(--text-muted)',
                  fontSize: '0.9rem',
                  fontFamily: 'Space Grotesk',
                  transition: 'all 0.2s'
                }}
              >
                {topic}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={fetchProblems} disabled={loading} style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
            {loading ? 'Finding Problems...' : 'Find Problems'}
          </button>
        </div>

        {errorMsg && <p className="error" style={{ textAlign: 'center', marginTop: '1rem' }}>{errorMsg}</p>}
      </div>

      {problems.length > 0 && (
        <div style={{ width: '100%', maxWidth: '1000px' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent)', fontFamily: 'Space Grotesk' }}>
            Found {problems.length} Problems
          </h2>
          <div className="problem-grid">
            {problems.map((p) => (
              <a 
                key={`${p.contestId}-${p.index}`} 
                href={`https://codeforces.com/contest/${p.contestId}/problem/${p.index}`} 
                target="_blank" 
                rel="noreferrer" 
                className="problem-card unsolved"
              >
                <div className="prob-header">
                  <span className="prob-id">{p.contestId}{p.index}</span>
                </div>
                <h3 className="prob-name">{p.name}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  {p.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="prob-topic">{tag}</span>
                  ))}
                  {p.tags.length > 3 && <span className="prob-topic">+{p.tags.length - 3}</span>}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
