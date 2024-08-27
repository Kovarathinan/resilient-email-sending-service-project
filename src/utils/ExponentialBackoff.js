async function ExponentialBackoff(retries) {
    const delay = Math.pow(2, retries) * 100; // Exponential backoff
    return new Promise(resolve => setTimeout(resolve, delay));
}

module.exports = ExponentialBackoff;
