# Design Brief: Visual Lens — Expanded Feature System

**Purpose**: Premium visual recognition app combining image capture, AI analysis, mode-driven insights, collections, history, comparison, and export. All interfaces prioritize image clarity, rapid scanning, and result accessibility.

**Tone & Aesthetic**: Technical precision with playful mode distinction. Dark-by-default, glass-morphic cards, mode-specific accent colors. Minimal chrome; maximum information density.

**Differentiation**: Nine distinct analysis modes (Plant, Food, Book, Translation, Art, Receipt, Medical, Car) each with unique accent color. Comparison view shows side-by-side scans. Collections group results by topic. Shared scans are read-only, preview-first.

---

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Background | `0.98 0 0` | `0.10 0.005 240` | Page background |
| Card | `0.95 0 0` | `0.14 0.008 240` | Result cards, containers |
| Foreground | `0.1 0 0` | `0.93 0 0` | Primary text |
| Muted | `0.88 0 0` | `0.20 0.006 240` | Secondary text, dividers |
| Primary (Cyan) | `0.65 0.15 195` | `0.72 0.16 195` | Buttons, accents, primary UI |
| Secondary (Amber) | `0.65 0.15 80` | `0.78 0.16 80` | Highlights, detected objects |
| Success (Green) | `0.65 0.15 140` | `0.68 0.18 140` | Plant ID, positive states |
| Warning (Orange) | `0.65 0.15 30` | `0.72 0.16 30` | Food, caution, progress |
| Info (Blue) | `0.65 0.15 270` | `0.65 0.16 270` | Translation, car, info states |
| Destructive | `0.55 0.22 25` | `0.62 0.20 10` | Delete, clear, error actions |
| Accent (Medical Red) | `0.62 0.20 10` | `0.62 0.20 10` | Medical reference, critical |

---

## Mode-Specific Accent Colors

| Mode | Hue | Usage |
|------|-----|-------|
| Generic | 195 (Cyan) | Default, product, generic |
| Plant ID | 140 (Green) | Botanical, nature identification |
| Food Scanner | 30 (Orange) | Nutrition, culinary, food analysis |
| Book/Product | 270 (Purple) | Commerce, literature, lookups |
| Translation | 50 (Gold) | Language, text, communication |
| Art/Landmark | 320 (Magenta) | Cultural, historical, visual art |
| Receipt Parser | 240 (Blue) | Documents, financial, structured data |
| Medical Reference | 10 (Red) | Health, medical, caution states |
| Car/Fashion | 170 (Teal) | Vehicles, fashion, style matching |

---

## Typography

| Layer | Font | Scale | Usage |
|-------|------|-------|-------|
| Display | Bricolage Grotesque | 28–48px | Page title, mode selector, section heads |
| Body | General Sans | 14–16px | Copy, result text, labels, history items |
| Mono | Geist Mono | 12–13px | Timestamps, URLs, code, percentages |

**Line Height**: 1.6 (body), 1.2 (headings). **Letter Spacing**: 0 (default), +0.01em (headings).

---

## Component Patterns

| Component | Structure | Utility |
|-----------|-----------|---------|
| Mode Badge | Icon + label, pill shape, 8px padding | `.mode-badge`, `.mode-badge-{mode}` |
| Collection Card | Thumbnail + title overlay, 6px radius | `.collection-card`, `.collection-card-overlay` |
| Filter Chip | Active/inactive state, rounded-full | `.filter-chip`, `.filter-chip.active` |
| History Item | Thumbnail (48×48) + title + timestamp | `.history-item`, `.history-item-*` |
| Comparison Panel | Two-column grid, 50% width each | `.comparison-layout`, `.comparison-panel` |
| Progress Bar | Track + fill, 8px height, rounded | `.progress-track`, `.progress-fill` |
| Shared Badge | Icon + "Shared" label, read-only indicator | `.shared-badge` |

---

## Structural Zones

| Zone | Background | Border | Interaction |
|------|------------|--------|-------------|
| Header | `bg-background` | `border-b` | Mode selector, title, settings |
| Mode Selector | `bg-card` | `border` | 9 badges in row, mode-specific colors |
| Image Area | `bg-muted/10` | `border` | Centered image preview, scan-pulse when loading |
| Results Grid | `bg-background` | None | 2–3 columns on desktop, stacked on mobile |
| Collection Grid | `bg-background` | None | 3–4 columns on desktop, thumbnail cards |
| History Sidebar | `bg-background` | `border-r` | Scrollable list, 4 filter chips above |
| Comparison View | `bg-background` | `border-t` | Two panels, 50/50 split, divider line |
| Export Progress | `bg-card` | `border` | Progress bar + percentage label, centered modal |
| Shared Scan | `bg-card` | `border` | Full width max-w-2xl, centered, read-only |

---

## Spacing & Rhythm

**Vertical**: 8px base unit. Sections 24px gap, cards 16px padding, dense lists 8px. **Horizontal**: 16px container (mobile), 32px (desktop). **Density**: Collections/history compact (high info density), results generous (white space around cards).

---

## Motion & Interaction

- **Transition Default**: `transition-smooth` (0.3s cubic-bezier) on all interactive elements
- **Entrance**: `animate-slide-up` for results, staggered 0.05–0.25s
- **Loading State**: `scan-pulse` on image area (0.3→1.0 opacity, 2s cycle)
- **Mode Active**: Border glow to mode-specific color, background darkens slightly
- **Hover**: Subtle shadow/background lift on cards, opacity 0.85→1.0
- **Badge Pulse**: Optional subtle glow on newly active mode badges

---

## Constraints & Rules

- Dark mode only — no light mode toggle
- Max 3 colors per section (mode accent + primary + muted)
- No full-page gradients, only glass-card blur effect
- Image preview always visible above results on all views
- Comparison panels always equal width, divider visible on desktop
- Filter chips wrap on mobile, single row on desktop
- Mode badges horizontal scroll on mobile (if >5 modes)
- Collection cards maintain 2:3 aspect ratio (thumbnail)
- History items truncate title after 1 line
- PDF export shows progress, file size, time estimate
- Shared scans are read-only (no edit buttons)

---

## Signature Details

**1. Mode-Specific Border Glow**: Active mode badge border matches mode accent color, subtle glow on hover. **2. Collection Thumbnail Overlay**: Gradient dark overlay with white title text ensures legibility. **3. Comparison Divider**: Thin border line at 50% viewport, visible cursor drag affordance. **4. Filter Chip Active State**: Cyan border + darker background, icon color matches. **5. Progress Fill Animation**: Smooth width transition (0.6s) with color constancy.
