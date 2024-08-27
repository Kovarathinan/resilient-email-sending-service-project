class MockEmailProvider2 {
    constructor() {
        this.providerName = 'MockEmailProvider2';
    }

    async sendEmail(to, subject, body) {
        console.log(`${this.providerName} is trying to send an email to ${to}`);
        const isSuccess = Math.random() > 0.2; // 80% success rate
        return isSuccess;
    }
}

module.exports = MockEmailProvider2;
