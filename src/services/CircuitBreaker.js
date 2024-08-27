class CircuitBreaker {
    constructor(failureThreshold, resetTimeout) {
        this.failureThreshold = failureThreshold;
        this.resetTimeout = resetTimeout;
        this.failures = 0;
        this.lastFailureTime = 0;
        this.state = 'closed';
    }

    canAttempt() {
        if (this.state === 'open') {
            if (Date.now() - this.lastFailureTime > this.resetTimeout) {
                this.reset();
                return true;
            }
            return false;
        }
        return true;
    }

    recordFailure() {
        this.failures += 1;
        this.lastFailureTime = Date.now();

        if (this.failures >= this.failureThreshold) {
            this.state = 'open';
        }
    }

    reset() {
        this.failures = 0;
        this.state = 'closed';
    }
}

module.exports = CircuitBreaker;
