const sentEmails = new Set();

function isEmailSent(emailId) {
    return sentEmails.has(emailId);
}

function markEmailAsSent(emailId) {
    sentEmails.add(emailId);
}

module.exports = { isEmailSent, markEmailAsSent };
