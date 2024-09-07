const linkInput = document.getElementById('link-input');
const scanButton = document.getElementById('scan-button');
const resultBox = document.getElementById('result-box');

scanButton.addEventListener('click', () => {
    const link = linkInput.value.trim();
    if (!link) {
        alert('Please enter a link');
        return;
    }

    // Simple heuristic to check if the link is likely to be an IP logger
    const isIpLogger = link.includes('iplogger') || link.includes('logger');

    if (isIpLogger) {
        resultBox.innerHTML = 'IP Logger';
        resultBox.className = 'ip-logger';
    } else {
        resultBox.innerHTML = 'Safe';
        resultBox.className = 'safe';
    }
});
