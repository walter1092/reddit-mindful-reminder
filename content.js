const defaultMessages = [
  "Is this really the best use of your time right now?",
  "Remember: Reddit's algorithm is designed to keep you scrolling",
  "Your future self will thank you for doing something productive instead",
  "What could you be creating instead of consuming?",
  "Are you learning something valuable, or just filling time?",
  "Think about your goals. Is this helping you achieve them?"
];

function createReminder(message) {
  if (!document.getElementById('reddit-reminder')) {
    const reminder = document.createElement('div');
    reminder.id = 'reddit-reminder';
    reminder.className = 'reddit-reminder';
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.className = 'close-button';
    closeButton.onclick = () => {
      reminder.style.opacity = '0';
      setTimeout(() => reminder.remove(), 1000);
    };
    
    reminder.appendChild(messageText);
    reminder.appendChild(closeButton);
    document.body.appendChild(reminder);
    
    setTimeout(() => {
      reminder.style.opacity = '0';
      setTimeout(() => reminder.remove(), 1000);
    }, 15000);
  }
}

function showReminder() {
  chrome.runtime.sendMessage({type: 'GET_MESSAGE'}, (response) => {
    const message = response?.reminderMessage || 
      defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
    createReminder(message);
  });
}

// Show initial reminder
setTimeout(showReminder, 1000);

// Handle navigation within Reddit (SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    showReminder();
  }
}).observe(document.body, {childList: true, subtree: true});