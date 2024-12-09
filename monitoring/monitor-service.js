// monitor-service.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

class MonitoringService {
    constructor() {
        this.proxyUrl = 'http://cloud_final-proxy-1:3000/api';
        this.logFile = path.join(__dirname, 'monitoring-logs.json');
        this.testCases = [
            {
                text: "Hello world! This is a test 123.",
                expected: {
                    wordCount: 7,
                    charCount: 28,
                    vowelCount: 7,
                    integerCount: 3,
                    spaceCount: 6,
                    sentenceCount: 2
                }
            },
            {
                text: "Testing 456. More tests! How about this?",
                expected: {
                    wordCount: 8,
                    charCount: 33,
                    vowelCount: 8,
                    integerCount: 3,
                    spaceCount: 7,
                    sentenceCount: 3
                }
            }
        ];
    }

    // Generate random test string
    generateRandomText() {
        const words = ['hello', 'world', 'test', '123', 'monitoring', 'service', 
                      'random', 'text', 'check', 'performance'];
        const length = Math.floor(Math.random() * 10) + 5; // 5-15 words
        let text = '';
        
        for(let i = 0; i < length; i++) {
            text += words[Math.floor(Math.random() * words.length)];
            text += ' ';
        }
        
        return text.trim() + '.';
    }

    // Test individual endpoint
    async testEndpoint(endpoint, text, expectedValue = null) {
        const startTime = Date.now();
        let success = false;
        let response = null;
        let error = null;

        try {
            if (['wordcount', 'charcount'].includes(endpoint)) {
                response = await axios.get(`${this.proxyUrl}/${endpoint}?text=${encodeURIComponent(text)}`);
            } else {
                response = await axios.post(`${this.proxyUrl}/${endpoint}`, `text=${encodeURIComponent(text)}`, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });
            }
            
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            
            if (expectedValue !== null) {
                success = response.data[`${endpoint.replace('count', 'Count')}`] === expectedValue;
            } else {
                success = response.status === 200;
            }

            return {
                endpoint,
                success,
                responseTime,
                result: response.data,
                error: null
            };
        } catch (err) {
            error = err.message;
            return {
                endpoint,
                success: false,
                responseTime: Date.now() - startTime,
                result: null,
                error
            };
        }
    }

    // Run all tests
    async runTests(useRandomText = false) {
        const results = [];
        const testData = useRandomText ? 
            [{ text: this.generateRandomText() }] : 
            this.testCases;

        for (const testCase of testData) {
            const testResults = await Promise.all([
                this.testEndpoint('wordcount', testCase.text, testCase.expected?.wordCount),
                this.testEndpoint('charcount', testCase.text, testCase.expected?.charCount),
                this.testEndpoint('vowelcount', testCase.text, testCase.expected?.vowelCount),
                this.testEndpoint('integercount', testCase.text, testCase.expected?.integerCount),
                this.testEndpoint('spacecount', testCase.text, testCase.expected?.spaceCount),
                this.testEndpoint('sentencecount', testCase.text, testCase.expected?.sentenceCount)
            ]);

            results.push({
                text: testCase.text,
                timestamp: new Date().toISOString(),
                results: testResults
            });
        }

        this.logResults(results);
        return results;
    }

    // Log results to file
    logResults(results) {
        try {
            let logs = [];
            if (fs.existsSync(this.logFile)) {
                try {
                    const fileContent = fs.readFileSync(this.logFile, 'utf8');
                    logs = fileContent ? JSON.parse(fileContent) : [];
                } catch (error) {
                    console.error('Error reading logs file:', error);
                    logs = [];
                }
            }
            logs.push(...results);
            fs.writeFileSync(this.logFile, JSON.stringify(logs, null, 2));
        } catch (error) {
            console.error('Error logging results:', error);
        }
    }
    // Analyze results and generate alerts
    analyzeResults(results) {
        const alerts = [];
        
        for (const result of results) {
            for (const test of result.results) {
                if (!test.success) {
                    alerts.push({
                        level: 'ERROR',
                        message: `Test failed for ${test.endpoint}`,
                        details: {
                            endpoint: test.endpoint,
                            error: test.error,
                            text: result.text
                        }
                    });
                }
                
                if (test.responseTime > 1000) { // Alert if response time > 1s
                    alerts.push({
                        level: 'WARNING',
                        message: `Slow response time for ${test.endpoint}`,
                        details: {
                            endpoint: test.endpoint,
                            responseTime: test.responseTime,
                            text: result.text
                        }
                    });
                }
            }
        }
        
        return alerts;
    }

    // Start periodic monitoring
    startPeriodicMonitoring(interval = 300000) { // Default: 5 minutes
        console.log(`Starting periodic monitoring (interval: ${interval}ms)`);
        
        setInterval(async () => {
            console.log('Running periodic tests...');
            const results = await this.runTests(true);
            const alerts = this.analyzeResults(results);
            
            if (alerts.length > 0) {
                console.log('⚠️ Alerts generated:', alerts);
                
                
            }
        }, interval);
    }
}

module.exports = MonitoringService;