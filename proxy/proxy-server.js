const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Store for available endpoints
let endpoints = {};

// Load endpoints from configuration file
function loadEndpoints() {
    try {
        const configPath = path.join(__dirname, 'endpoints.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        endpoints = config;
        console.log('Endpoints loaded:', endpoints);
    } catch (error) {
        console.error('Error loading endpoints:', error);
    }
}

// Watch for changes in endpoints configuration
fs.watch(path.join(__dirname, 'endpoints.json'), (eventType) => {
    if (eventType === 'change') {
        console.log('Configuration changed, reloading endpoints...');
        loadEndpoints();
    }
});

// Endpoint registration route
app.post('/register', (req, res) => {
    const { name, url, method } = req.body;
    
    if (!name || !url || !method) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    endpoints[name] = { url, method };
    
    // Save to configuration file
    fs.writeFileSync(
        path.join(__dirname, 'endpoints.json'),
        JSON.stringify(endpoints, null, 2)
    );

    res.json({ message: 'Endpoint registered successfully', endpoints });
});

// List available endpoints
app.get('/services', (req, res) => {
    res.json(endpoints);
});

// Main proxy route with improved request handling
app.all('/api/:service', async (req, res) => {
    const serviceName = req.params.service;
    const endpoint = endpoints[serviceName];

    if (!endpoint) {
        return res.status(404).json({ error: 'Service not found' });
    }

    try {
        const config = {
            method: endpoint.method,
            url: endpoint.url,
            headers: {
                'Content-Type': req.headers['content-type']
            }
        };

        // Handle GET requests
        if (endpoint.method === 'GET') {
            config.params = req.query;
        }
        // Handle POST requests
        else if (endpoint.method === 'POST') {
            const formData = new URLSearchParams();
            // Add text parameter for POST requests
            if (req.body.text) {
                formData.append('text', req.body.text);
            }
            config.data = formData;
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(error.response?.status || 500).json({
            error: error.message
        });
    }
});

// Error handling for port conflicts
app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Proxy server running on port ${PORT}`);
});

// Initial load of endpoints
loadEndpoints();