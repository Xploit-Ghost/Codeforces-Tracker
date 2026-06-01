import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { dsaTopics as topicData } from '../data/dsaTopics';

export default function DsaTopic() {
  const { topicId } = useParams();
  const data = topicData[topicId];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data) {
    return (
      <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Topic "{topicId}" content is currently being written!</h2>
        <Link to="/dsa" style={{ color: 'var(--accent)', marginTop: '1rem' }}>Return to DSA Graph</Link>
      </div>
    );
  }

  return (
    <div className="container text-page" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <Link to="/dsa" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to DSA Graph
      </Link>
      
      <h1 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        {data.title}
      </h1>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>1. Introduction</h2>
        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
          {data.introduction}
        </p>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>2. Use Cases & Identification</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {data.useCases.map((uc, i) => (
            <div key={i} style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
              <strong style={{ color: 'var(--accent)', fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem' }}>Keyword: {uc.keyword}</strong>
              <span style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{uc.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '2rem' }}>3. Complexity Analysis: Brute Force vs Optimal</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          
          <div style={{ flex: 1, minWidth: '300px', backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h3 style={{ color: '#ef4444', marginTop: 0, fontSize: '1.5rem' }}>Brute Force</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem', fontFamily: 'JetBrains Mono' }}>
              {data.complexity.bruteForce.time}
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              {data.complexity.bruteForce.desc}
            </p>
          </div>

          <div style={{ flex: 1, minWidth: '300px', backgroundColor: 'rgba(43, 179, 167, 0.05)', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(43, 179, 167, 0.2)' }}>
            <h3 style={{ color: 'var(--accent)', marginTop: 0, fontSize: '1.5rem' }}>Optimal Approach</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem', fontFamily: 'JetBrains Mono' }}>
              {data.complexity.optimal.time}
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              {data.complexity.optimal.desc}
            </p>
          </div>

        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>4. Visual Approach</h2>
        <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' }}>
          <img src={data.image} alt={`${data.title} Visualized`} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>5. Core Logic & Code Snippet</h2>
        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '1rem' }}>
          Understanding the core structural implementation is vital. Below is a standard, highly-commented boilerplate for this approach.
        </p>
        <div style={{ position: 'relative', backgroundColor: '#0a0a0a', borderRadius: '8px', border: '1px solid #333', overflow: 'hidden' }}>
          <button 
            onClick={handleCopy}
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              padding: '0.4rem 0.8rem', 
              backgroundColor: copied ? 'var(--success)' : '#222', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontFamily: 'Space Grotesk',
              transition: 'background-color 0.3s'
            }}
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <pre style={{ margin: 0, padding: '1.5rem', color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', overflowX: 'auto' }}>
            <code>{data.codeSnippet}</code>
          </pre>
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>6. Variations & Strategy</h2>
        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-main)', backgroundColor: 'rgba(43, 179, 167, 0.05)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
          {data.variations}
        </p>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>7. Practice Problems</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Start from the basic direct implementations and work your way up. We have curated 10 essential questions for this topic.
        </p>
        
        <h3 style={{ color: '#4ade80' }}>Basic (Direct Implementation) - 5 Questions</h3>
        <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '2rem' }}>
          {data.problems.basic.map((p, i) => (
            <li key={i} style={{ padding: '0.8rem', backgroundColor: '#111', marginBottom: '0.5rem', borderRadius: '4px' }}>
              <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.1rem' }}>
                {i + 1}. {p.name}
              </a>
            </li>
          ))}
        </ul>

        <h3 style={{ color: '#facc15' }}>Medium (Variations & State Finding) - 3 Questions</h3>
        <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '2rem' }}>
          {data.problems.medium.map((p, i) => (
            <li key={i} style={{ padding: '0.8rem', backgroundColor: '#111', marginBottom: '0.5rem', borderRadius: '4px' }}>
              <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.1rem' }}>
                {i + 1}. {p.name}
              </a>
            </li>
          ))}
        </ul>

        <h3 style={{ color: '#f87171' }}>Hard (Multi-Dimensional & Optimizations) - 2 Questions</h3>
        <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '2rem' }}>
          {data.problems.hard.map((p, i) => (
            <li key={i} style={{ padding: '0.8rem', backgroundColor: '#111', marginBottom: '0.5rem', borderRadius: '4px' }}>
              <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.1rem' }}>
                {i + 1}. {p.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
