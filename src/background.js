/**
 * ViewPassword — background service worker.
 *
 * Relays keyboard command shortcuts to the content script running in the
 * active tab. Keeping the logic here means the shortcut works even when the
 * page has focus.
 */
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || tab.id == null) return;
    chrome.tabs.sendMessage(tab.id, command, () => {
      // Swallow "no receiving end" errors on pages without a content script.
      void chrome.runtime.lastError;
    });
  });
});
