import React, { useState, useEffect } from 'react';
import '../App.css';

const boilerplates = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    
    // Write your logic here
    
    return 0;
}`,
  python: `import sys

def solve():
    input = sys.stdin.read
    data = input().split()
    # Write your logic here

if __name__ == '__main__':
    solve()`,
  java: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    static class FastReader {
        BufferedReader br;
        StringTokenizer st;

        public FastReader() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }

        String next() {
            while (st == null || !st.hasMoreElements()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return st.nextToken();
        }

        int nextInt() { return Integer.parseInt(next()); }
        long nextLong() { return Long.parseLong(next()); }
        double nextDouble() { return Double.parseDouble(next()); }
        String nextLine() {
            String str = "";
            try {
                str = br.readLine();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return str;
        }
    }

    public static void main(String[] args) {
        FastReader in = new FastReader();
        // Write your logic here
        
    }
}`
};

export default function CodeRunner() {
  const [leftWidth, setLeftWidth] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  
  const [probNumber, setProbNumber] = useState('');
  const [probLetter, setProbLetter] = useState('');
  const [isFound, setIsFound] = useState(false);
  const [questionName, setQuestionName] = useState('');
  
  const [showTags, setShowTags] = useState(false);
  
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(boilerplates.cpp);

  // Automatically update boilerplate when language changes, 
  // only if code is empty or matches an existing boilerplate (so we don't erase user code)
  useEffect(() => {
    const isCodeUnchanged = code === '' || Object.values(boilerplates).includes(code);
    if (isCodeUnchanged) {
      setCode(boilerplates[language]);
    }
  }, [language]);

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
    setQuestionName(`Problem ${probNumber} ${probLetter.toUpperCase()}`);
    setIsFound(true);
  };

  const handleRemove = () => {
    setIsFound(false);
    setProbNumber('');
    setProbLetter('');
    setShowTags(false);
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
      <div style={{ width: \`\${leftWidth}%\`, backgroundColor: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
        
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
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                <a 
                  href={\`https://codeforces.com/contest/\${probNumber}/problem/\${probLetter}\`}
                  target="_blank" 
                  rel="noreferrer"
                  style={{ 
                    flex: 1, 
                    textAlign: 'center', 
                    padding: '0.8rem', 
                    backgroundColor: 'rgba(43, 179, 167, 0.1)', 
                    color: 'var(--accent)', 
                    border: '1px solid rgba(43, 179, 167, 0.5)', 
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontFamily: 'Space Grotesk'
                  }}
                >
                  View Problem Statement on Codeforces
                </a>
              </div>
              <button onClick={() => setShowTags(!showTags)} style={{ fontSize: '0.9rem', padding: '0.5rem' }}>
                {showTags ? 'Hide Tags' : 'Show Tags'}
              </button>
              {showTags && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', padding: '0.5rem' }}>
                  <span className="prob-topic">greedy</span>
                  <span className="prob-topic">math</span>
                  <span className="prob-topic">implementation</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {isFound ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
              <h4 style={{ textAlign: 'center', margin: 0, color: 'var(--text-main)', letterSpacing: '2px' }}>TEST CASES</h4>
              <div style={{ backgroundColor: '#000', padding: '1rem', borderRadius: '4px', border: '1px solid #333', width: '100%' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Input</div>
                <pre style={{ margin: 0, color: '#fff', fontFamily: 'JetBrains Mono' }}>4{'\n'}1 2 3 4</pre>
              </div>
              <div style={{ backgroundColor: '#000', padding: '1rem', borderRadius: '4px', border: '1px solid #333', width: '100%' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Output</div>
                <pre style={{ margin: 0, color: '#fff', fontFamily: 'JetBrains Mono' }}>YES</pre>
              </div>
            </div>
          ) : (
             <div style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Test cases will appear here once a problem is found.</div>
          )}
        </div>
      </div>

      {/* DRAG BAR */}
      <div 
        onMouseDown={startDragging}
        style={{ width: '5px', cursor: 'col-resize', backgroundColor: isDragging ? 'var(--accent)' : 'transparent', zIndex: 10 }}
      />

      {/* RIGHT PANE */}
      <div style={{ width: \`calc(\${100 - leftWidth}% - 5px)\`, display: 'flex', flexDirection: 'column', backgroundColor: '#0a0a0a' }}>
        <div style={{ padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111', borderBottom: '1px solid #222' }}>
          
          <div style={{ width: '200px' }}>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', fontFamily: 'Space Grotesk', width: '100%' }}
            >
              <option value="cpp">C++ (GCC)</option>
              <option value="java">Java</option>
              <option value="python">Python 3</option>
            </select>
          </div>

          <div style={{ flex: 1, textAlign: 'center', fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent)', textShadow: '0 0 10px rgba(43,179,167,0.3)', fontFamily: 'Space Grotesk' }}>
            {isFound ? questionName : ''}
          </div>

          <div style={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            {isFound && (
              <button 
                onClick={handleRemove} 
                style={{ 
                  padding: '0.3rem 0.8rem', 
                  fontSize: '0.8rem', 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                  color: '#ef4444', 
                  border: '1px solid #ef4444',
                  boxShadow: 'none'
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#ef4444'; e.target.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; e.target.style.color = '#ef4444'; }}
              >
                REMOVE
              </button>
            )}
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '1px' }}>AUTO-SAVE ENABLED</span>
          </div>

        </div>
        
        <textarea 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          placeholder="// Write your code here..."
          style={{ flex: 1, backgroundColor: 'transparent', color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', padding: '1rem', border: 'none', resize: 'none', outline: 'none' }}
        />
        
        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#111', borderTop: '1px solid #222' }}>
          <button onClick={handleSubmit} style={{ backgroundColor: 'var(--success)', color: '#fff', borderColor: 'var(--success)' }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#0d9468'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = 'var(--success)'; }}
          >
            Submit to Codeforces
          </button>
        </div>
      </div>
    </div>
  );
}
