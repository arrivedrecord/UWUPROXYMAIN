const axios = require('axios');

module.exports = async (req, res) => {
    // Add headers to bypass browser cross-origin policy roadblocks
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('URL query parameter is required');
    }

    try {
        const response = await axios.get(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(`Error fetching page: ${error.message}`);
    }
};
