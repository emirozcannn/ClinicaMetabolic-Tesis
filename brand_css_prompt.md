# Copilot'a Yapıştırılacak Prompt — Brand & CSS Refresh: ClinicaMetabolic

> Mevcut Next.js projesinde çalıştır. Yapıyı / component hiyerarşisini DEĞİŞTİRME.
> Sadece görsel katmanı (CSS, tokens, küçük JSX eklemeleri) yükselt.

---

## PROMPT BAŞLANGICI — BURADAN KES KOPYALA

```
You are a senior UI/brand designer turned developer.
Refine the visual design of the ClinicaMetabolic Next.js app.

DO NOT change:
- Component structure or file hierarchy
- Any logic, state, hooks, or API calls
- Routing or page layout order
- Any text content

ONLY change:
- Tailwind classes (colors, spacing, typography, shadows, borders, radius)
- globals.css (CSS variables, base styles, custom utilities)
- Minor JSX additions for decorative elements (dividers, dot grids, labels)
- Font imports in layout.tsx

---

## BRAND IDENTITY: "Clinical Precision"

### Concept
ClinicaMetabolic should feel like a premium clinical SaaS tool — the kind
a hospital CIO would approve and a clinician would trust at 6am.
NOT a student project. NOT a generic dashboard.

The feeling: confident, scientific, readable under fluorescent light,
trustworthy enough to inform a clinical decision.

References: Vercel's dark precision × Linear's typographic clarity ×
a WHO publication's scientific credibility.

---

## COLOR SYSTEM

Replace ALL colors with these CSS variables. Add to globals.css:

```css
:root {
  /* Brand Core */
  --brand-900: #0a2e25;   /* darkest — nav bg, headings */
  --brand-800: #0d3d30;   /* primary buttons */
  --brand-700: #0f4d3a;   /* hover states */
  --brand-600: #146b50;   /* active links */
  --brand-500: #1a8a66;   /* icons, accents */
  --brand-400: #22a67d;   /* chart accent, highlights */
  --brand-100: #e8f5f0;   /* light bg tint */
  --brand-50:  #f3fbf8;   /* page background */

  /* Neutral */
  --neutral-950: #0c0f0e;
  --neutral-900: #111614;
  --neutral-800: #1c2320;
  --neutral-600: #4a5552;
  --neutral-400: #8a9491;
  --neutral-200: #d4dbd8;
  --neutral-100: #edf1f0;
  --neutral-50:  #f7f9f8;

  /* Accent — Amber gold for risk "high" and CTAs */
  --accent-500: #d97706;
  --accent-400: #f59e0b;
  --accent-100: #fef3c7;

  /* Risk semantic colors */
  --risk-low:      #16a34a;  /* green-600 */
  --risk-moderate: #d97706;  /* amber-600 */
  --risk-high:     #dc2626;  /* red-600 */

  /* Surface */
  --surface-card:   #ffffff;
  --surface-inset:  #f3fbf8;
  --border-subtle:  #dce8e4;
  --border-strong:  #b8cec8;

  /* Typography */
  --text-primary:   #0a2e25;
  --text-secondary: #4a5552;
  --text-muted:     #8a9491;
}
```

---

## TYPOGRAPHY

In app/layout.tsx, import these Google Fonts:

```typescript
import { DM_Sans, DM_Mono } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

// Apply both variables to <body>:
// className={`${dmSans.variable} ${dmMono.variable} font-sans`}
```

In globals.css add:
```css
body {
  font-family: var(--font-sans), system-ui, sans-serif;
  color: var(--text-primary);
  background: var(--brand-50);
  -webkit-font-smoothing: antialiased;
}

/* Metric / data numbers — use mono */
.metric, .stat, .probability-value, .accuracy-value {
  font-family: var(--font-mono), monospace;
  font-feature-settings: "tnum";
}
```

---

## NAVBAR

Current: plain white bar with nav links.
New treatment:

```
Background: var(--brand-900)  — deep dark teal
Logo text: white, font-weight 600, letter-spacing: 0.04em
Nav links: text-white/70, hover: text-white, transition 150ms
Active link: white, border-bottom: 2px solid var(--brand-400)
CTA button (if present): bg brand-400, text white, rounded-full px-4 py-1.5
Border-bottom: 1px solid rgba(255,255,255,0.08)
```

Logo icon (+): keep the icon, change bg to brand-400, text white.

---

## HOME PAGE (app/page.tsx)

### Hero Card
Current: white card with left-aligned content.
New treatment:

```
Background: linear-gradient(135deg, var(--brand-900) 0%, #0f4d3a 60%, #1a6b50 100%)
Text color: white
"CLINICAL DECISION SUPPORT" label:
  - font: DM Mono, 11px, letter-spacing 0.12em
  - color: var(--brand-400)
  - text-transform: uppercase

"ClinicaMetabolic" heading:
  - font-size: clamp(2.5rem, 5vw, 4rem)
  - font-weight: 300 (light weight for elegance)
  - color: white

Subtitle text: text-white/70, font-weight 400

CTA Button "Start Classification →":
  - background: var(--brand-400)
  - color: var(--brand-900)
  - font-weight: 600
  - border-radius: 6px
  - padding: 12px 28px
  - hover: bg var(--brand-500), transform: translateY(-1px)
  - transition: all 200ms ease
  - NO box-shadow — keep it flat and clean

Add a subtle decorative grid pattern to hero card background:
```css
.hero-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 24px 24px;
  border-radius: inherit;
  pointer-events: none;
}
```
```

### Feature Cards (6 Phenotypes / 92.56% / Clinician-First)
Current: flat white cards.
New treatment:

```
background: var(--surface-card)
border: 1px solid var(--border-subtle)
border-radius: 10px
padding: 24px
box-shadow: 0 1px 3px rgba(10,46,37,0.06), 0 4px 12px rgba(10,46,37,0.04)

Heading (card title): var(--brand-800), font-weight 600, font-size 1rem
Body text: var(--text-secondary), font-size 0.875rem, line-height 1.6

On hover:
  border-color: var(--brand-400)
  box-shadow: 0 4px 20px rgba(26,138,102,0.12)
  transition: all 200ms ease
```

Stat card (92.56% Accuracy) — make the number pop:
```
"92.56%" → font-family: var(--font-mono), font-size: 1.75rem,
color: var(--brand-600), font-weight: 500
```

### Page Background
```css
body, main {
  background: var(--brand-50);
}
/* Subtle top gradient */
.page-hero-bg {
  background: linear-gradient(180deg, var(--brand-100) 0%, var(--brand-50) 200px);
}
```

---

## PATIENT FORM (components/PatientForm.tsx)

### Form Container
```
background: white
border: 1px solid var(--border-subtle)
border-radius: 12px
box-shadow: 0 2px 8px rgba(10,46,37,0.06)
padding: 32px 40px
max-width: 680px
margin: 0 auto
```

### Step Progress Bar
```
Track: var(--neutral-200), height: 3px, border-radius: 2px
Fill: var(--brand-500), transition: width 400ms ease
Step dots: filled = brand-800, current = brand-500 with pulse ring, future = neutral-200
```

### Form Labels
```
font-size: 0.8125rem (13px)
font-weight: 500
color: var(--text-secondary)
letter-spacing: 0.02em
text-transform: uppercase  ← clinical chart style
margin-bottom: 6px
```

### Inputs
```
border: 1px solid var(--border-subtle)
border-radius: 6px
padding: 10px 14px
font-size: 0.9375rem
color: var(--text-primary)
background: white

Focus:
  border-color: var(--brand-500)
  box-shadow: 0 0 0 3px rgba(26,138,102,0.12)
  outline: none

Unit badge (e.g. "cm", "mg/dL"):
  position: absolute right-side inside input
  font-family: var(--font-mono)
  font-size: 0.75rem
  color: var(--text-muted)
  background: var(--neutral-100)
  padding: 2px 8px
  border-left: 1px solid var(--border-subtle)
  border-radius: 0 6px 6px 0
```

---

## RESULT CARD (components/ResultCard.tsx)

### Main Classification Result
The predicted class label should be the hero of this page.

```
Predicted label (e.g. "MHO"):
  font-family: var(--font-mono)
  font-size: clamp(3rem, 8vw, 5rem)
  font-weight: 500
  letter-spacing: -0.02em
  color: var(--brand-800)

Full name (e.g. "Metabolically Healthy Obese"):
  font-size: 1.125rem
  color: var(--text-secondary)
  font-weight: 400
  margin-top: 4px

Card border-left: 4px solid [risk color]
  low → var(--risk-low)
  moderate → var(--risk-moderate)
  high → var(--risk-high)
```

### Risk Badge
```
low:      bg #dcfce7, text #15803d, border #86efac
moderate: bg #fef9c3, text #a16207, border #fde047
high:     bg #fee2e2, text #b91c1c, border #fca5a5

font-family: var(--font-mono)
font-size: 0.6875rem
letter-spacing: 0.08em
text-transform: uppercase
padding: 3px 10px
border-radius: 100px
border-width: 1px
```

### Probability Chart
```
Bars: predicted class → var(--brand-500)
      others          → var(--neutral-200)
Value labels: font-family mono, color text-secondary
```

### Derived Metrics strip
```
Background: var(--surface-inset)
Border-top/bottom: 1px solid var(--border-subtle)
Padding: 16px 0
Layout: flex row, gap: 32px
Each metric:
  Label: 11px mono uppercase muted
  Value: 18px mono brand-700 font-500
```

---

## PHENOTYPE CARDS (components/PhenotypeCard.tsx)

### Card
```
border-radius: 10px
border: 1px solid var(--border-subtle)
overflow: hidden

Top accent bar (8px tall):
  low → var(--risk-low)
  moderate → var(--risk-moderate)
  high → var(--risk-high)

Code label (MHNW, MUO etc.):
  font-family: var(--font-mono)
  font-size: 1.25rem
  font-weight: 500
  color: var(--brand-800)

Prevalence bar:
  height: 4px
  background: var(--neutral-200)
  fill: var(--brand-400)
  border-radius: 2px
```

---

## INSIGHTS PAGE (app/insights/page.tsx)

### Summary stat cards
```
4-column grid
Each card:
  Large number: var(--font-mono), 2.5rem, var(--brand-700)
  Label: 11px, uppercase, mono, muted
  Card: white, border subtle, shadow-sm
  border-top: 3px solid var(--brand-500)
```

---

## GLOBAL UTILITIES — add to globals.css

```css
/* Section divider */
.section-label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brand-500);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-subtle);
}

/* Subtle hover lift */
.card-hover {
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(10,46,37,0.10);
}

/* Clinical mono values */
.clinical-value {
  font-family: var(--font-mono);
  font-feature-settings: "tnum";
  letter-spacing: -0.01em;
}

/* Micro badge */
.badge-clinical {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 100px;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid currentColor;
}

/* Scrollbar — clinical clean */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--brand-50); }
::-webkit-scrollbar-thumb { background: var(--brand-200, #b8cec8); border-radius: 3px; }
```

---

## FOOTER

```
background: var(--brand-900)
color: rgba(255,255,255,0.45)
font-family: var(--font-mono)
font-size: 0.75rem
letter-spacing: 0.04em
padding: 24px 0
text-align: center
border-top: 1px solid rgba(255,255,255,0.06)
```

---

## WHAT TO DO, IN ORDER

1. Open globals.css → replace :root block with the full CSS variables above
2. Open app/layout.tsx → swap font import to DM_Sans + DM_Mono, apply variables to body
3. Open components/Navbar.tsx → apply dark bg + new link styles
4. Open app/page.tsx → apply hero gradient + card styles
5. Open components/PatientForm.tsx → apply input styles + label uppercase treatment
6. Open components/ResultCard.tsx → apply large mono label + colored left border + risk badge
7. Open components/PhenotypeCard.tsx → apply top accent bar + mono code label
8. Open app/insights/page.tsx → apply stat card treatment
9. Add all global utilities to globals.css

After each file: save and check localhost:3000 visually.
Do NOT run npm run build until all files are done.
```

## PROMPT SONU — BURAYA KADAR KES KOPYALA

---

## Brand Özeti

| Element | Karar |
|---------|-------|
| Font display | DM Sans (Light 300 for heroes) |
| Font data/mono | DM Mono |
| Primary color | `#0a2e25` — derin orman yeşili |
| Accent | `#22a67d` — teal-mint |
| Risk high | Amber gold `#d97706` |
| Card style | Subtle border + minimal shadow |
| Hero | Dark gradient + dot grid texture |
| Navbar | Tam koyu, brand-900 bg |
| Numbers/stats | Monospace, tnum feature |
| Labels | Küçük mono uppercase — klinik grafik hissi |
