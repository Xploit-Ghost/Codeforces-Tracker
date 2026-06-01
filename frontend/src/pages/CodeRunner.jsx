import React, { useState, useEffect } from 'react';
import '../App.css';

export default function CodeRunner() {
  const [leftWidth, setLeftWidth] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  
  const [probNumber, setProbNumber] = useState('');
  const [probLetter, setProbLetter] = useState('');
  const [isFound, setIsFound] = useState(false);
  const [questionName, setQuestionName] = useState('');
  
  const [showPopup, setShowPopup] = useState(false);
  const [replaceTestCases, setReplaceTestCases] = useState(false);
  
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');

  const startDragging = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 15 && newWidth < 85) {
      setLeftWidth(newWidth);
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging]);

  const handleSearch = async () => {
    if (!probNumber || !probLetter) {
      window.alert("Please enter both a contest number and problem letter.");
      return;
    }
    
    // Simulate finding the problem
    setQuestionName(`Problem ${probNumber}${probLetter.toUpperCase()}`);
    setIsFound(true);
  };

  const handleRemove = () => {
    setIsFound(false);
    setProbNumber('');
    setProbLetter('');
    setReplaceTestCases(false);
  };

  const handleSubmit = () => {
    if (!isFound) {
      window.alert("Select a problem first!");
      return;
    }
    window.open(`https://codeforces.com/contest/${probNumber}/submit/${probLetter}`, '_blank');
  };

  return (
    <div style={{ display: 'flex', height: '80vh', width: '100%', overflow: 'hidden', position: 'relative' }}>
      
      {/* LEFT PANE */}
      <div style={{ width: `${leftWidth}%`, backgroundColor: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
        
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {!isFound ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3>Search Problem</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="number" 
                  placeholder="Number (e.g. 1970)" 
                  value={probNumber} 
                  onChange={(e) => setProbNumber(e.target.value)} 
                  style={{ width: '60%' }}
                />
                <input 
                  type="text" 
                  placeholder="Letter (e.g. A)" 
                  value={probLetter} 
                  onChange={(e) => setProbLetter(e.target.value)} 
                  style={{ width: '40%' }}
                />
              </div>
              <button onClick={handleSearch} style={{ width: '100%' }}>Find Problem</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(43, 179, 167, 0.1)', padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(43, 179, 167, 0.3)' }}>
                <h3 style={{ margin: 0, color: '#fff' }}>{questionName}</h3>
                <button onClick={handleRemove} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.2)' }}>Remove</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={() => setShowPopup(true)} style={{ fontSize: '0.8rem', padding: '0.5rem' }}>Show Problem Statement (Popup)</button>
                <button onClick={() => setReplaceTestCases(!replaceTestCases)} style={{ fontSize: '0.8rem', padding: '0.5rem', backgroundColor: replaceTestCases ? 'var(--accent)' : 'rgba(43, 179, 167, 0.1)', color: replaceTestCases ? '#000' : 'var(--accent)' }}>
                  {replaceTestCases ? 'Show Test Cases' : 'Replace Test Cases with Problem Statement'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {isFound && (
            replaceTestCases ? (
              <div style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>
                <h4>Problem Statement</h4>
                <p>Because Codeforces restricts direct embedding (X-Frame-Options), you can view the full problem by clicking the link below, or read the copied statement if our web scraper fetches it.</p>
                <a href={`https://codeforces.com/contest/${probNumber}/problem/${probLetter}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>View on Codeforces</a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4>Test Cases</h4>
                <div style={{ backgroundColor: '#000', padding: '1rem', borderRadius: '4px', border: '1px solid #333' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Input</div>
                  <pre style={{ margin: 0, color: '#fff', fontFamily: 'JetBrains Mono' }}>4{'\n'}1 2 3 4</pre>
                </div>
                <div style={{ backgroundColor: '#000', padding: '1rem', borderRadius: '4px', border: '1px solid #333' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Output</div>
                  <pre style={{ margin: 0, color: '#fff', fontFamily: 'JetBrains Mono' }}>YES</pre>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* DRAG BAR */}
      <div 
        onMouseDown={startDragging}
        style={{ width: '5px', cursor: 'col-resize', backgroundColor: isDragging ? 'var(--accent)' : 'transparent', zIndex: 10 }}
      />

      {/* RIGHT PANE */}
      <div style={{ width: `calc(${100 - leftWidth}% - 5px)`, display: 'flex', flexDirection: 'column', backgroundColor: '#0a0a0a' }}>
        <div style={{ padding: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111', borderBottom: '1px solid #222' }}>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', fontFamily: 'Space Grotesk' }}
          >
            <option value="cpp">C++ (GCC)</option>
            <option value="java">Java</option>
            <option value="python">Python 3</option>
          </select>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Auto-Save Enabled</span>
        </div>
        
        <textarea 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          placeholder="// Write your code here..."
          style={{ flex: 1, backgroundColor: 'transparent', color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', padding: '1rem', border: 'none', resize: 'none', outline: 'none' }}
        />
        
        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#111', borderTop: '1px solid #222' }}>
          <button onClick={handleSubmit} style={{ backgroundColor: 'var(--success)', color: '#fff', borderColor: 'var(--success)' }}>
            Submit to Codeforces
          </button>
        </div>
      </div>

      {/* POPUP FOR PROBLEM STATEMENT */}
      {showPopup && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card text-page" style={{ width: '80%', height: '80%', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
            <h2 style={{ color: 'var(--accent)', marginTop: 0 }}>{questionName}</h2>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', lineHeight: '1.8' }}>
              <p>Problem statement content goes here.</p>
              <p>Since Codeforces does not provide a raw text problem statement API, you would normally see the parsed HTML of the problem statement here.</p>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <p>(Scrollable area test)</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setShowPopup(false)}>Close Popup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
