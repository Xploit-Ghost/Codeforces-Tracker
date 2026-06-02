import React, { useState, useEffect } from 'react';
import '../App.css';

export default function CodeforcesBlogs() {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('https://codeforces.com/api/recentActions?maxCount=30');
        const data = await res.json();
        if (data.status === 'OK') {
          // Filter to only show new blog entries or important updates to avoid spam
          const blogs = data.result
            .filter(a => a.blogEntry)
            .map(a => a.blogEntry);
          
          // Remove duplicates based on blog id
          const uniqueBlogs = Array.from(new Map(blogs.map(b => [b.id, b])).values());
          setActions(uniqueBlogs);
        } else {
          setError(data.comment);
        }
      } catch (err) {
        setError("Failed to fetch recent blogs.");
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="page-container">
      <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>📝 Community Blogs & Discussions</h2>
        <p className="subtitle" style={{ marginBottom: '2rem' }}>The most recent blog posts, tutorials, and announcements from the Codeforces community.</p>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Fetching recent blogs...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {actions.map((blog) => {
              const date = new Date(blog.creationTimeSeconds * 1000);
              return (
                <div key={blog.id} style={{ backgroundColor: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #FF8CC6' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>
                    <a href={`https://codeforces.com/blog/entry/${blog.id}`} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                      {blog.title.replace(/<[^>]*>?/gm, '')} {/* Strip basic HTML tags often found in CF titles */}
                    </a>
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.9rem' }}>
                    <span>By <strong>{blog.authorHandle}</strong></span>
                    <span>{date.toLocaleDateString()} at {date.toLocaleTimeString()}</span>
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <span style={{ backgroundColor: '#333', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                      👍 {blog.rating}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
