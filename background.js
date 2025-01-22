chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_MESSAGE') {
    chrome.storage.local.get(['reminderMessage'], function(result) {
      sendResponse(result);
    });
    return true;
  }
});