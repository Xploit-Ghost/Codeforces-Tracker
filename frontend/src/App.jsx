import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Analytics from './pages/Analytics';
import LatestProblems from './pages/LatestProblems';
import Profile from './pages/Profile';
import Contests from './pages/Contests';
import Practice from './pages/Practice';
import Friends from './pages/Friends';
import Duel from './pages/Duel';
import { About, Privacy, Terms } from './pages/Legal';
import Guides from './pages/Guides';
import AdBanner from './components/AdBanner'; 
import RenderLoader from './components/RenderLoader';
import './App.css';

function Navigation() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link to="/practice" className={location.pathname === '/practice' ? 'nav-link active' : 'nav-link'}>Practice Mode</Link>
      <Link to="/contests" className={location.pathname === '/contests' ? 'nav-link active' : 'nav-link'}>Upcoming Contests</Link>
      <Link to="/profile" className={location.pathname === '/profile' ? 'nav-link active' : 'nav-link'}>Solo Profile</Link>
      <Link to="/duel" className={location.pathname === '/duel' ? 'nav-link active' : 'nav-link'}>Speed Duel</Link>
      <Link to="/latest" className={location.pathname === '/latest' ? 'nav-link active' : 'nav-link'}>Latest Problems</Link>
      <Link to="/guides" className={location.pathname === '/guides' ? 'nav-link active' : 'nav-link'}>Guides & Learn</Link>
      <Link to="/friends" className={location.pathname === '/friends' ? 'nav-link active' : 'nav-link'}>Friends</Link>
      <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Versus Analytics</Link>
    </nav>
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
        <Navigation />
        <AdBanner /> 
        
        <div style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/duel" element={<Duel />} />
            <Route path="/latest" element={<LatestProblems />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/guides" element={<Guides />} />
            
            {/* NEW LEGAL ROUTES */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
