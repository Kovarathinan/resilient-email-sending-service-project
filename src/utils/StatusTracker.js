const emailStatusList = [];

function trackEmailStatus(to, subject, status, attempts) {
    emailStatusList.push({ to, subject, status, attempts });
}

function getEmailStatus() {
    return emailStatusList;
}

module.exports = { trackEmailStatus, getEmailStatus };
