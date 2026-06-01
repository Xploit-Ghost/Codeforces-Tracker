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
      <h1 style={{ textAlign: 'center', color: 'var(--accent)', marginBottom: '3rem', fontSize: '2.5rem', textShadow: '0 0 20px rgba(43, 179, 167, 0.4)' }}>
        DSA Learning Path Interactive Graph
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '4rem', fontSize: '1.2rem' }}>
        Click on the highlighted leaf nodes at the bottom to explore topics in depth.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflowX: 'auto', paddingBottom: '2rem' }}>
        
        {/* Level 1: Root */}
        <InternalNode title="Data Structures & Algorithms" />
        <Connector vertical height="40px" />
        
        {/* Branch 1 */}
        <div style={{ width: '80%', height: '2px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
        
        {/* Level 2: DS and Algo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', position: 'relative' }}>
          
          <div style={{ width: '2px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div style={{ width: '2px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '84%' }}>
          {/* DS Branch */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <InternalNode title="Data Structures" />
            <Connector vertical height="40px" />
            
            <div style={{ width: '80%', height: '2px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
              <div style={{ width: '2px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <div style={{ width: '2px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
              
              {/* Linear */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <InternalNode title="Linear" />
                <Connector vertical height="30px" />
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '300px' }}>
                  <LeafNode title="Arrays" topicId="arrays" />
                  <LeafNode title="Linked Lists" topicId="linked-lists" />
                  <LeafNode title="Stacks" topicId="stacks" />
                  <LeafNode title="Queues" topicId="queues" />
                </div>
              </div>

              {/* Non-Linear */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <InternalNode title="Non-Linear" />
                <Connector vertical height="30px" />
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '250px' }}>
                  <LeafNode title="Trees" topicId="trees" />
                  <LeafNode title="Graphs" topicId="graphs" />
                  <LeafNode title="Hashing" topicId="hashing" />
                </div>
              </div>

            </div>

          </div>

          {/* Algorithms Branch */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <InternalNode title="Algorithms" />
            <Connector vertical height="40px" />
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '400px', marginTop: '20px' }}>
              <LeafNode title="Sorting" topicId="sorting" />
              <LeafNode title="Searching" topicId="searching" />
              <LeafNode title="Dynamic Programming" topicId="dynamic-programming" />
              <LeafNode title="Greedy" topicId="greedy" />
              <LeafNode title="Backtracking" topicId="backtracking" />
              <LeafNode title="Two Pointers" topicId="two-pointers" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
