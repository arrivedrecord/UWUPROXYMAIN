const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allows your front-end HTML to talk to this server

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send('URL query parameter is required');

    try {
        // Fetch the external website
        const response = await axios.get(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });

        // Send the HTML back to the browser iframe
        res.send(response.data);
    } catch (error) {
        res.status(500).send(`Error fetching page: ${error.message}`);
    }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
