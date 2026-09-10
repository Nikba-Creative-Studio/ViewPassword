# ViewPassword Landing Page Design

> A calm, trustworthy product page that makes installation and privacy understandable at a glance.

## 1. Visual Theme & Atmosphere

**Style:** Minimal product utility. **Keywords:** clear, private, compact, native, trustworthy, polished. **Tone:** practical and friendly, never promotional or noisy. **Feel:** a small native settings panel expanded into a landing page.

**Interaction Tier:** L1 refined static. **Dependencies:** CSS only.

## 2. Color Palette & Roles

```css
:root {
  --bg: #ffffff; --surface: #f7f7fa; --surface-alt: #fbfaff; --surface-hover: #f0eef9;
  --border: #e5e5ea; --border-hover: #cfc8eb;
  --text: #1c1c1e; --text-secondary: #6b6b70; --text-tertiary: #8e8e93;
  --accent: #6c4ce0; --accent-hover: #5638c4;
  --bg-rgb: 255, 255, 255; --accent-rgb: 108, 76, 224;
  --success: #248a3d; --error: #d70015; --warning: #b25000;
}
```

All interface colors use variables. Purple is reserved for links and primary actions. Green communicates privacy/success only.

## 3. Typography Rules

**Font stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`; no external font request is made because privacy and native rendering take priority.

| Role | Size | Weight | Line height | Letter spacing |
|---|---:|---:|---:|---:|
| Hero H1 | clamp(30px, 6vw, 46px) | 700 | 1.1 | -0.02em |
| Section H2 | 26px | 700 | 1.25 | -0.01em |
| H3 | 17px | 600 | 1.35 | normal |
| Body | 16px | 400 | 1.6 | normal |
| Label | 13px | 600 | 1.4 | normal |

Headings remain plain: no gradients or text shadows. Never use decorative display or handwritten fonts.

## 4. Component Stylings

Buttons are pill-shaped, purple, and receive hover, active, keyboard-focus, and disabled states. Secondary buttons use a neutral border. Cards use the surface color, a 1px border, 14px radius, and 22–24px padding. Functional features use consistent 24px outline SVG icons; browsers and stores use recognizable flat-color SVG marks. Emoji are not part of the interface. Navigation links use muted text and become purple/underlined on interaction. FAQ items use native `details`/`summary`, visible focus rings, and a rotating disclosure marker.

## 5. Layout Principles

The main container is 960px with 24px side padding. Text-heavy content is capped at 760px. Sections use 56px vertical padding and cards use an 18px gap. The three platform/install cards share one equal-width row on desktop, wrap to two columns on tablet, and stack on mobile.

## 6. Depth & Elevation

Most surfaces are flat. Cards use borders rather than shadows. The product icon alone receives an elevated `0 10px 30px rgba(var(--accent-rgb), .3)` shadow.

## 7. Animation & Interaction

Motion is restrained to 150–200ms color, transform, and disclosure transitions. Buttons rise by 1px on hover and return on active. Focus is always visible. With `prefers-reduced-motion: reduce`, smooth scrolling and transitions are disabled.

## 8. Do's and Don'ts

### Do
- Keep store choices equally discoverable.
- Explain Safari activation at the point of installation.
- Use semantic HTML and native controls.
- Keep privacy language direct and factual.
- Preserve dark-mode contrast.
- Use inline SVG icons so the page has no icon-library network dependency.

### Don't
- ❌ Hide Safari permissions in fine print.
- ❌ Imply that installation alone enables Safari access.
- ❌ Add remote scripts, fonts, analytics, or trackers.
- ❌ Use autoplay, carousels, or scroll-jacking.
- ❌ Use generic download links when official stores exist.
- ❌ Remove keyboard focus indicators.
- ❌ Use color alone to communicate state.
- ❌ Overload the hero with technical setup steps.
- ❌ Use emoji as interface icons or decoration.

## 9. Responsive Behavior

Desktop is above 760px; tablet is 600–760px; mobile is below 600px. Store cards collapse to one column, CTAs become comfortably tappable, and less-critical navigation links may hide. Touch targets are at least 44px. FAQ remains a single readable column with no horizontal overflow.
