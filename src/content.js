/**
 * ViewPassword — content script.
 *
 * Attaches a small floating toolbar to any password field. The toolbar lets the
 * user reveal/hide the value and copy it to the clipboard. Everything runs
 * locally; no value ever leaves the page.
 */
(() => {
  "use strict";

  const REVEALED = new WeakSet(); // password fields currently shown as text
  let enabled = true; // global on/off, controlled from the popup
  let copySelectEnabled = true; // copy tool for select fields
  let toolbar = null; // single reusable toolbar element
  let currentField = null; // field the toolbar is anchored to
  let hideTimer = null;

  const SVG = {
    eye: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
    copy: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  };

  function isPasswordField(el) {
    return (
      el &&
      el.tagName === "INPUT" &&
      (el.type === "password" || REVEALED.has(el))
    );
  }

  function isSelectField(el) {
    return el && el.tagName === "SELECT";
  }

  function isSupportedField(el) {
    return isPasswordField(el) || (copySelectEnabled && isSelectField(el));
  }

  function buildToolbar() {
    const bar = document.createElement("div");
    bar.className = "vp-toolbar";
    bar.setAttribute("dir", "ltr");

    const revealBtn = document.createElement("button");
    revealBtn.type = "button";
    revealBtn.className = "vp-btn vp-reveal";
    revealBtn.title = "Show/hide password";
    revealBtn.setAttribute("aria-label", "Show or hide password");

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "vp-btn vp-copy";
    copyBtn.title = "Copy password";
    copyBtn.setAttribute("aria-label", "Copy password");
    copyBtn.innerHTML = SVG.copy;

    // Use mousedown so the field does not lose focus/blur before we act.
    revealBtn.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentField) toggleReveal(currentField);
    });
    copyBtn.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentField) copyValue(currentField, copyBtn);
    });

    // Copy first so it sits closest to the field — it is the primary action.
    bar.appendChild(copyBtn);
    bar.appendChild(revealBtn);

    // Keep toolbar visible while the pointer is over it.
    bar.addEventListener("mouseenter", () => clearTimeout(hideTimer));
    bar.addEventListener("mouseleave", scheduleHide);

    document.body.appendChild(bar);
    return bar;
  }

  function ensureToolbar() {
    if (!toolbar || !toolbar.isConnected) toolbar = buildToolbar();
    return toolbar;
  }

  function syncToolbar() {
    if (!toolbar || !currentField) return;
    const revealBtn = toolbar.querySelector(".vp-reveal");
    const copyBtn = toolbar.querySelector(".vp-copy");
    const selectField = isSelectField(currentField);
    revealBtn.hidden = selectField;
    copyBtn.title = selectField ? "Copy selected value" : "Copy password";
    copyBtn.setAttribute(
      "aria-label",
      selectField ? "Copy selected value" : "Copy password"
    );
    if (!selectField) {
      revealBtn.innerHTML = REVEALED.has(currentField) ? SVG.eyeOff : SVG.eye;
    }
  }

  function positionToolbar() {
    if (!toolbar || !currentField || !currentField.isConnected) {
      hideToolbar();
      return;
    }
    const r = currentField.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) {
      hideToolbar();
      return;
    }
    const bw = toolbar.offsetWidth || 64;
    const bh = toolbar.offsetHeight || 32;
    const gap = 6;
    // Preferred spot: just OUTSIDE the field's right edge (beside it), so it
    // never covers the typed text. Vertically centered on the field.
    let top = r.top + r.height / 2 - bh / 2;
    let left = r.right + gap;
    // If there isn't room to the right, fall back to inside the right edge.
    if (left + bw + gap > window.innerWidth) {
      left = r.right - bw - gap;
    }
    // Keep it fully on-screen.
    left = Math.max(gap, Math.min(left, window.innerWidth - bw - gap));
    top = Math.max(gap, Math.min(top, window.innerHeight - bh - gap));
    toolbar.style.top = `${top}px`;
    toolbar.style.left = `${left}px`;
  }

  function showToolbarFor(field) {
    if (!enabled || !isSupportedField(field)) return;
    clearTimeout(hideTimer);
    currentField = field;
    ensureToolbar();
    toolbar.classList.add("vp-visible");
    syncToolbar();
    positionToolbar();
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideToolbar, 250);
  }

  function hideToolbar() {
    if (toolbar) toolbar.classList.remove("vp-visible");
    currentField = null;
  }

  function toggleReveal(field) {
    if (REVEALED.has(field)) {
      field.type = "password";
      REVEALED.delete(field);
    } else {
      field.type = "text";
      REVEALED.add(field);
    }
    syncToolbar();
  }

  async function copyValue(field, btn) {
    try {
      await navigator.clipboard.writeText(field.value || "");
      flashCopied(btn);
    } catch (err) {
      // Clipboard API can fail if the document is not focused; fall back.
      if (legacyCopy(field.value || "")) flashCopied(btn);
    }
  }

  function legacyCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (_) {
      ok = false;
    }
    ta.remove();
    return ok;
  }

  function flashCopied(btn) {
    if (!btn) return;
    btn.classList.add("vp-copied");
    btn.innerHTML = SVG.check;
    setTimeout(() => {
      btn.classList.remove("vp-copied");
      btn.innerHTML = SVG.copy;
    }, 1200);
  }

  // --- Event wiring -------------------------------------------------------

  function onPointerOver(e) {
    const field = e.target.closest && e.target.closest("input, select");
    if (isSupportedField(field)) showToolbarFor(field);
  }

  function onFocusIn(e) {
    if (isSupportedField(e.target)) showToolbarFor(e.target);
  }

  document.addEventListener("pointerover", onPointerOver, true);
  document.addEventListener("focusin", onFocusIn, true);
  document.addEventListener("focusout", (e) => {
    if (e.target === currentField) scheduleHide();
  }, true);

  window.addEventListener("scroll", positionToolbar, true);
  window.addEventListener("resize", positionToolbar);

  // --- Keyboard commands (from background) --------------------------------

  chrome.runtime.onMessage.addListener((msg) => {
    if (!enabled) return;
    const field = document.activeElement;
    if (msg === "copy-focused-password") {
      if (!isSupportedField(field)) return;
      copyValue(field, null);
    } else if (msg === "toggle-focused-password") {
      if (!isPasswordField(field)) return;
      toggleReveal(field);
      if (currentField === field) syncToolbar();
    }
  });

  // --- Global enable/disable state ----------------------------------------

  chrome.storage?.local.get({ enabled: true, copySelectEnabled: true }, (res) => {
    enabled = res.enabled !== false;
    copySelectEnabled = res.copySelectEnabled !== false;
  });
  chrome.storage?.onChanged.addListener((changes) => {
    if (changes.enabled) {
      enabled = changes.enabled.newValue !== false;
      if (!enabled) hideToolbar();
    }
    if (changes.copySelectEnabled) {
      copySelectEnabled = changes.copySelectEnabled.newValue !== false;
      if (!copySelectEnabled && isSelectField(currentField)) hideToolbar();
    }
  });
})();
