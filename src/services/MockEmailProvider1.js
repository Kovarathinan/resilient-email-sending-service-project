class MockEmailProvider1 {
    constructor() {
        this.providerName = 'MockEmailProvider1';
    }

    async sendEmail(to, subject, body) {
        console.log(`${this.providerName} is trying to send an email to ${to}`);
        const isSuccess = Math.random() > 0.3; // 70% success rate
        return isSuccess;
    }
}

module.exports = MockEmailProvider1;
