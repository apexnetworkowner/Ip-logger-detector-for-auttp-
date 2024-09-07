const ipInput = document.getElementById('ip-input');
const detectBtn = document.getElementById('detect-btn');
const resultBox = document.getElementById('result-box');

detectBtn.addEventListener('click', async () => {
  const ipAddress = ipInput.value.trim();
  if (!ipAddress) {
    resultBox.innerText = 'Please enter an IP address';
    return;
  }

  try {
    const response = await fetch(`https://api.ip-api.com/json/${ipAddress}?fields=status,message`);
    const data = await response.json();
    const isLogger = data.status === 'fail' && data.message.includes('IP logger');

    resultBox.innerText = isLogger ? 'Logger' : 'Safe';
  } catch (error) {
    resultBox.innerText = 'Error: ' + error.message;
  }
});
