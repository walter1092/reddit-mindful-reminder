document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get(['reminderMessage'], function(result) {
    if (result.reminderMessage) {
      document.getElementById('message').value = result.reminderMessage;
    }
  });

  document.getElementById('save').addEventListener('click', function() {
    const message = document.getElementById('message').value;
    chrome.storage.local.set({
      reminderMessage: message
    }, function() {
      const button = document.getElementById('save');
      button.textContent = 'Saved!';
      setTimeout(() => {
        button.textContent = 'Save Message';
      }, 1500);
    });
  });
});