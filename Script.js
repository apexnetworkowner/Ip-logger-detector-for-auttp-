const ipInput = document.getElementById('ip-input');
const detectBtn = document.getElementById('detect-btn');
const resultBox = document.getElementById('result-box');

detectBtn.addEventListener('click', async () => {
  const link = ipInput.value.trim();
  if (!link) {
    resultBox.innerText = 'Please enter a link';
    return;
  }

  try {
    const response = await fetch(`https://api.urlscan.io/v1/scan/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': '714e0978-4e9e-456a-97c0-77a90c69c80a'
      },
      body: JSON.stringify({ url: link })
    });
    const data = await response.json();
    const scanId = data.api;

    // wait for the scan to complete
    await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds

    const scanResponse = await fetch(`https://api.urlscan.io/v1/result/${scanId}`);
    const scanData = await scanResponse.json();
    const isLogger = scanData.verdicts.ip_logger;

    resultBox.innerText = isLogger ? 'Unsafe (Logger detected)' : 'Safe';
  } catch (error) {
    resultBox.innerText = 'Error: ' + error.message;
  }
});
