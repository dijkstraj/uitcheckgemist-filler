chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method === 'getDetails') {
    chrome.storage.sync.get({details: '[]'}, function(items) {
      let details = JSON.parse(items.details);
      sendResponse({data: details});
    });
    // let them know we'll respond asynchronously
    return true;
  } else {
    sendResponse({data: []});
  }
});