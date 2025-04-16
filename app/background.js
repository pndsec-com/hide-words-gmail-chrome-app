chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get("suspiciousWords", data => {
        if (!data.suspiciousWords) {
            chrome.storage.local.set({ suspiciousWords: [] });
        }
    });
});
