# ViewPassword

> Reveal and copy the value of any password field with one click — no need to open your browser's password manager.

**ViewPassword** is a lightweight Chrome/Edge extension (Manifest V3). A small toolbar appears beside any password field so you can instantly copy or reveal its value.

- 📋 **Copy** — copy the field value to the clipboard
- 👁 **Eye** — show / hide the field value

Everything runs **100% locally**. The extension has **no network access**, and no field value ever leaves your browser.

---

## Features

- **Copy icon right next to the field** — appears the moment you hover or focus a password input, positioned beside the field so it never covers the text.
- **One-click reveal / hide** — toggle between hidden dots and plain text.
- **Works with auto-filled passwords** — reads the value the browser filled in, not just what you type.
- **Dynamic pages supported** — works on SPA / React logins where fields appear after load.
- **Keyboard shortcuts** — copy or reveal without touching the mouse.
- **Global on/off toggle** — enable or disable from the popup.
- **Private by design** — no host network permissions; nothing is ever transmitted.

## What it can and cannot do

- ✅ Reveal or copy a password **present in a page's password field** — whether you typed it or the browser auto-filled it.
- ❌ It **cannot** read passwords stored inside Chrome's password manager. Those are encrypted and sandboxed — no extension can access them. ViewPassword only works with the value currently loaded in the page.

## Install (unpacked)

1. Open `chrome://extensions` (or `edge://extensions`).
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select this project folder.
4. The ViewPassword eye icon appears in the toolbar.

To test it, open [`test/test-page.html`](test/test-page.html) in your browser and hover a password field.

## Usage

- Hover or focus any password field → the **copy** and **eye** icons appear beside it.
- Click **copy** to copy the value (a green ✓ confirms), or the **eye** to reveal / hide it.
- Click the extension icon to open the popup and toggle ViewPassword on or off.

### Keyboard shortcuts

When a password field is focused:

| Action        | Windows / Linux | macOS         |
| ------------- | --------------- | ------------- |
| Copy value    | `Ctrl+Shift+C`  | `Cmd+Shift+C` |
| Show / hide   | `Ctrl+Shift+Y`  | `Cmd+Shift+Y` |

Shortcuts can be customized at `chrome://extensions/shortcuts`.

## Permissions

| Permission       | Why it is needed                                    |
| ---------------- | --------------------------------------------------- |
| `clipboardWrite` | Copy the field value to the clipboard.              |
| `storage`        | Remember the enabled / disabled toggle.             |
| `activeTab`      | Relay a keyboard shortcut to the current tab.       |
| `<all_urls>`     | Attach the toolbar to password fields on any site.  |

There are **no** network permissions — the extension cannot send data anywhere.

## Project structure

```
manifest.json          Extension manifest (MV3)
src/content.js         Toolbar UI + reveal/copy logic (injected into pages)
src/content.css        Toolbar styles
src/background.js       Service worker: relays keyboard shortcuts
popup/                 Toolbar popup (on/off toggle + help)
icons/                 App icons (+ make_icons.py generator)
test/test-page.html    Local page for manual testing
```

## Development

Regenerate the icons (pure Python, no dependencies):

```bash
python3 icons/make_icons.py
```

After editing any file, reload the extension from `chrome://extensions` (click the refresh icon on the ViewPassword card).

## Security note

ViewPassword can read the value of password fields on any page, so the code is kept minimal and auditable. Review [`src/content.js`](src/content.js) before installing — it is the only file that touches field values, and it never transmits them.

## Author

**Nikba Creative Studio**
🌐 [www.nikba.com](https://www.nikba.com)

## License

MIT © Nikba Creative Studio
