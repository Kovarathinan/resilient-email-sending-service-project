class RateLimiter {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }

    canSendEmail() {
        const currentTime = Date.now();
        this.requests = this.requests.filter(timestamp => currentTime - timestamp < this.timeWindow);

        if (this.requests.length < this.maxRequests) {
            this.requests.push(currentTime);
            return true;
        }

        return false;
    }
}

module.exports = RateLimiter;
