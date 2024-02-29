document.addEventListener('DOMContentLoaded', function() {
    const confessionForm = document.getElementById('confessionForm');
    const confessionText = document.getElementById('confessionText');
    const identity = document.getElementById('identity');
    const confessionList = document.getElementById('confessionList');
  
    async function fetchAndDisplayConfessions() {
      confessionList.innerHTML = '';
      const response = await fetch('/confessions');
      const confessions = await response.json();
      confessions.forEach(confession => {
        const confessionItem = document.createElement('div');
        confessionItem.classList.add('confession');
        confessionItem.textContent = `"${confession.confession}" - ${confession.identity || 'Anonymous'}`;
        confessionList.appendChild(confessionItem);
      });
    }
  
    confessionForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const confessionData = {
        confession: confessionText.value.trim(),
        identity: identity.value.trim()
      }
      if (confessionData.confession.trim() === '') {
        alert('Confession cannot be empty');
        return;
      }
      if (confessionData.confession.length > 2000) {
        alert('Confession cannot be more than 2000 characters');
        return;
      }
      if (confessionData.identity.length > 20) {
        alert('Identity cannot be more than 20 characters');
        return;
      }
      const response = await fetch('/confessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(confessionData)
      });
      const newConfession = await response.json();
      confessionText.value = '';
      identity.value = '';
      alert('Confession submitted successfully!');
      fetchAndDisplayConfessions();
    });
  
    fetchAndDisplayConfessions();
  });
  