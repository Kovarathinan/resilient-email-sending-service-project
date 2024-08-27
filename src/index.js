let EmailService = require('./services/EmailService');

async function run() {
    const emailService = new EmailService();

    await emailService.sendEmail('company1@gmail.com', 'recipient1@gmail.com', 'Mail for submitting your documents', 'Submit all your documents properly before the deadline');
    await emailService.sendEmail('company2@gmail.com', 'recipient1@gmail.com', 'Mail regarding your application delay', 'Your job application for system engineer is delayed due to unexpected technical issues');
}

run();
