import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RenderLoader.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const logs = [
  "INCOMING HTTP REQUEST DETECTED ...",
  "SERVICE WAKING UP ...",
  "ALLOCATING COMPUTE RESOURCES ...",
  "PREPARING INSTANCE FOR INITIALIZATION ...",
  "STARTING THE INSTANCE ...",
  "ENVIRONMENT VARIABLES INJECTED ...",
  "FINALIZING STARTUP ...",
  "OPTIMIZING DEPLOYMENT ...",
  "APPLICATION READY ..."
];

export default function RenderLoader({ onReady }) {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [backendReady, setBackendReady] = useState(false);
  const [startTime] = useState(Date.now());
  const [displayedLogs, setDisplayedLogs] = useState([]);

  useEffect(() => {
    // Start pinging backend
    const checkBackend = async () => {
      try {
        await axios.get(`${BACKEND_URL}/api/health`);
        setBackendReady(true);
      } catch (err) {
        setTimeout(checkBackend, 2000);
      }
    };
    checkBackend();
  }, []);

  useEffect(() => {
    if (currentLogIndex < logs.length) {
      const isLastLog = currentLogIndex === logs.length - 1;
      
      const timeout = setTimeout(() => {
        const timeOffset = Math.floor((Date.now() - startTime) / 1000);
        const date = new Date();
        date.setSeconds(date.getSeconds() + timeOffset);
        
        const pad = (num) => String(num).padStart(2, '0');
        const timestamp = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        
        setDisplayedLogs(prev => [...prev, { text: logs[currentLogIndex], time: timestamp }]);
        setCurrentLogIndex(prev => prev + 1);
      }, isLastLog ? 500 : 1500); // Wait longer between steps, except the last one
      
      return () => clearTimeout(timeout);
    } else {
      // All logs shown, automatically proceed. 
      // Vercel serverless doesn't need long wakeups like Render
      setTimeout(onReady, 1000);
    }
  }, [currentLogIndex, onReady, startTime]);

  return (
    <div className="render-loader-container">
      <div className="render-loader-header">
        <span className="render-logo">🚀 Render</span>
      </div>
      
      <div className="render-loader-terminal">
        {displayedLogs.map((log, index) => (
          <React.Fragment key={index}>
            <div className="log-line">
              <span className="log-time">{log.time}</span> {log.text}
            </div>
            
            {/* Show 3D text banner after the second log */}
            {index === 1 && (
              <div className="welcome-banner">
                <div className="title-3d">Welcome to CP-Tracker</div>
                <div className="author-text">Made by ANVESH ANAND POL</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="render-loader-footer">
        <div className="start-building">START BUILDING ON RENDER TODAY &rarr;</div>
        <div className="application-loading">
          <span className="spinner"></span> APPLICATION LOADING
        </div>
      </div>
    </div>
  );
}
