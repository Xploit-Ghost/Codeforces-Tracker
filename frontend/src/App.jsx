import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Analytics from './pages/Analytics';
import LatestProblems from './pages/LatestProblems';
import Profile from './pages/Profile';
import Contests from './pages/Contests';
import Practice from './pages/Practice';
import Friends from './pages/Friends';
import Duel from './pages/Duel';
import { About, Privacy, Terms } from './pages/Legal';
import Guides from './pages/Guides';
import CodeforcesWelcome from './pages/CodeforcesWelcome';
import CodeforcesTopics from './pages/CodeforcesTopics';
import AdBanner from './components/AdBanner'; 
import RenderLoader from './components/RenderLoader';
import './App.css';

function TopNavigation() {
  const location = useLocation();
  const isCodeforces = location.pathname.startsWith('/codeforces');
  const isCompare = location.pathname.startsWith('/compare');

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
          to="/compare/analytics" 
          className={isCompare ? 'nav-link active' : 'nav-link'}
          style={{ fontSize: '1.2rem', padding: '0.8rem 2rem' }}
        >
          Compare and Analyse
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
    </nav>
  );
}

function CompareNavigation() {
  const location = useLocation();
  return (
    <nav className="navbar" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
      <Link to="/compare/practice" className={location.pathname === '/compare/practice' ? 'nav-link active' : 'nav-link'}>Practice Mode</Link>
      <Link to="/compare/contests" className={location.pathname === '/compare/contests' ? 'nav-link active' : 'nav-link'}>Upcoming Contests</Link>
      <Link to="/compare/profile" className={location.pathname === '/compare/profile' ? 'nav-link active' : 'nav-link'}>Solo Profile</Link>
      <Link to="/compare/duel" className={location.pathname === '/compare/duel' ? 'nav-link active' : 'nav-link'}>Speed Duel</Link>
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
      
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/codeforces/welcome" replace />} />
          
          {/* Codeforces Hierarchy */}
          <Route path="/codeforces/welcome" element={<CodeforcesWelcome />} />
          <Route path="/codeforces/topics" element={<CodeforcesTopics />} />
          
          {/* Compare and Analyse Hierarchy */}
          <Route path="/compare/analytics" element={<Analytics />} />
          <Route path="/compare/profile" element={<Profile />} />
          <Route path="/compare/friends" element={<Friends />} />
          <Route path="/compare/duel" element={<Duel />} />
          <Route path="/compare/latest" element={<LatestProblems />} />
          <Route path="/compare/contests" element={<Contests />} />
          <Route path="/compare/practice" element={<Practice />} />
          
          {/* Shared Routes */}
          <Route path="/guides" element={<Guides />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
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

function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <RenderLoader onReady={() => setIsReady(true)} />;
  }

  return (
    <Router>
      <div className="app-wrapper">
        <MainLayout />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
