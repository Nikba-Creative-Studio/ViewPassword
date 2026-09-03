const toggle = document.getElementById("toggle");
const status = document.getElementById("status");
const selectToggle = document.getElementById("select-toggle");
const selectStatus = document.getElementById("select-status");

function render(input, label, enabled) {
  input.checked = enabled;
  label.textContent = enabled ? "Enabled" : "Disabled";
}

chrome.storage.local.get({ enabled: true, copySelectEnabled: true }, (res) => {
  render(toggle, status, res.enabled !== false);
  render(selectToggle, selectStatus, res.copySelectEnabled !== false);
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ enabled });
  render(toggle, status, enabled);
});

selectToggle.addEventListener("change", () => {
  const copySelectEnabled = selectToggle.checked;
  chrome.storage.local.set({ copySelectEnabled });
  render(selectToggle, selectStatus, copySelectEnabled);
});
