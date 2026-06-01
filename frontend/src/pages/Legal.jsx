import '../App.css';

export function About() {
  return (
    <div className="container">
      <div className="card text-page">
        <h1>About CP Tracker</h1>
        <p>Welcome to the ultimate Codeforces Analytics and Tracking platform. Competitive programming is a mind sport that requires intense dedication, consistent practice, and deep analytical tracking to master algorithms and data structures.</p>
        
        <h2>Our Mission</h2>
        <p>Our tool is designed for developers, students, and competitive programmers to analyze their Codeforces profiles, track their daily progress, and benchmark their problem-solving skills against peers. We believe that identifying your weaknesses through data is the fastest way to improve. By visualizing your submission history, tracking your rating changes, and understanding your performance in specific algorithmic categories, you can optimize your training schedule.</p>
        
        <h2>Features and Tracking</h2>
        <p>We utilize the official Codeforces API to fetch real-time public data. Here is a breakdown of our core features:</p>
        <ul>
          <li><strong>Versus Analytics:</strong> Compare two Codeforces handles head-to-head. See who has solved more problems, compare rating trajectories over time, and see a breakdown of solved problems by difficulty rating.</li>
          <li><strong>Solo Profile:</strong> Get an in-depth view of your own Codeforces journey. Our radar charts show your strongest and weakest algorithmic topics (e.g., Dynamic Programming, Graph Theory, Greedy algorithms). We also display a GitHub-style heatmap of your daily coding activity.</li>
          <li><strong>Speed Duel:</strong> Challenge your friends to a 1v1 coding race. We fetch a random, unseen problem for both participants based on a specified rating, and track who solves it first.</li>
          <li><strong>Latest Problems:</strong> Stay up-to-date with the newest problems added to the Codeforces problemset, filterable by rating and tags.</li>
          <li><strong>Educational Guides:</strong> Access our growing library of articles written by experienced competitive programmers to learn new algorithms and contest strategies.</li>
        </ul>
        
        <h2>Why Data Matters in Competitive Programming</h2>
        <p>Whether you are trying to break out of the 'Newbie' rank or pushing for 'Candidate Master', analyzing your weak points is the fastest way to improve. Use our analytics to spot patterns in your Wrong Answers and focus your practice. For example, if you notice your accuracy drops significantly on problems tagged with 'math' above 1500 rating, you know exactly what to study next.</p>
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
        
        <h2>Information We Collect and How We Use It</h2>
        <p>We use the public Codeforces API to fetch user statistics. We do not require you to create an account on our platform, and we do not store your personal Codeforces account passwords, emails, or private data. All the data displayed on this website is publicly available on the Codeforces platform.</p>
        <p>Handles searched on this site may be stored locally on your device using your browser's LocalStorage to improve your experience (for example, to remember the handles you added in the Friends tab). This data never leaves your device and is not stored on our servers.</p>
        
        <h2>Log Files</h2>
        <p>CP Tracker follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

        <h2>Google DoubleClick DART Cookie</h2>
        <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">https://policies.google.com/technologies/ads</a></p>
        
        <h2>Our Advertising Partners</h2>
        <p>Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data.</p>
        <ul>
          <li>Google: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">https://policies.google.com/technologies/ads</a></li>
        </ul>
        
        <h2>Third Party Privacy Policies</h2>
        <p>CP Tracker's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>
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
        
        <h2>Usage License and API Etiquette</h2>
        <p>This tracker is a free utility built for the competitive programming community. You must not use this site to spam the Codeforces API or launch automated scraping attacks that could degrade the service for others. We rely on the public Codeforces API, and any abuse of our platform that results in rate-limiting will affect all users.</p>
        <p>You may not:</p>
        <ul>
          <li>Republish material from CP Tracker</li>
          <li>Sell, rent or sub-license material from CP Tracker</li>
          <li>Reproduce, duplicate or copy material from CP Tracker</li>
          <li>Redistribute content from CP Tracker</li>
        </ul>
        
        <h2>Disclaimer</h2>
        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. All data is provided "as is" directly from the Codeforces API. We do not guarantee the accuracy, completeness, or timeliness of the data displayed. Codeforces may change its API structure or rate limits at any time, which may cause temporary or permanent disruptions to our service.</p>
        
        <h2>User-Generated Content</h2>
        <p>Since we display public data from Codeforces, any offensive or inappropriate usernames, problem names, or submission data originates from the source platform and does not reflect the views or values of CP Tracker. We reserve the right to block specific handles from being searched on our platform if they violate our community guidelines.</p>
      </div>
    </div>
  );
}
