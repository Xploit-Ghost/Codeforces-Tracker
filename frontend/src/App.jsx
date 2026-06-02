import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Analytics from './pages/Analytics';
import LatestProblems from './pages/LatestProblems';
import Profile from './pages/Profile';
import Contests from './pages/Contests';
import Practice from './pages/Practice';
import Friends from './pages/Friends';
import Rivalry from './pages/Rivalry';
import { About, Privacy, Terms } from './pages/Legal';
import Guides from './pages/Guides';
import CodeforcesWelcome from './pages/CodeforcesWelcome';
import CodeforcesTopics from './pages/CodeforcesTopics';
import DsaGraph from './pages/DsaGraph';
import DsaTopic from './pages/DsaTopic';
import DailyChallenge from './pages/DailyChallenge';
import Upsolve from './pages/Upsolve';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import CodeforcesUserLookup from './pages/CodeforcesUserLookup';
import CodeforcesLeaderboard from './pages/CodeforcesLeaderboard';
import AdBanner from './components/AdBanner'; 
import VerticalAd from './components/VerticalAd';
import RenderLoader from './components/RenderLoader';
import GuestLock from './components/GuestLock';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

import TopWelcome from './pages/TopWelcome';

function TopNavigation() {
  const location = useLocation();
  const isCodeforces = location.pathname.startsWith('/codeforces');
  const isCompare = location.pathname.startsWith('/compare');
  const isWelcome = location.pathname === '/welcome';

  return (
    <div style={{ width: '100%', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '1rem' }}>
      <nav className="navbar" style={{ borderBottom: 'none', marginBottom: '0' }}>
        <Link 
          to="/codeforces/welcome" 
          className={isCodeforces ? 'nav-link active' : 'nav-link'}
          style={{ fontSize: '1.2rem', padding: '0.8rem 2rem' }}
        >
          Codeforces
        </Link>
        <Link 
          to="/" 
          className={isWelcome ? 'nav-link active' : 'nav-link'}
          style={{ fontSize: '1.2rem', padding: '0.8rem 2rem' }}
        >
          Welcome
        </Link>
        <Link 
          to="/compare/analytics" 
          className={isCompare ? 'nav-link active' : 'nav-link'}
          style={{ fontSize: '1.2rem', padding: '0.8rem 2rem' }}
        >
          Compare and Analyse
        </Link>
        <Link 
          to="/dsa" 
          className={location.pathname.startsWith('/dsa') ? 'nav-link active' : 'nav-link'}
          style={{ fontSize: '1.2rem', padding: '0.8rem 2rem' }}
        >
          DSA
        </Link>
        
      </nav>
    </div>
  );
}

function CodeforcesNavigation() {
  const location = useLocation();
  return (
    <nav className="navbar" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
      <Link to="/codeforces/welcome" className={location.pathname === '/codeforces/welcome' ? 'nav-link active' : 'nav-link'}>Welcome</Link>
      <Link to="/codeforces/topics" className={location.pathname === '/codeforces/topics' ? 'nav-link active' : 'nav-link'}>Problems Sorted by Topics</Link>
      <Link to="/codeforces/lookup" className={location.pathname === '/codeforces/lookup' ? 'nav-link active' : 'nav-link'}>Find User</Link>
      <Link to="/codeforces/leaderboard" className={location.pathname === '/codeforces/leaderboard' ? 'nav-link active' : 'nav-link'}>Leaderboard</Link>
      <a href="https://codeforces.com/problemset/problem/random" target="_blank" rel="noreferrer" className="nav-link">Random Problem 🎲</a>
    </nav>
  );
}

function CompareNavigation() {
  const location = useLocation();
  return (
    <nav className="navbar" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
      <Link to="/compare/practice" className={location.pathname === '/compare/practice' ? 'nav-link active' : 'nav-link'}>Practice Mode</Link>
      <Link to="/compare/daily" className={location.pathname === '/compare/daily' ? 'nav-link active' : 'nav-link'}>Daily Challenge</Link>
      <Link to="/compare/upsolve" className={location.pathname === '/compare/upsolve' ? 'nav-link active' : 'nav-link'}>Upsolve</Link>
      <Link to="/compare/contests" className={location.pathname === '/compare/contests' ? 'nav-link active' : 'nav-link'}>Upcoming Contests</Link>
      <Link to="/compare/profile" className={location.pathname === '/compare/profile' ? 'nav-link active' : 'nav-link'}>Solo Profile</Link>
      <Link to="/compare/rivalry" className={location.pathname === '/compare/rivalry' ? 'nav-link active' : 'nav-link'}>Rivalry Mode</Link>
      <Link to="/compare/latest" className={location.pathname === '/compare/latest' ? 'nav-link active' : 'nav-link'}>Latest Problems</Link>
      <Link to="/compare/friends" className={location.pathname === '/compare/friends' ? 'nav-link active' : 'nav-link'}>Friends</Link>
      <Link to="/compare/analytics" className={location.pathname === '/compare/analytics' ? 'nav-link active' : 'nav-link'}>Versus Analytics</Link>
    </nav>
  );
}

function MainLayout() {
  const location = useLocation();
  const isCodeforces = location.pathname.startsWith('/codeforces');
  const isCompare = location.pathname.startsWith('/compare');

  return (
    <>
      <TopNavigation />
      {isCodeforces && <CodeforcesNavigation />}
      {isCompare && <CompareNavigation />}
      <AdBanner /> 
      
      {/* Side Ads */}
      <VerticalAd side="left" />
      <VerticalAd side="right" />
      
      <div style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid #222' }}>
        <UserProfileBadge />
      </div>

      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<TopWelcome />} />
          
          {/* Codeforces Hierarchy */}
          <Route path="/codeforces/welcome" element={<CodeforcesWelcome />} />
          <Route path="/codeforces/topics" element={<GuestLock><CodeforcesTopics /></GuestLock>} />
          <Route path="/codeforces/lookup" element={<CodeforcesUserLookup />} />
          <Route path="/codeforces/leaderboard" element={<CodeforcesLeaderboard />} />
          
          {/* DSA Hierarchy */}
          <Route path="/dsa" element={<GuestLock><DsaGraph /></GuestLock>} />
          <Route path="/dsa/topic/:topicId" element={<GuestLock><DsaTopic /></GuestLock>} />
          
          {/* Compare and Analyse Hierarchy */}
          <Route path="/compare/analytics" element={<Analytics />} />
          <Route path="/compare/profile" element={<GuestLock><Profile /></GuestLock>} />
          <Route path="/compare/friends" element={<GuestLock><Friends /></GuestLock>} />
          <Route path="/compare/rivalry" element={<GuestLock><Rivalry /></GuestLock>} />
          <Route path="/compare/latest" element={<LatestProblems />} />
          <Route path="/compare/contests" element={<Contests />} />
          <Route path="/compare/practice" element={<Practice />} />
          <Route path="/compare/daily" element={<GuestLock><DailyChallenge /></GuestLock>} />
          <Route path="/compare/upsolve" element={<GuestLock><Upsolve /></GuestLock>} />
          
          {/* Shared Routes */}
          <Route path="/guides" element={<Guides />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} CP Tracker. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/guides">Guides</Link>
        <Link to="/about">About Us</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
      </div>
    </footer>
  );
}

import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function UserProfileBadge() {
  const { currentUser, cfHandle, logout } = useAuth();
  
  if (!currentUser) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#111', padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid #333' }}>
      <img src={currentUser.photoURL} alt="User" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>{currentUser.displayName}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>{cfHandle ? `@${cfHandle}` : 'No CF Linked'}</span>
      </div>
      <button onClick={logout} style={{ marginLeft: '1rem', padding: '0.3rem 0.8rem', fontSize: '0.8rem', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444' }}>
        Sign out
      </button>
    </div>
  );
}

function AppContent() {
  const { currentUser, cfHandle, isGuest } = useAuth();

  if (!isGuest && (!currentUser || !cfHandle)) {
    return <SignIn />;
  }

  return (
    <div className="app-wrapper">
      <MainLayout />
      <Footer />
    </div>
  );
}

function App() {
  const [appState, setAppState] = useState('checking'); // 'checking', 'loading', 'ready'

  useEffect(() => {
    let isMounted = true;
    const checkFast = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 800); // 800ms limit
        await axios.get(`${BACKEND_URL}/api/health`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (isMounted) setAppState('ready');
      } catch (err) {
        if (isMounted) setAppState('loading');
      }
    };
    checkFast();
    return () => { isMounted = false; };
  }, []);

  if (appState === 'checking') {
    return <div style={{ height: '100vh', width: '100vw', backgroundColor: '#060b0e' }}></div>;
  }

  if (appState === 'loading') {
    return <RenderLoader onReady={() => setAppState('ready')} />;
  }

  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
