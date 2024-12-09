// monitor-cli.js
const MonitoringService = require('./monitor-service');

const monitor = new MonitoringService();

async function runOnDemandTest() {
    console.log('Running on-demand tests...');
    const results = await monitor.runTests();
    console.log('\nTest Results:');
    console.log(JSON.stringify(results, null, 2));
    
    const alerts = monitor.analyzeResults(results);
    if (alerts.length > 0) {
        console.log('\nAlerts:');
        console.log(JSON.stringify(alerts, null, 2));
    }
}

// Start both on-demand test and periodic monitoring
runOnDemandTest();
monitor.startPeriodicMonitoring(300000); // 5 minutes