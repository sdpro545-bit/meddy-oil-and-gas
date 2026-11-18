# Responsive & State Gap List: Meddy Oil & Gas Limited

This document logs all UI, viewport, and interaction states not explicitly depicted in the static 1200x960 reference image, along with their engineered solutions.

---

## 1. Responsive Viewport Adaptations

| Viewport | Component | Reference State | Engineered Behavior |
|---|---|---|---|
| **Mobile (320px - 480px)** | Header | Desktop bar with inline links | Compact 64px header. Hamburger menu reveals full-screen navy overlay with masked link reveals. Search integrated into menu. |
| **Mobile (320px - 480px)** | Hero | Subject on right, text on left | Full-bleed background with vertical gradient scrim. Face & hard hat positioned in upper right via `object-position: 75% 20%`. H1 scales to 40px, full-width CTA button. Floating stat moves beneath CTA. |
| **Mobile (320px - 480px)** | Capabilities Strip | 5 equal desktop columns | Smooth horizontal touch-snap scroller with subtle side gradient bleed indicating overflow. |
| **Mobile (320px - 480px)** | About Block | 3-zone staggered layout | Stacked single column: Section title & body copy first, followed by Storage Tank (4:3), Checklist, and Engineer Portrait (4:5). Avatar & stat blocks stack neatly. |
| **Tablet (768px - 1023px)**| Layout | Desktop 12-column | 8-column layout. Header retains compact button + drawer icon. About images sit side-by-side below lead text. |
| **Ultra-wide (1920px - 2560px)** | Container | 1200px mockup canvas | Max container pinned to 1320px. Background photography extends full bleed with fixed focal anchor so model is never cropped. |

---

## 2. Interactive States & Component Behavior

### Header
- **Default:** Transparent over hero photo with dark slate tint. White nav typography.
- **Scrolled (> 80px):** Transitions to solid `--ink-900` (`#102A47`) with 1px border. Height compresses from 80px to 72px.
- **Scroll Direction:** Translates upward out of view on scroll down; slides smoothly back down on scroll up.

### Navigation Links
- **Hover:** Brand orange underline draws left-to-right (200ms).
- **Active:** Underline remains solid orange; text color shifts to white/amber.
- **Focus-Visible:** 2px solid `--focus-ring` (`#7CC1D0`) with 2px offset.

### Primary CTA Buttons
- **Default:** Solid Orange (`--brand-orange-500`: `#F69E28`), dark ink text (`#0B1E36`).
- **Hover:** Fill shifts to `--brand-orange-600` (`#E08518`), trailing arrow icon shifts 4px right (160ms).
- **Focus:** 2px teal focus ring with 2px offset.
- **Active:** `scale(0.98)` (100ms).
- **Disabled:** 40% opacity, `cursor: not-allowed`, no hover transformation.

### Service Rows & Cards
- **Desktop List Hover:** Row translates 8px right; subtle image thumbnail preview unmasks on hover; arrow shifts 6px right.
- **Mobile Cards:** Thumbnail image sits above text; tap triggers standard card link.

### Form Fields
- **Default:** 56px height, 1px hairline border (`#EAEFF5`), dark ink text.
- **Focus:** Border switches to brand orange with 2px teal glow.
- **Error:** 1px border in `--danger` (`#B3261E`), inline validation message below field.
- **Submitting:** Button disabled with spinner indicator.
- **Success:** Field set hidden, replaced with clean confirmation message and transaction reference.

---

## 3. Empty & Edge States

1. **Careers (`/careers`):**
   - Condition: No active job postings supplied by client.
   - Display: Dedicated career overview with clear empty state: *"There are currently no open positions. Prospective technical specialists and engineers may submit credentials directly to info@[DOMAIN] for future consideration."*
2. **Projects / Case Studies (`/projects`):**
   - Condition: Client projects pending disclosure clearance.
   - Display: Structured case study shells with clearly demarcated placeholder tags `[CLIENT_CASE_STUDY_PENDING]` in development, collapsed or replaced with service capabilities in production.
3. **Leadership Profiles (`/about`):**
   - Condition: Executive portraits not supplied.
   - Display: Clean corporate overview focusing on organizational structure and field teams; individual name cards suppressed until verified.
4. **404 Not Found Page:**
   - Branded industrial layout featuring oilfield silhouette, clear message, and primary CTA returning visitors to Home.
