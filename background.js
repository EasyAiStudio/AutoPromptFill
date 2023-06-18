// This event is fired each time the service worker starts up.
self.addEventListener("install", async () => {
  console.log("Service Worker Installed");
});

// Handle an event in the background.
chrome.runtime.onInstalled.addListener(function () {
  console.log("Extension installed");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log("Tab updated: ", tabId);
  }
});
