import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());

let cachedProblems = [];
let lastProblemsFetch = 0;

const getRatingDistribution = (data) => {
    const okSubs = data.result.filter(sub => sub.verdict === 'OK' && sub.problem.rating);
    const unique = new Map();
    okSubs.forEach(sub => unique.set(`${sub.problem.contestId}-${sub.problem.index}`, sub.problem.rating));
    
    const counts = {};
    unique.forEach(rating => counts[rating] = (counts[rating] || 0) + 1);
    
    return Object.keys(counts)
        .map(r => ({ name: `${r}`, count: counts[r] }))
        .sort((a, b) => parseInt(a.name) - parseInt(b.name));
};

const getTagDistribution = (data) => {
    const okSubs = data.result.filter(sub => sub.verdict === 'OK');
    const tagsCount = {};
    okSubs.forEach(sub => {
        if (sub.problem && sub.problem.tags) {
            sub.problem.tags.forEach(tag => tagsCount[tag] = (tagsCount[tag] || 0) + 1);
        }
    });
    return Object.entries(tagsCount).map(([subject, count]) => ({ subject, count })).sort((a, b) => b.count - a.count).slice(0, 8);
};

const getRecentSubmissions = (data) => {
    return data.result.slice(0, 10).map(sub => ({
        id: sub.id, contestId: sub.problem.contestId, index: sub.problem.index,
        name: sub.problem.name, verdict: sub.verdict, language: sub.programmingLanguage,
        time: new Date(sub.creationTimeSeconds * 1000).toLocaleString('en-US')
    }));
};

const getRecentContests = (ratingsData, subsData) => {
    if (!ratingsData || !ratingsData.result || ratingsData.result.length === 0) return [];
    const last10 = ratingsData.result.slice(-10).reverse();
    return last10.map(ratingObj => {
        const contestSubs = subsData.result.filter(s => 
            s.contestId === ratingObj.contestId && 
            s.verdict === 'OK' &&
            s.author.participantType === 'CONTESTANT'
        );
        return {
            id: ratingObj.contestId,
            name: ratingObj.contestName,
            date: new Date(ratingObj.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            ratingChange: ratingObj.newRating - ratingObj.oldRating,
            newRating: ratingObj.newRating,
            solvedCount: new Set(contestSubs.map(s => s.problem.index)).size
        };
    });
};

app.get('/api/latest-problems', async (req, res) => {
    try {
        const now = Date.now();
        if (cachedProblems.length === 0 || now - lastProblemsFetch > 3600000) {
            const response = await axios.get('https://codeforces.com/api/problemset.problems');
            if (response.data && response.data.result && response.data.result.problems) {
                cachedProblems = response.data.result.problems;
                lastProblemsFetch = now;
            }
        }
        const latest = cachedProblems.slice(0, 100);
        res.json(latest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch latest problems' });
    }
});

app.get('/api/profile/:handle', async (req, res) => {
    try {
        const { handle } = req.params;
        
        const [statusRes, ratingRes, infoRes] = await Promise.all([
            axios.get(`https://codeforces.com/api/user.status?handle=${handle}`),
            axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`),
            axios.get(`https://codeforces.com/api/user.info?handles=${handle}`)
        ]);

        const subs = statusRes.data.result;
        const ratings = ratingRes.data.result;
        const userInfo = infoRes.data.result[0];
        const verdictsCount = {};
        subs.forEach(sub => {
            const v = sub.verdict === 'OK' ? 'Accepted' : sub.verdict.replace(/_/g, ' ');
            verdictsCount[v] = (verdictsCount[v] || 0) + 1;
        });
        const verdictsPie = Object.keys(verdictsCount).map(key => ({ name: key, count: verdictsCount[key] }));

        const attempted = new Set();
        const solved = new Set();
        const heatmapData = {};

        subs.forEach(sub => {
            const probId = `${sub.problem.contestId}-${sub.problem.index}`;
            attempted.add(probId);
            if (sub.verdict === 'OK') {
                solved.add(probId);
                if (sub.problem.rating) {
                    const dateObj = new Date(sub.creationTimeSeconds * 1000);
                    const isoDate = dateObj.toLocaleDateString('en-CA'); 
                    const currentMax = heatmapData[isoDate] || 0;
                    if (sub.problem.rating > currentMax) {
                        heatmapData[isoDate] = sub.problem.rating;
                    }
                }
            }
        });
        
        const unsolvedCount = attempted.size - solved.size;
        const totalSolved = solved.size;

        const recentContests = getRecentContests(ratingRes.data, statusRes.data);
        const ratingPie = getRatingDistribution(statusRes.data);
        const tagsRadar = getTagDistribution(statusRes.data);
        const recentSubs = getRecentSubmissions(statusRes.data);

        // ADDED: Injected the userInfo stats into the final JSON response
        res.json({ 
            handle, 
            rating: userInfo.rating || 0,
            maxRating: userInfo.maxRating || 0,
            rank: userInfo.rank || 'Unrated',
            maxRank: userInfo.maxRank || 'Unrated',
            contribution: userInfo.contribution || 0,
            verdictsPie, unsolvedCount, recentContests, heatmapData, ratingPie, tagsRadar, totalSolved, recentSubs 
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile data' });
    }
});
app.get('/api/compare/:handle1/:handle2', async (req, res) => {
    try {
        const { handle1, handle2 } = req.params;
        const [status1, status2, rating1, rating2] = await Promise.all([
            axios.get(`https://codeforces.com/api/user.status?handle=${handle1}`),
            axios.get(`https://codeforces.com/api/user.status?handle=${handle2}`),
            axios.get(`https://codeforces.com/api/user.rating?handle=${handle1}`),
            axios.get(`https://codeforces.com/api/user.rating?handle=${handle2}`)
        ]);

        const getSolved = (data) => {
            const okSubs = data.result.filter(sub => sub.verdict === 'OK');
            return [...new Set(okSubs.map(s => `${s.problem.contestId}-${s.problem.index}`))];
        };

        const solved1 = getSolved(status1.data);
        const solved2 = getSolved(status2.data);
        
        const allContests = [
            ...rating1.data.result.map(r => ({ ...r, user: handle1 })),
            ...rating2.data.result.map(r => ({ ...r, user: handle2 }))
        ];
        allContests.sort((a, b) => a.ratingUpdateTimeSeconds - b.ratingUpdateTimeSeconds);

        const combinedHistory = [];
        let lastRating1 = null; let lastRating2 = null;

        allContests.forEach(r => {
            const date = new Date(r.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            if (r.user === handle1) lastRating1 = r.newRating;
            if (r.user === handle2) lastRating2 = r.newRating;
            combinedHistory.push({ timestamp: r.ratingUpdateTimeSeconds, date: date, [handle1]: lastRating1, [handle2]: lastRating2 });
        });

        res.json({
            user1: {
                handle: handle1, totalSolved: solved1.length, uniqueSolved: solved1.filter(p => !solved2.includes(p)),
                ratingPie: getRatingDistribution(status1.data), tagsRadar: getTagDistribution(status1.data), recentSubs: getRecentSubmissions(status1.data),
                recentContests: getRecentContests(rating1.data, status1.data)
            },
            user2: {
                handle: handle2, totalSolved: solved2.length, uniqueSolved: solved2.filter(p => !solved1.includes(p)),
                ratingPie: getRatingDistribution(status2.data), tagsRadar: getTagDistribution(status2.data), recentSubs: getRecentSubmissions(status2.data),
                recentContests: getRecentContests(rating2.data, status2.data)
            },
            shared: { totalCommon: solved1.filter(p => solved2.includes(p)).length },
            ratingHistory: combinedHistory
        });
    } catch (error) { 
        res.status(500).json({ error: 'Failed to fetch data' }); 
    }
});

app.get('/api/contests', async (req, res) => {
    try {
        const response = await axios.get('https://codeforces.com/api/contest.list?gym=false');
        const upcoming = response.data.result.filter(c => c.phase === 'BEFORE').sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);
        res.json(upcoming);
    } catch (error) { 
        res.status(500).json({ error: 'Failed to fetch contests data' }); 
    }
});

app.get('/api/problems-filtered', async (req, res) => {
    try {
        const rating = parseInt(req.query.rating);
        const tagsParam = req.query.tags; // comma separated
        
        if (!rating) return res.status(400).json({ error: 'Rating is required' });

        const now = Date.now();
        if (cachedProblems.length === 0 || now - lastProblemsFetch > 3600000) {
            const response = await axios.get('https://codeforces.com/api/problemset.problems');
            if (response.data && response.data.result && response.data.result.problems) {
                cachedProblems = response.data.result.problems;
                lastProblemsFetch = now;
            }
        }

        let validProblems = cachedProblems.filter(p => p.rating === rating);
        
        if (tagsParam) {
            const selectedTags = tagsParam.split(',').map(t => t.trim().toLowerCase());
            if (selectedTags.length > 0) {
                validProblems = validProblems.filter(p => 
                    p.tags && selectedTags.some(selectedTag => p.tags.includes(selectedTag))
                );
            }
        }

        // Return up to 100 problems to give enough options, user wants 15 min
        res.json(validProblems.slice(0, 100));
    } catch (error) { 
        res.status(500).json({ error: 'Failed to fetch filtered problems' }); 
    }
});

app.get('/api/random-problem', async (req, res) => {
    try {
        const rating = parseInt(req.query.rating);
        if (!rating) return res.status(400).json({ error: 'Rating is required' });

        const now = Date.now();
        if (cachedProblems.length === 0 || now - lastProblemsFetch > 3600000) {
            const response = await axios.get('https://codeforces.com/api/problemset.problems');
            cachedProblems = response.data.result.problems;
            lastProblemsFetch = now;
        }

        const validProblems = cachedProblems.filter(p => p.rating === rating);
        if (validProblems.length === 0) return res.status(404).json({ error: `No tracking for rating exactly ${rating}` });

        const randomProblem = validProblems[Math.floor(Math.random() * validProblems.length)];
        res.json(randomProblem);
    } catch (error) { 
        res.status(500).json({ error: 'Failed to fetch random problem' }); 
    }
});

app.get('/api/duel-problem', async (req, res) => {
    try {
        const { handles, rating } = req.query;
        if (!handles || !rating) return res.status(400).json({ error: 'Handles and rating are required' });

        const ratingNum = parseInt(rating);
        const handleArr = handles.split(';');
        
        const statusPromises = handleArr.map(h => axios.get(`https://codeforces.com/api/user.status?handle=${h}`));
        const statusResponses = await Promise.all(statusPromises);
        
        const seenProblems = new Set();
        statusResponses.forEach(response => {
            if (response.data && response.data.result) {
                response.data.result.forEach(sub => {
                    seenProblems.add(`${sub.problem.contestId}-${sub.problem.index}`);
                });
            }
        });

        const now = Date.now();
        if (cachedProblems.length === 0 || now - lastProblemsFetch > 3600000) {
            const pRes = await axios.get('https://codeforces.com/api/problemset.problems');
            cachedProblems = pRes.data.result.problems;
            lastProblemsFetch = now;
        }

        const validUnseen = cachedProblems.filter(p => 
            p.rating === ratingNum && !seenProblems.has(`${p.contestId}-${p.index}`)
        );

        if (validUnseen.length === 0) {
            return res.status(404).json({ error: `No unseen problems found globally.` });
        }

        const duelProblem = validUnseen[Math.floor(Math.random() * validUnseen.length)];
        res.json(duelProblem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch duel problem' });
    }
});

app.get('/api/duel-check', async (req, res) => {
    try {
        const { handles, contestId, index } = req.query;
        if (!handles || !contestId || !index) return res.status(400).json({ error: 'Required data missing' });

        const handleArr = handles.split(';');
        
        for (let handle of handleArr) {
            const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=20`);
            if (response.data && response.data.result) {
                const winSub = response.data.result.find(sub => 
                    sub.problem.contestId == contestId && 
                    sub.problem.index == index && 
                    sub.verdict === 'OK'
                );
                if (winSub) {
                    return res.json({ winner: handle });
                }
            }
        }
        res.json({ winner: null });
    } catch (error) {
        res.status(500).json({ error: 'Arbiter timeout' });
    }
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        const { handles } = req.query;
        if (!handles) return res.status(400).json({ error: 'Handles are required' });

        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${handles}`);
        const users = response.data.result.map(u => ({
            handle: u.handle,
            rating: u.rating || 0,
            maxRating: u.maxRating || 0,
            rank: u.rank || 'unrated',
            maxRank: u.maxRank || 'unrated'
        }));

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard data' });
    }
});

app.get('/api/hall-of-fame', async (req, res) => {
    try {
        const response = await axios.get('https://codeforces.com/api/user.ratedList?activeOnly=true');
        if (response.data && response.data.status === 'OK') {
            const top100 = response.data.result.slice(0, 100);
            res.json(top100);
        } else {
            res.status(400).json({ error: 'Codeforces API error' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch hall of fame' });
    }
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default app;
