const axios = require('axios');
const fs = require('fs');

// The EXACT problem IDs for 800 Rating
const exact800 = [
    { name: "Halloumi Boxes", contestId: 1903, index: "A" },
    { name: "Line Trip", contestId: 1901, index: "A" },
    { name: "Cover in Water", contestId: 1900, index: "A" },
    { name: "Game with Integers", contestId: 1899, index: "A" },
    { name: "Jagged Swaps", contestId: 1896, index: "A" },
    { name: "Doremy's Paint 3", contestId: 1890, index: "A" },
    { name: "Don't Try to Count", contestId: 1881, index: "A" },
    { name: "How Much Does Daytona Cost?", contestId: 1878, index: "A" },
    { name: "Goals of Victory", contestId: 1877, index: "A" },
    { name: "Target Practice", contestId: 1873, index: "C" },
    { name: "Ambitious Kid", contestId: 1866, index: "A" },
    { name: "Sequence Game", contestId: 1862, index: "B" },
    { name: "United We Stand", contestId: 1859, index: "A" },
    { name: "Buttons", contestId: 1858, index: "A" },
    { name: "Array Coloring", contestId: 1857, index: "A" },
    { name: "Desorting", contestId: 1853, index: "A" },
    { name: "Forbidden Integer", contestId: 1845, index: "A" },
    { name: "Grasshopper on a Line", contestId: 1837, index: "A" },
    { name: "Unit Array", contestId: 1834, index: "A" },
    { name: "Twin Permutations", contestId: 1831, index: "A" },
    { name: "Blank Space", contestId: 1829, index: "B" },
    { name: "Coins", contestId: 1814, index: "A" },
    { name: "Walking Master", contestId: 1806, index: "A" },
    { name: "We Need the Zero", contestId: 1805, index: "A" },
    { name: "Prepend and Append", contestId: 1791, index: "C" },
    { name: "Serval and Mocha's Array", contestId: 1789, index: "A" },
    { name: "One and Two", contestId: 1788, index: "A" },
    { name: "Make it Beautiful", contestId: 1783, index: "A" },
    { name: "Everybody Likes Good Arrays!", contestId: 1777, index: "A" },
    { name: "Extremely Round", contestId: 1766, index: "A" },
    { name: "Two Permutations", contestId: 1761, index: "A" }
];

// The EXACT problem IDs for 900 Rating
const exact900 = [
    { name: "Forked!", contestId: 1904, index: "A" },
    { name: "Chemistry", contestId: 1883, index: "B" },
    { name: "Vasilije in Cacak", contestId: 1878, index: "C" },
    { name: "Jellyfish and Undertale", contestId: 1875, index: "A" },
    { name: "Make It Zero", contestId: 1869, index: "A" },
    { name: "Longest Divisors Interval", contestId: 1855, index: "B" },
    { name: "Balanced Round", contestId: 1850, index: "D" },
    { name: "Comparison String", contestId: 1837, index: "B" },
    { name: "Permutation Swap", contestId: 1828, index: "B" },
    { name: "Mainak and Array", contestId: 1726, index: "A" },
    { name: "Array Recovery", contestId: 1739, index: "B" },
    { name: "NIT Destroys the Universe", contestId: 1696, index: "B" },
    { name: "AvtoBus", contestId: 1679, index: "A" },
    { name: "Odd Grasshopper", contestId: 1607, index: "B" },
    { name: "Make It Increasing", contestId: 1675, index: "B" },
    { name: "Deletive Editing", contestId: 1666, index: "D" },
    { name: "Array Cloning Technique", contestId: 1668, index: "B" },
    { name: "Make AP", contestId: 1624, index: "B" },
    { name: "Odd Divisor", contestId: 1475, index: "A" },
    { name: "AB Balance", contestId: 1598, index: "A" },
    { name: "Make it Divisible by 25", contestId: 1593, index: "B" },
    { name: "Luntik and Concerts", contestId: 1582, index: "A" },
    { name: "Mocha and Math", contestId: 1559, index: "A" },
    { name: "Exciting Bets", contestId: 1543, index: "A" },
    { name: "Bad Boy", contestId: 1537, index: "B" },
    { name: "Customising the Track", contestId: 1543, index: "B" },
    { name: "Strange Partition", contestId: 1471, index: "A" },
    { name: "Sum of Medians", contestId: 1440, index: "B" },
    { name: "Three Indices", contestId: 1380, index: "A" },
    { name: "01 Game", contestId: 1373, index: "B" },
    { name: "Multiply by 2, divide by 6", contestId: 1374, index: "B" }
];

async function buildBulletproofSheet() {
    try {
        console.log("Fetching Codeforces database...");
        const response = await axios.get('https://codeforces.com/api/problemset.problems');
        const allProblems = response.data.result.problems;
        const allStats = response.data.result.problemStatistics;
        
        const finalSheet = [];
        
        // 1. Array to handle all curated tiers dynamically
        const curatedTiers = [
            { rating: 800, list: exact800 },
            { rating: 900, list: exact900 }
        ];

        // 2. Build the exact curated tabs
        curatedTiers.forEach(tier => {
            tier.list.forEach(target => {
                const prob = allProblems.find(p => p.contestId === target.contestId && p.index === target.index);
                finalSheet.push({
                    rating: tier.rating,
                    contestId: target.contestId,
                    index: target.index,
                    name: target.name,
                    topic: prob && prob.tags && prob.tags.length > 0 ? prob.tags[0] : "Various"
                });
            });
        });

        // 3. Build the 1000-1900 placeholders based on historical popularity
        const solvedCounts = {};
        allStats.forEach(stat => solvedCounts[`${stat.contestId}-${stat.index}`] = stat.solvedCount);
        const targetRatings = [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900];
        
        targetRatings.forEach(rating => {
            let matched = allProblems.filter(p => p.rating === rating);
            matched.sort((a, b) => (solvedCounts[`${b.contestId}-${b.index}`] || 0) - (solvedCounts[`${a.contestId}-${a.index}`] || 0));
            const top31 = matched.slice(0, 31);
            top31.forEach(p => finalSheet.push({
                rating: p.rating, contestId: p.contestId, index: p.index, 
                name: p.name, topic: p.tags && p.tags.length > 0 ? p.tags[0] : "Various"
            }));
        });

        fs.writeFileSync('./cp31.json', JSON.stringify(finalSheet, null, 2));
        console.log(`✅ Success! Auto-generated exact 800 and 900 rated CP31 problems.`);
        
    } catch (error) {
        console.error("Failed to fetch data:", error.message);
    }
}

buildBulletproofSheet();