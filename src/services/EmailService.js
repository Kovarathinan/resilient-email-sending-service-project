let MockEmailProvider1 = require('./MockEmailProvider1');
let MockEmailProvider2 = require('./MockEmailProvider2');
let ExponentialBackoff = require('../utils/ExponentialBackoff');
let { isEmailSent, markEmailAsSent } = require('../utils/Idempotency');
let { trackEmailStatus } = require('../utils/StatusTracker');
let RateLimiter = require('./RateLimiter');
let CircuitBreaker = require('./CircuitBreaker');

class EmailService {
    constructor() {
        this.provider1 = new MockEmailProvider1();
        this.provider2 = new MockEmailProvider2();
        this.rateLimiter = new RateLimiter(5, 60000); // 5 emails per minute
        this.circuitBreaker = new CircuitBreaker(3, 30000); // 3 failures, 30-second timeout
    }

    async sendEmail(emailId, to, subject, body) {
        if (isEmailSent(emailId)) {
            console.log(`Email with ID ${emailId} already sent. Skipping...`);
            return;
        }

        if (!this.rateLimiter.canSendEmail()) {
            console.log('Rate limit exceeded. Please try again later.');
            return;
        }

        let attempts = 0;
        let success = false;

        for (const provider of [this.provider1, this.provider2]) {
            while (!success && this.circuitBreaker.canAttempt()) {
                try {
                    attempts += 1;
                    success = await provider.sendEmail(to, subject, body);

                    if (success) {
                        markEmailAsSent(emailId);
                        trackEmailStatus(to, subject, 'Success', attempts);
                        console.log(`Email sent successfully via ${provider.constructor.name}`);
                        return;
                    } else {
                        throw new Error('Email sending failed');
                    }
                } catch (error) {
                    console.log(`Attempt ${attempts}: ${error.message}`);
                    this.circuitBreaker.recordFailure();
                    await ExponentialBackoff(attempts);
                }
            }

            if (success) break;
        }

        if (!success) {
            trackEmailStatus(to, subject, 'Failed', attempts);
            console.log('Failed to send the email after multiple attempts.');
        }
    }
}

module.exports = EmailService;
