# ViewPassword

> Reveal passwords and copy values from password or select fields with one click.

**ViewPassword** is a lightweight Chrome/Edge extension (Manifest V3). A small toolbar appears beside any password field so you can instantly copy or reveal its value.

- 📋 **Copy** — copy the field value to the clipboard
- 👁 **Eye** — show / hide the field value

Everything runs **100% locally**. The extension has **no network access**, and no field value ever leaves your browser.

🛒 **Chrome Web Store:** https://chromewebstore.google.com/detail/aanjmpodookklklpfjpcmboanbmpppea · 🌐 **Website:** https://nikba-creative-studio.github.io/ViewPassword/ · 🔒 **Privacy Policy:** https://nikba-creative-studio.github.io/ViewPassword/privacy.html

---

## Features

- **Copy icon right next to the field** — appears the moment you hover or focus a password input, positioned beside the field so it never covers the text.
- **One-click reveal / hide** — toggle between hidden dots and plain text.
- **Works with auto-filled passwords** — reads the value the browser filled in, not just what you type.
- **Dynamic pages supported** — works on SPA / React logins where fields appear after load.
- **Keyboard shortcuts** — copy or reveal without touching the mouse.
- **Global on/off toggle** — enable or disable from the popup.
- **Copy select values** — copy the selected option's `value`, controlled by a separate popup toggle.
- **Private by design** — no host network permissions; nothing is ever transmitted.

## What it can and cannot do

- ✅ Reveal or copy a password **present in a page's password field** — whether you typed it or the browser auto-filled it.
- ❌ It **cannot** read passwords stored inside Chrome's password manager. Those are encrypted and sandboxed — no extension can access them. ViewPassword only works with the value currently loaded in the page.

## Install

### From the Chrome Web Store (recommended)

Install directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/aanjmpodookklklpfjpcmboanbmpppea).

### Manually (unpacked)

1. Open `chrome://extensions` (or `edge://extensions`).
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select this project folder.
4. The ViewPassword icon appears in the toolbar.

To test it, open [`test/test-page.html`](test/test-page.html) in your browser and hover a password field.

## Usage

- Hover or focus any password field → the **copy** and **eye** icons appear beside it.
- Hover or focus a select field → the **copy** icon appears beside it when the feature is enabled.
- Click **copy** to copy the value (a green ✓ confirms), or the **eye** to reveal / hide it.
- Click the extension icon to open the popup and toggle ViewPassword on or off.

### Keyboard shortcuts

When a supported field is focused (copy also works for enabled select fields):

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
icons/                 App icons (16 / 48 / 128 px)
docs/                  GitHub Pages site (landing page + privacy policy)
test/test-page.html    Local page for manual testing
```

## Development

After editing any file, reload the extension from `chrome://extensions` (click the refresh icon on the ViewPassword card).

To change the icon, replace `icons/icon16.png`, `icons/icon48.png`, and `icons/icon128.png` (and `docs/icon.png` for the website), keeping the same dimensions.

## Security note

ViewPassword can read the value of password fields on any page, so the code is kept minimal and auditable. Review [`src/content.js`](src/content.js) before installing — it is the only file that touches field values, and it never transmits them.

## Links

- **Chrome Web Store:** [ViewPassword](https://chromewebstore.google.com/detail/aanjmpodookklklpfjpcmboanbmpppea)
- **Website:** [nikba-creative-studio.github.io/ViewPassword](https://nikba-creative-studio.github.io/ViewPassword/)
- **Privacy Policy:** [privacy.html](https://nikba-creative-studio.github.io/ViewPassword/privacy.html)
- **Source:** [github.com/Nikba-Creative-Studio/ViewPassword](https://github.com/Nikba-Creative-Studio/ViewPassword)

## Author

**Nikba Creative Studio**
🌐 [www.nikba.com](https://www.nikba.com)

## License

MIT © Nikba Creative Studio
