# Chrome Web Store — Listing Content

Copy-paste ready content for publishing **ViewPassword** on the
[Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

---

## Product name
_(max 45 characters)_

```
ViewPassword — Reveal & Copy Passwords
```

## Summary / Short description
_(max 132 characters — shown in search results)_

```
Reveal and copy any password field with one click. 100% local, no data ever leaves your browser. By Nikba Creative Studio.
```

## Category

```
Productivity
```

## Language

```
English
```

---

## Detailed description
_(max 16,000 characters — shown on the listing page)_

```
ViewPassword adds a small toolbar next to any password field so you can instantly REVEAL or COPY its value — without opening your browser's password manager or retyping anything.

Tired of digging through settings just to check or copy a password you've already entered? Hover or focus a password field and ViewPassword's copy and reveal icons appear right beside it. One click and you're done.

━━━━━━━━━━━━━━━━━━━━
WHAT IT DOES
━━━━━━━━━━━━━━━━━━━━
• Copy — copy a password field's value straight to your clipboard, with a clear confirmation.
• Reveal — toggle a password between hidden dots and plain text.
• Beside the field — the toolbar appears next to the input, never covering the text.
• Works with auto-filled passwords — reads the value the browser filled in, not only what you type.
• Works on modern sites — supports single-page apps and login forms that load fields dynamically.
• Keyboard shortcuts — copy or reveal the focused field without touching the mouse.
• On/off switch — enable or disable ViewPassword anytime from the popup.

━━━━━━━━━━━━━━━━━━━━
PRIVATE BY DESIGN
━━━━━━━━━━━━━━━━━━━━
ViewPassword runs 100% locally in your browser. It has NO network access, collects NO data, and sends NOTHING anywhere. Your passwords never leave your device. The extension does not use analytics, tracking, or remote servers of any kind.

━━━━━━━━━━━━━━━━━━━━
KEYBOARD SHORTCUTS
━━━━━━━━━━━━━━━━━━━━
When a password field is focused:
• Copy value:  Ctrl+Shift+C  (Cmd+Shift+C on Mac)
• Show / hide: Ctrl+Shift+Y  (Cmd+Shift+Y on Mac)

You can customize these at chrome://extensions/shortcuts

━━━━━━━━━━━━━━━━━━━━
GOOD TO KNOW
━━━━━━━━━━━━━━━━━━━━
ViewPassword works with the password currently loaded in a page's field — whether you typed it or the browser auto-filled it. For your security, it cannot access passwords stored inside Chrome's encrypted password manager; no extension is able to read those.

━━━━━━━━━━━━━━━━━━━━
OPEN & AUDITABLE
━━━━━━━━━━━━━━━━━━━━
The extension is intentionally minimal so the code stays easy to review. It requests only the permissions it needs to place a button on password fields and copy to your clipboard.

Made by Nikba Creative Studio — www.nikba.com
```

---

## Single purpose description
_(Required in the "Privacy practices" tab)_

```
ViewPassword has a single purpose: to let the user reveal (show/hide) and copy the value of password input fields on web pages via an on-page toolbar and keyboard shortcuts.
```

## Permission justifications
_(Required in the "Privacy practices" tab — one per requested permission)_

**clipboardWrite**
```
Used to copy the value of a password field to the user's clipboard when they click the copy button or press the copy shortcut. This is the extension's core feature.
```

**storage**
```
Used to save a single local preference: whether the extension is enabled or disabled. No personal data is stored.
```

**activeTab**
```
Used to deliver a keyboard-shortcut command to the currently active tab so the reveal/copy action runs on the page the user is viewing.
```

**Host permission (`<all_urls>`) justification**
```
The extension must run a content script on any website the user visits so it can detect password fields and attach the reveal/copy toolbar to them. It reads a password field's value only when the user explicitly clicks copy/reveal or presses a shortcut, and the value is used solely for the clipboard or on-screen toggle. No page content is transmitted or stored.
```

## Data usage disclosures
_(Checkboxes in the "Privacy practices" tab)_

- Does your extension collect or use user data? **No.**
- Confirm the certifications:
  - ✅ I do not sell or transfer user data to third parties, outside of the approved use cases.
  - ✅ I do not use or transfer user data for purposes that are unrelated to my item's single purpose.
  - ✅ I do not use or transfer user data to determine creditworthiness or for lending purposes.

Privacy policy URL (if required by the dashboard):
```
https://www.nikba.com/privacy
```
> Note: publish a privacy policy page at this URL (or point to an existing one). It should state that ViewPassword collects and transmits no data.

---

## Store assets checklist

Chrome requires these images before you can publish:

| Asset                | Size (px)      | Required | Notes                                  |
| -------------------- | -------------- | -------- | -------------------------------------- |
| Store icon           | 128 × 128      | Yes      | Use `icons/icon128.png`.               |
| Screenshot(s)        | 1280 × 800 or 640 × 400 | Yes (≥1) | Up to 5. Show the toolbar on a login form. |
| Small promo tile     | 440 × 280      | Optional | For featuring on the store.            |
| Marquee promo tile   | 1400 × 560     | Optional | For featuring on the store.            |

Suggested screenshot ideas:
1. The copy/reveal toolbar beside a password field on a login form.
2. A revealed password (dots → plain text) with the green "copied" checkmark.
3. The popup showing the on/off toggle and keyboard shortcuts.

---

## Support / contact

- Website: https://www.nikba.com
- Developer: Nikba Creative Studio
```
```

## Version notes (for the first submission)

```
1.0.0 — Initial release. Reveal and copy password fields via an on-page toolbar and keyboard shortcuts. Fully local, no data collection.
```
