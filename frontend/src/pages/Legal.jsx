import '../App.css';

export function About() {
  return (
    <div className="container">
      <div className="card text-page">
        <h1>About CP Tracker</h1>
        <p>Welcome to the ultimate Codeforces Analytics and Tracking platform. Competitive programming is a mind sport that requires intense dedication, consistent practice, and deep analytical tracking to master algorithms and data structures.</p>
        <p>Our tool is designed for developers, students, and competitive programmers to analyze their Codeforces profiles, track their daily progress, and benchmark their problem-solving skills against peers.</p>
        <h2>Features and Tracking</h2>
        <p>We utilize the official Codeforces API to fetch real-time public data. Users can view their strongest topics through radar charts, analyze submission verdicts, and track rating changes over their last 10 contests. The Speed Duel feature allows two programmers to race against the clock on unseen problems.</p>
        <p>Whether you are trying to break out of the 'Newbie' rank or pushing for 'Candidate Master', analyzing your weak points is the fastest way to improve. Use our analytics to spot patterns in your Wrong Answers and focus your practice.</p>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="container">
      <div className="card text-page">
        <h1>Privacy Policy</h1>
        <p>At CP Tracker, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded and how we use it.</p>
        <h2>Log Files and API Data</h2>
        <p>We use the public Codeforces API to fetch user statistics. We do not store your personal Codeforces account passwords or private data. Handles searched on this site may be stored locally on your device using LocalStorage to improve your experience (e.g., in the Friends tab).</p>
        <h2>Google DoubleClick DART Cookie</h2>
        <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads</p>
        <p>Our advertising partners may use cookies and web beacons. Each of our advertising partners has their own Privacy Policy for their policies on user data.</p>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="container">
      <div className="card text-page">
        <h1>Terms of Service</h1>
        <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use CP Tracker if you do not agree to take all of the terms and conditions stated on this page.</p>
        <h2>Usage License</h2>
        <p>This tracker is a free utility built for the competitive programming community. You must not use this site to spam the Codeforces API or launch automated scraping attacks that could degrade the service.</p>
        <h2>Disclaimer</h2>
        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. All data is provided "as is" directly from the Codeforces API.</p>
      </div>
    </div>
  );
}
