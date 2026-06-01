import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function DsaGraph() {
  const navigate = useNavigate();

  const handleNodeClick = (topicId) => {
    navigate(`/dsa/topic/${topicId}`);
  };

  const LeafNode = ({ title, topicId }) => (
    <div 
      className="dsa-node leaf-node"
      onClick={() => handleNodeClick(topicId)}
      style={{
        padding: '1rem',
        backgroundColor: 'rgba(43, 179, 167, 0.1)',
        border: '1px solid var(--accent)',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'var(--accent)',
        transition: 'all 0.3s ease',
        minWidth: '120px'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.color = '#000'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(43, 179, 167, 0.1)'; e.currentTarget.style.color = 'var(--accent)'; }}
    >
      {title}
    </div>
  );

  const InternalNode = ({ title }) => (
    <div 
      className="dsa-node internal-node"
      style={{
        padding: '1rem 2rem',
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '8px',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'var(--text-main)',
        minWidth: '150px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
      }}
    >
      {title}
    </div>
  );

  const Connector = ({ vertical = false, height = '40px' }) => (
    <div style={{
      width: vertical ? '2px' : '100%',
      height: vertical ? height : '2px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      margin: '0 auto'
    }} />
  );

  return (
    <div className="container" style={{ minHeight: '80vh', padding: '2rem 0' }}>
      <h1 style={{ textAlign: 'center', color: 'var(--accent)', marginBottom: '1rem', fontSize: '2.5rem', textShadow: '0 0 20px rgba(43, 179, 167, 0.4)' }}>
        DSA Learning Path
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>
        Based on the standard NeetCode Roadmap. Click any node to explore the topic.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflowX: 'auto', paddingBottom: '4rem', gap: '2rem' }}>
        
        {/* Level 1 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LeafNode title="Arrays & Hashing" topicId="arrays-and-hashing" />
        </div>
        <Connector vertical height="30px" />

        {/* Level 2 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
          <LeafNode title="Two Pointers" topicId="two-pointers" />
          <LeafNode title="Stack" topicId="stack" />
        </div>
        <Connector vertical height="30px" />

        {/* Level 3 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <LeafNode title="Binary Search" topicId="binary-search" />
          <LeafNode title="Sliding Window" topicId="sliding-window" />
          <LeafNode title="Linked List" topicId="linked-list" />
        </div>
        <Connector vertical height="30px" />

        {/* Level 4 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LeafNode title="Trees" topicId="trees" />
        </div>
        <Connector vertical height="30px" />

        {/* Level 5 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <LeafNode title="Tries" topicId="tries" />
          <LeafNode title="Heap / Priority Queue" topicId="heap" />
          <LeafNode title="Backtracking" topicId="backtracking" />
        </div>
        <Connector vertical height="30px" />

        {/* Level 6 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <LeafNode title="Intervals" topicId="intervals" />
          <LeafNode title="Greedy" topicId="greedy" />
          <LeafNode title="Advanced Graphs" topicId="advanced-graphs" />
          <LeafNode title="Graphs" topicId="graphs" />
          <LeafNode title="1-D DP" topicId="1d-dp" />
        </div>
        <Connector vertical height="30px" />

        {/* Level 7 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <LeafNode title="2-D DP" topicId="2d-dp" />
          <LeafNode title="Bit Manipulation" topicId="bit-manipulation" />
        </div>
        <Connector vertical height="30px" />

        {/* Level 8 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LeafNode title="Math & Geometry" topicId="math-and-geometry" />
        </div>

      </div>
    </div>
  );
}
