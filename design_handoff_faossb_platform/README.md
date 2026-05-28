# Handoff: FAOSSB Practice Platform

## Overview

This is a handoff package for **FAOSSB — the SSB Interview practice platform for Future Army Officers Academy (faossb.com)**. The platform helps defence aspirants (NDA / CDS / TES / SSC / AFCAT candidates) practice all 14 stages of the SSB Interview process with AI-powered, brutally honest feedback — replicating real SSB conditions, time limits, formats, and evaluation criteria.

The accompanying HTML prototype demonstrates the full desktop product surface — 14 screens covering authentication-to-dashboard-to-every-practice-module, the universal coach-feedback report, progress analytics, the multi-step PIQ form, and the fitness tracker.

## About the Design Files

The files in this bundle are **design references created in HTML** — prototypes that show intended look, behavior, layout, copy, and interaction patterns. They are NOT production code to copy directly.

Your task is to **recreate these HTML designs in the target codebase's environment**, using its established patterns and libraries.

The PRD (`PRD.md` — paste from the original product spec, included separately) is the source of truth for product behavior, AI prompts, evaluation rules, and backend schema. This README documents the visual/interaction layer the HTML prototype defines.

### Recommended target stack (from PRD § 10)

| Layer | Choice | Why |
|---|---|---|
| Frontend | **Next.js 14 (App Router) + React 18 + TypeScript** | Aligns with PRD spec; SSR for the dashboard; easy Firebase + Vercel hosting |
| UI library | **Tailwind CSS + shadcn/ui** | Maps cleanly to the design tokens in this prototype |
| Backend | **Firebase Auth + Firestore + Rowy admin** | Per PRD § 3, § 13 — Rowy is the admin CRUD layer Col Sharma's team uses |
| AI | **Anthropic Claude API (`claude-sonnet-4-20250514`)** | Per PRD § 11 — system prompts already drafted in the PRD |
| STT | **Web Speech API (browser) → fallback to Whisper API** | For Lecturette, Interview, GD audio modes |
| TTS | **Browser SpeechSynthesis → fallback to ElevenLabs** | For IO question voice in Interview module |
| WhatsApp OTP | **User's existing BSP** (Gupshup / Wati) | Template already exists per PRD § 3 |
| Image bank | **Curated bank in Firebase Storage → Stable Diffusion / DALL-E fallback** | For TAT / PPDT pictures |
| Hosting | **Vercel** (frontend) + **Firebase** (backend, storage) | |

## Fidelity

This is a **high-fidelity (hi-fi) prototype**. All colors, spacing, typography, component patterns, and copy are final design intent — implement pixel-accurate (within Tailwind's spacing scale tolerance).

The only abstractions are:
- TAT / PPDT picture slots are placeholders — your image bank fills them in
- Col Sharma video posters are placeholders — your video CMS fills them in
- Sample user is "Cadet Aarav Mehra" (Jaisalmer, NDA entry, Class 12 dip, guitar hobby) — all PIQ-driven content uses this persona for demonstration

The design covers **desktop only**. A mobile companion is a separate exploration the PRD calls out (80% of users will be on phones — mobile-first responsive port is Phase 1.5).

---

## Design System / Tokens

### Colors

```css
/* Brand */
--olive:           #4A5D23;   /* Primary — headers, CTAs, badges */
--olive-dark:      #3B4A1C;   /* Hover, active */
--olive-darker:    #2A3614;   /* Deep accents */
--olive-tint:      #6B7E45;
--olive-soft:      #E8E6D9;   /* Warm olive-tinted card surface */
--olive-line:      #C7C5B0;   /* Card borders (1px) */
--olive-line-strong: #9CA084;

--gold:            #C5A55A;   /* Achievements, hard-rule callouts, primary CTA on dark olive */
--gold-soft:       #E8D9B4;
--gold-line:       #B8995A;

/* Surfaces */
--paper:           #F5F3EE;   /* Page background — warm off-white, "military-paper" */
--paper-soft:      #EFEDE6;   /* Card-paper variant */

/* Ink (text) */
--ink:             #1A1A1A;   /* Primary text */
--ink-2:           #3A3A36;   /* Secondary text */
--ink-3:           #5A5A56;   /* Muted */
--ink-4:           #8A8A82;   /* Muted-strong */
--ink-5:           #B8B6AC;   /* Disabled */

/* Semantic */
--success:         #2E7D32;
--warning:         #F57F17;
--danger:          #C62828;
```

### Typography

- **Body / Display**: Inter (Google Fonts, weights 400 / 500 / 600 / 700)
- **Monospace**: JetBrains Mono (weights 400 / 500 / 600) — used for timers, IDs, eyebrows, scores, breadcrumbs, section numbers, table headers
- **Display sizes used**:
  - Page H1 — 28px / 700 / -0.02em tracking
  - Card H — 16px / 600
  - Eyebrows — 10.5px mono, 0.12em letter-spacing, uppercase
  - Body — 13–14px / 400-500 / line-height 1.45–1.65
  - Stimulus word (WAT) — 86px / 700 / -0.025em
  - Timer display — 22–32px JetBrains Mono / 500 / tabular-nums

### Spacing & layout

- Sidebar width: **232px** (fixed, dark `#1A1A1A`, sticky)
- Topbar height: **60px** (regular), 52px (compact), 68px (comfy) — Tweaks-controlled
- Page padding: **28px**
- Card padding: **14–22px** depending on density
- Card border-radius: **4px** (`--radius`); large: 8px (`--radius-lg`)
- Card border: `1px solid var(--olive-line)`
- Card shadow: `0 1px 0 rgba(58,58,54,0.04), 0 2px 6px rgba(58,58,54,0.04)`

### Visual rhythm rules

- **Briefing-document feel**: every major section has a numbered prefix (e.g. `00 · Today's Operations Brief`, `A.01 · Questions You Should Be Prepared For`, `D.02 · Story timer`). These letter-and-digit codes are not arbitrary — they create the military-document hierarchy. Preserve them.
- **Eyebrows**: short ALL CAPS mono labels in olive, sitting above every card title.
- **3-D pillar tagging**: every test card and feedback report shows which of Manasa (Thought), Karma (Action), Vacha (Speech) it lives in. Use the olive-soft chips.
- **Progress strips**: tests show ProgressDots — N tiny rectangles, completed = olive, current = gold, future = paper.
- **No emoji** in the brand surface (`✓` and `✗` glyphs inside score-pills are OK; emoji-bell is OK in the topbar). Avoid decorative emoji.

### Component primitives the prototype uses

| Class / component | Purpose |
|---|---|
| `.card` | White card, olive 1px border, light shadow |
| `.card-paper` | Paper-soft variant (slightly recessed) |
| `.card-olive` | Solid olive card with white text — for hero CTAs (Today's Mission, Test Brief overview band) |
| `.btn-primary` | Olive button, white text |
| `.btn-gold` | Gold button, olive-darker text — for "Begin Test" CTAs |
| `.btn-ghost` | Transparent, olive-line border |
| `.btn-mono` | Modifier: mono font, uppercase, tracked spacing |
| `.chip` | Small mono pill with olive-line border |
| `.chip-olive` / `.chip-gold` / `.chip-warn` / `.chip-dgr` / `.chip-ok` | Color variants |
| `.olq` / `.olq-good` / `.olq-miss` | OLQ tag pill (used in feedback reports) |
| `.stamp` | Outlined uppercase mono label — "Priority · 01" style |
| `.eyebrow` | 10.5px mono uppercase olive label |
| `.timer-display` | JetBrains Mono tabular-nums for any countdown |
| `.bar` | Thin progress bar, olive fill |
| `.section-no` | Mono olive section-number prefix |
| `.divider-rule` | Hairline with centered mono caption |

---

## Information Architecture

### Top-level navigation (sidebar)

| Code | Module | Pillar | Route |
|---|---|---|---|
| 00 | Dashboard | Command | `/` |
| 01 | Daily Briefing | Command | `/briefing` |
| 02 | My Progress | Command | `/progress` |
| 03 | TAT | Manasa | `/practice/tat` |
| 04 | WAT | Manasa | `/practice/wat` |
| 05 | SRT | Manasa | `/practice/srt` |
| 06 | Self Description | Manasa | `/practice/sd` |
| 07 | PPDT | Manasa + Vacha | `/practice/ppdt` |
| 08 | Group Discussion | Karma + Vacha | `/practice/gd` |
| 09 | Lecturette | Karma + Vacha | `/practice/lecturette` |
| 10 | GPE | Karma | `/practice/gpe` |
| 11 | Personal Interview | Vacha | `/practice/interview` |
| 12 | OIR Screening | Screening | `/practice/oir` |
| 13 | PIQ Form | Profile | `/profile/piq` |
| 14 | Fitness Tracker | Profile | `/profile/fitness` |

### Auth + onboarding (designed in PRD § 3-4, NOT in this prototype — see "What's not designed yet" below)

Order: `/login` → WhatsApp OTP entry → PIQ form wizard (5 steps) → `/` (dashboard).

---

## Screens

For every screen, the file `index.html` is the live mock. Open it locally and you can click any sidebar item or use the Tweaks panel's "Jump to" grid.

### 00 · Dashboard (`Dashboard` component, `screens-core.jsx`)

**Purpose**: First view after login. Surfaces today's recommended practice, the PIQ-driven "Questions You Should Be Prepared For" (hero), OLQ trendlines, current affairs briefing, fitness snapshot, recent activity, quick-practice tiles.

**Layout**:
- 12-column max-width 1400px page with 28px padding
- Page head: 02-line briefing-style with eyebrow, big H1, right-aligned `Streak · 17`, `Sessions · 148`, `D-Day SSB 42` meta
- Row 1: **Today's Mission** (1.45fr) + **OLQ Trendline** (1fr)
- Hero row: "Questions You Should Be Prepared For" — 3×2 grid of category cards (6 cards)
- Row 3: **Daily Briefing** (1.45fr) + **Fitness Snapshot** (1fr)
- Row 4: **OLQ × 3-D Consistency** (1fr) + **Recent Sessions** (1.2fr)
- Row 5: **Quick Practice** — 4 ModuleCards

**Key components**:

1. **Today's Mission** card — olive solid card with gold accent. Headline ("Close the gap on SRT initiative"), body ("Your last 3 SRT sets show a passive pattern…"), 3 numbered mission steps, gold CTA "Begin mission".

2. **Questions You Should Be Prepared For** (the marquee) — 6 cards, each with:
   - Eyebrow: category (e.g. "Native State", "Hobby · Guitar", "Education · Class 12 dip")
   - Source line: PIQ provenance
   - 3-4 numbered prompts (realistic, specific)
   - Stamp chip: "Hot · 04 likely" / "Depth check" / "Vulnerability" / "Refreshed today" / "Standard"
   - CTA: "Drill"
   - **Logic for generating these** is in PRD § 5 — based on PIQ state, hobbies, education marks, entry type, family background.

3. **OLQ × 3-D Consistency table** — 8 OLQs × 3 pillars (Manasa / Karma / Vacha), each cell shows a colored dot (good / miss / neutral). Below, a flagged-inconsistency callout in red.

4. **Recent Sessions** — Last 7 days, rows with module code, title, tag chips (e.g. "delegation pattern ×9"), date, score (color-coded ≥7 olive, <7 warning).

---

### Test Briefing screen (universal, used by 10 tests)

**Purpose**: Every timed test (TAT, WAT, SRT, SD, PPDT, GD, Lecturette, GPE, Interview, OIR) opens to this gate BEFORE the active state. Time starts only when user clicks Begin.

**Layout**:
- Page head with module name and `Set XXX-26-MAY-X` label
- **Olive overview band**: 1.6fr (eyebrow + headline + 4 BriefStats: Duration / Items / Format / Stakes) + 240px gold "Begin {MODULE}" button
- 2-col below:
  - **Phases card** (1.4fr): 4 phase rows, each with mono section number (01-04), label + time, body description
  - **Right column** (1fr): Two stacked cards — green DO rules, red DO NOT rules
- 2-col below:
  - **Evaluated against** (OLQ chips) + 3-D pillar (Manasa / Karma / Vacha highlighted)
  - **Hard rule** quote card — italicised, attributed to "Col. R. Sharma · SSB bootcamp"
- Bottom action bar: ghost "Read full rulebook" + primary "I'm ready · Start"

**Per-test configs** (rules, phases, OLQs, hardRule) are defined inline in each `{Module}Screen` function in `screens-psych.jsx`, `screens-gto.jsx`, `screens-other.jsx`. Copy the strings verbatim — they were drafted to align with PRD § 6 + § 16.

---

### 03 · TAT Active (`TATActive`, `screens-psych.jsx`)

**Purpose**: Active TAT session — picture observation + story writing.

**Two phases controlled by `phase` state**: `"observe"` (single-column, big image, 30s) → `"write"` (two-column, image shrinks, 4-minute story composer + live rule-check).

**Layout (write phase)**:
- ProgressDots: 12 rectangles, current=gold, completed=olive
- 2-col: 1.05fr picture panel (locked image + Observe/Write toggle) + 1fr right column
- Right column stack:
  1. **Timer card** with TimerRing (4-min countdown) + rule reminder
  2. **Story composer** — title bar with word counter ("98 words · target 90–110" green/warning), big textarea (260px min-height), progress bar + submit
  3. **Live rule check** card-paper — rows of pass/warn rules (Hero named ✓, Past tense ✓, Action ratio ≈71% ! target ≥75%, etc.)

**Story content for demo**: Arjun, IIT graduate, returns to drought-hit village, sets up drip-irrigation cooperative. Used to demonstrate the rule-check feedback.

**TimerRing component**: SVG circle with stroke-dashoffset animation, mono label inside (MM:SS or seconds). Olive normally, danger color when ≤30s left.

---

### 04 · WAT Active (`WATActive`, `screens-psych.jsx`)

**Purpose**: 60 words, 15s each, single sentence per word.

**Layout**:
- ProgressDots: 60 rectangles
- 2-col: 1.3fr stimulus card + 1fr live response stream
- **Stimulus card**: huge 86px word ("Soldier") centered on linear-gradient bg, TimerRing (15s) below, large auto-focused input with olive border, hint chips (↵ submit, ⌘↵ skip), word counter
- **Response stream**: scrollable list of past 8 responses (most recent first), each row: word + sentence + status dot (good/neutral/fail). Failed (blank) responses highlighted red. Header shows tally chips (19 ok, 2 weak, 1 blank).

---

### 05 · SRT Active (`SRTActive`, `screens-psych.jsx`)

**Purpose**: 60 situations, 30s each, 10-12 word reaction.

**Layout**:
- ProgressDots: 60
- 2-col: 1.3fr situation card + 1fr coach panel
- **Situation card**: small TimerRing in header (30s), big 21px situation text on gradient bg, textarea below with word counter (showing 17 words / target 10–12 in warning color), submit button
- **Coach panel stack**:
  1. "Watching for" — paper card, structure rules (Action → Responsibility → Outcome, etc.)
  2. Last 5 reactions card — situation + reaction + flag (passive / superhero / ok) + note like "Waiting = passive · take personal action first"

---

### 06 · SD Active (`SDActive`, `screens-psych.jsx`)

**Purpose**: 5 paragraphs, 15-min total, ~200 words.

**Layout**: 3-col — 260px section nav + 1fr editor + 320px congruence column
- **Section nav** (sticky): 5 rows (Parents / Friends / Teachers / Self / Become), each with mono section number + label + per-section word count (green if within target, warning otherwise). Active section highlighted with olive left border + paper-soft bg.
- **Editor**: title bar with eyebrow + person guidance ("third-person · your parents' voice"), big textarea (360px min-height, 22px padding, line-height 1.7), bottom bar with avoid-tips
- **Congruence column**:
  1. "Congruence check" — 5 traits with status dots + sources (e.g. "Team player · contradicts TAT (lone hero ×9)")
  2. "Cross-test mirror" — paper card with specific recommendation

Top-right of page: 15-minute total timer + Save draft / Submit set.

---

### 07 · PPDT Active (`PPDTActive`, `screens-psych.jsx`)

**Purpose**: Hazy picture → perception form → story (uses TAT pattern) → discussion sim.

**Layout shown**: discussion phase (most novel piece).
- 2-col: 1.05fr image+perception card + 1.4fr discussion card
- **Image panel**: blurred image slot (grayscale + blur filter) + Characters Perceived form (age / gender / mood / × per character row, + add character)
- **Discussion card**: scrollable turn list with You / Cadet 03 / Cadet 04 / Cadet 01 / Coach turns. Coach turns highlighted gold with "Coach nudge" chip. Bottom: text input + Send + 🎙 Speak.

---

### 08 · GD Active (`GDActive`, `screens-gto.jsx`)

**Purpose**: 20-min group discussion with 4 AI cadets + you.

**Layout**: 3-col — 240px cadet roster + 1.5fr transcript + 1fr coach panel
- **Cadet roster** card: 6 rows (incl. you), each with chest number badge, name, lead letter, style label ("Aggressive · 9 entries", "Dominant · 12 entries", "Quiet · 1 entry"). You row highlighted olive.
- **Three leads** card below roster: 3 pill rows (A / B / C), picked one filled olive
- **Transcript**: scrollable turns, each with chest number badge, name, lead letter, timestamp, content. Your turns have olive-tint bg + olive left border.
- **Coach panel stack**:
  1. Your meta tiles (Entries, First entry, Lead held, Facts cited) — 2×2 grid
  2. Live coach nudges — green/warning dots with one-line tips
  3. Lead supporting data — pre-loaded by you (bullet list)

---

### 09 · Lecturette Active (`LecturetteActive`, `screens-gto.jsx`)

**Purpose**: Pick 1 of 4 topics, 3-min prep, 3-min speak.

**Layout shown**: speaking phase.
- 2-col: 1.05fr speaking panel + 1fr right column
- **Speaking panel**: REC chip in header, centered "Topic 2 · Hard" eyebrow + topic title (24px), TimerRing + Waveform (60 bars with gold bell marker at 02:30), live transcript section below
- **Right column**:
  1. **4 topics offered** card — each row: number, label, level chip (Easy/Medium/Hard). Picked one has olive border + bg.
  2. Live coach signals — paper card with structure/fillers/data nudges
  3. Plan card — mono-formatted 5-line outline from the 3-min prep

**Waveform**: 60 sampled bars (mono visual), past = olive, future = olive-line, gold bell line at 02:30.

---

### 10 · GPE Active (`GPEActive`, `screens-gto.jsx`)

**Purpose**: Sand-model map + narrative → individual written plan → group discussion.

**Layout shown**: individual writing phase.
- 2-col: 1.3fr map + narrative + 1fr plan + coach
- **Map**: custom SVG (620×320 viewBox) with grid pattern, river, hill, metalled road, non-metalled road, railway line, trees, 5 markers (A / V (danger) / H (warning) / B (warning) / R1), legend strip at bottom (METALLED / NON-METAL / RAIL / SCALE)
- **Narrative card**: locked text describing problems + resources
- **Plan card**: mono textarea with the sample plan (Priority 1 fire / Priority 2 cousin / Priority 3 derailment / etc.)
- **Coach checks**: paper card with RuleRow components — pass/warn/fail icons + descriptive checks ("All 5 problems addressed ✓", "Bicycle under-utilised !")

---

### 11 · Interview Active (`InterviewActive`, `screens-other.jsx`)

**Purpose**: Audio-driven PIQ-based interview, AI follows up dynamically.

**Layout**: 3-col — 1fr PIQ context + 1.4fr transcript + 1fr IO scratchpad
- **PIQ context**: PIQRow stack (Entry / Native / Father / Class 10 / Class 12 / Hobby / Sports / NCC / Attempts), then "Pending probe-areas" paper card
- **Transcript**: scrollable turn list, IO and You turns alternating. Each turn has speaker label (bold uppercase olive) + tag chip ("warm-up", "follow-up", "depth probe"). Flagged turns have a warning ⚐ note + OLQ tag below. Pulse animation at bottom for "IO is composing the next question…". Mic recording bar in footer with red record dot, animated mic bars.
- **IO scratchpad**:
  1. Notes — green/warning dot per line ("Frank about pocket money — self-supporting", "Couldn't name an Indian lead guitarist — depth shallow")
  2. Per-CIQ score bars — Education / Family / Hobbies / Current Affairs / Personality / Motivation (each 0-10 with progress bar)
  3. Live tips paper card

---

### 12 · OIR Active (`OIRActive`, `screens-other.jsx`)

**Purpose**: 70 verbal + 60 non-verbal MCQ test, strict timer.

**Layout**: 2-col — 1.4fr question + 1fr sheet/stats
- **Question card**: question text with `<span>` codes highlighted (paper-soft bg, olive-line border, mono), 2×2 option grid (large circle badge per option, A/B/C/D, selected has olive fill + bg tint), bottom bar (← Q33 / Mark for review / Clear / Q35 →)
- **Sheet card**: 7×10 grid of 70 question buttons. States: attempted (olive fill, white text), marked (gold-soft bg), unseen (white), current (gold fill). Legend below.
- **Pacing card** (paper): target time / your average / projected attempts / projected score (all mono, color-coded). One-line strategic note.
- **Category breakdown**: 6 horizontal bars (Coding-decoding / Analogies / Series / Blood relations / Syllogisms / Directions) — olive normally, warning if below 75%.

---

### Universal Feedback Screen (`FeedbackScreen`, `screens-other.jsx`)

**Purpose**: Post-session coach report. Currently designed for TAT — the pattern generalises to every module.

**Layout**:
- Top score banner: 240px olive panel (set score 6.8/10 with gold delta) + flex coach summary (5-sentence direct critique + OLQ chip row with good/miss states)
- "Story-by-story" section:
  - **StoryFeedback** card: 3-col — 200px picture + meta / flex story text with highlighted spans + 280px scoring breakdown
  - Story text uses `<Hi tone="ok|warn|danger">` inline highlights (tinted bg)
  - "Inline reasoning" rows with quoted phrase + explanation, color-coded vertical accent bar
- "Rule tally" table — 8 rows × Pass / Warn / Fail counts
- "Worst-of-set rewrite" card-paper — your version + coach rewrite + "Why this works" mono caption
- "3-D Mirror" section — directly compares this set against other modules' patterns

---

### Daily Briefing (`BriefingScreen`, `screens-core.jsx`)

- 2-col: video card (1.4fr) + watch-next list (1fr)
- Current affairs grid: 2×2 cards, each with tag + date + headline + body + "Likely Interview Qs" list

---

### Progress (`ProgressScreen`, `screens-core.jsx`)

- 4-up stat cards (Overall / Sessions 30d / Avg completion / Coach flags)
- 2-col: module scores table (10 modules with last-10 sparkline + Δ + sessions count) + 15-OLQ radar SVG + cross-test consistency card

---

### PIQ Form Wizard (`PIQScreen`, `screens-other.jsx`)

- Top step rail: 5 steps shown (Basic Info / Education / SSB Specific / Hobbies / Self-Assessment) — active step olive solid, done steps olive-tint, future white
- Form body uses `.form-row` (180px label + 1fr input grid) — labels are 10.5px mono uppercase

**Note**: Only step 3 (SSB Specific) is fully designed in the prototype. Steps 1, 2, 4, 5 need to be built — the PRD § 4 has the full field list. Apply the same `.form-row` pattern.

---

### Fitness Tracker (`FitnessScreen`, `screens-other.jsx`)

- 4-up stat cards (best run / push-ups / pull-ups / rope)
- 2-col: today's prescription checklist (6 rows: warm-up / run / upper / core / skill / cool-down with checkbox) + right column (run history bar chart 14d + BMI band + GTO obstacle ladder)

---

## State Management

Each test screen has a local `started` boolean that gates the briefing vs the active state. In a real app this should be:

- **Server-side session state** in Firestore (`practice_sessions` collection per PRD § 3) — created on briefing-Begin click, updated on each item submitted, finalised on test completion or abort
- **Resume capability** — if a user closes the tab mid-test, they should be able to resume (especially for SD and Interview)

### Key state shapes

```ts
// users / {uid}
type User = {
  uid: string;
  phone: string;
  name: string;
  piq: PIQData;             // see PRD § 4
  streak: number;
  sessionsCount: number;
  ssbDate: Date | null;
  createdAt: Timestamp;
};

// practice_sessions / {sessionId}
type PracticeSession = {
  sessionId: string;
  uid: string;
  module: "TAT" | "WAT" | "SRT" | "SD" | "PPDT" | "GD" | "LEC" | "GPE" | "INT" | "OIR";
  startedAt: Timestamp;
  completedAt: Timestamp | null;
  setLabel: string;          // e.g. "TAT-26-MAY-B"
  items: SessionItem[];      // one per word/situation/story/etc
  feedback: AIFeedback;      // populated after submission
  score: number;             // 0-10
};

type SessionItem = {
  index: number;
  prompt: string | { imageUrl?: string; word?: string; situation?: string };
  response: string;
  startedAt: Timestamp;
  submittedAt: Timestamp | null;
  timedOut: boolean;
};
```

Full schema discussion is in PRD § 3 and § 11.

---

## Interaction & Behavior Details

### Timers

- All timers are mono JetBrains Mono with `font-variant-numeric: tabular-nums` so digits don't shift
- TimerRing component (SVG circle stroke-dashoffset) for prominent timers — turns danger color in the last 30s / 5s / 20s depending on context
- Auto-advance on expiry for WAT (15s/word) and SRT (30s/situation) — never leave the user stuck
- 4-minute timer for TAT story writing — auto-submit and move to next picture
- 15-minute timer for SD overall — Save draft and Submit set always available

### Navigation

- Sidebar item click → `onNav(id)` → scrolls to top, resets `showFeedback` to false
- Briefing-state Begin click → `setStarted(true)` — drops into active state for that test
- Active state has Abort / Pause buttons in the page head — abort returns to dashboard

### Live rule checking (TAT, WAT, SRT, SD)

The right-column rule check should poll the user's current draft every ~1s while typing and surface inline feedback. In the prototype this is static. In production:
- Send the current draft + PIQ context to Claude Sonnet 4
- Get back a JSON list of `{ rule, status: "ok"|"warn"|"fail", note }`
- Render with `<RuleRow>` component

### Audio (Lecturette, Interview)

- **Lecturette**: browser MediaRecorder, save audio Blob to Firebase Storage. Stream STT through Web Speech API (or Whisper for fallback). Display live transcript chunks. Bell sound at 02:30 (separate audio file). Auto-stop at 03:00.
- **Interview**: continuous mic, Web Speech API real-time STT. After each user turn (silence ≥ 1.5s), submit current PIQ + transcript-so-far to Claude. Receive next question. Synthesize via SpeechSynthesis.

### AI feedback (every test)

- Use the system prompts from PRD § 11.
- Always include the user's full PIQ in context.
- Always include the user's recent sessions in OTHER modules for cross-test consistency checking (the 3-D framework — Manasa / Karma / Vacha).
- Output should be JSON-structured so the FeedbackScreen UI can render it deterministically. Example schema:

```ts
type AIFeedback = {
  setScore: number;            // 0-10
  scoreDelta: number;          // vs last set
  summary: string;             // 3-5 sentence direct critique
  olqs: { name: string; status: "good"|"miss"|"neutral" }[];
  perItem: ItemFeedback[];
  ruleTally: RuleTallyRow[];
  worstOfSetRewrite?: { original: string; rewrite: string; reason: string };
  crossModuleMirror: string;   // 3-D consistency text
};
```

---

## Hover / Active / Focus States

- Buttons: `.btn-primary:hover` darkens to `--olive-dark`; `.btn-ghost:hover` gains white bg; `.btn-gold:hover` darkens to `#B8985A`
- Nav items: hover gains `rgba(255,255,255,0.04)` bg; active state has gold left border + olive-soft bg
- Cards used as buttons (`.row-hover`): hover gains `--paper-soft` bg + cursor pointer
- Inputs: focus gets `outline: 2px solid var(--olive)` with `outline-offset: -1px`
- Scrollbar: 10px width, olive-line thumb, olive-line-strong on hover

---

## What's NOT designed yet (build these from PRD)

These are the gaps the developer should plan around. PRD references in brackets.

1. **Login + WhatsApp OTP entry** [PRD § 3]
2. **First-time PIQ wizard** — Steps 1, 2, 4, 5 of the 5-step wizard (only Step 3 is designed). [PRD § 4]
3. **Empty / first-run states** — what does the dashboard look like for a Day-1 user with no sessions or PIQ data?
4. **Per-module post-session feedback screens** — only TAT's is fully designed. WAT, SRT, SD, PPDT, GD, Lecturette, GPE, Interview, OIR each need their own feedback layout following the TAT pattern.
5. **PPDT story-writing phase** — designed only for the discussion phase; story phase reuses TAT pattern.
6. **Lecturette pick + prep phases** — designed only for the speaking phase. Pick phase shows 4 topics card (already designed in right column); prep phase needs a 3-minute notepad UI.
7. **GPE discussion phase** — designed only for individual plan; group discussion reuses GD pattern.
8. **Interview wrap-up** — final report screen.
9. **Mobile-responsive companion** — desktop only is designed. PRD requires mobile-first responsive port (80% of users on phones).
10. **Admin panel (Rowy)** — Col Sharma's team manages CA, videos, TAT image bank, GD topics, GPE scenarios. Rowy provides the UI but list/edit views need configuration.
11. **Notifications** — bell icon exists in topbar but no notifications drawer is designed.
12. **Settings** screen.
13. **Help / Tutorial** overlays — recommended for first practice of each module type.

---

## Assets

The prototype uses **no real images** — all picture slots are CSS-pattern placeholders (`background: repeating-linear-gradient(...)`) with mono uppercase labels. The developer needs to:

1. **Source / curate TAT image bank** — ambiguous scenes with characters in implied action. ~50 images minimum, indexed in Firestore.
2. **Source / curate PPDT image bank** — same as TAT but blurrier / hazier. ~30 images.
3. **Source GPE scenario maps** — either custom SVG maps (the prototype's `GPEMap` SVG is a starting point) or static map images. ~20 scenarios.
4. **Embed Col. R. Sharma's YouTube videos** — pulled from his channel per PRD § 8, categorized by Rowy.
5. **FAOA logo** — the prototype uses a placeholder chevron lockup (CSS-drawn). Replace with the real FAOA logo asset across the sidebar `.brand` block.

### Fonts

- Inter — from Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`
- JetBrains Mono — from Google Fonts: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap`

### Icons

The prototype uses minimal iconography — a custom `<Chev>` SVG component for chevrons, Unicode characters for bell (🔔), arrows (←→), and dingbats. The developer should pick a single icon set (suggested: **Lucide React**) and use it consistently for any expansion. Stay sparse — military aesthetic does not want a dense icon system.

---

## Files in this Handoff

| File | Purpose |
|---|---|
| `index.html` | Live prototype entry point. Open in a browser to navigate. |
| `styles.css` | All design tokens + base component styles. Translate to Tailwind config + shadcn theme. |
| `app.jsx` | Root app, sidebar/topbar wiring, route state, Tweaks panel |
| `components.jsx` | Shared primitives: `Sidebar`, `TopBar`, `PageHead`, `TestBrief`, `TimerRing`, `ImgSlot`, `Spark`, `Chev`, `ModuleCard`, etc. |
| `screens-core.jsx` | Dashboard, Daily Briefing, Progress |
| `screens-psych.jsx` | TAT, WAT, SRT, SD, PPDT — both briefing and active states |
| `screens-gto.jsx` | GD, Lecturette, GPE — both briefing and active states |
| `screens-other.jsx` | Interview, OIR, FeedbackScreen, PIQScreen, FitnessScreen |
| `tweaks-panel.jsx` | Tweaks panel (design-time controls) — NOT for production. Remove in real app. |
| `PRD.md` | (Paste the user's original PRD here.) Source of truth for product behaviour, AI prompts, evaluation criteria, backend schema. |

---

## Recommended Implementation Order

A pragmatic sequence for a Claude Code session, in line with the PRD's "MVP Scope · Phase 1" priorities (§ 14):

1. **Project bootstrap**: Next.js 14 + TS + Tailwind + shadcn/ui. Set up Firebase project (Auth, Firestore, Storage). Set up Rowy.
2. **Design system port**: Translate `styles.css` to `tailwind.config.ts` + shadcn theme. Build the primitives (`Card`, `Button` variants, `Eyebrow`, `Chip`, `OLQChip`, `TimerRing`, `ProgressDots`, `RuleRow`, `Dot`).
3. **Auth + onboarding**: Login → WhatsApp OTP → PIQ wizard (all 5 steps). [PRD § 3-4]
4. **Sidebar + Topbar shell** + protected routes.
5. **Dashboard** with mock data first, then wire to Firestore.
6. **TestBrief component** — universal, takes config per test.
7. **TAT**: briefing → observation phase → story phase → submit → AI feedback call → FeedbackScreen.
8. **WAT**: briefing → 60-word loop → AI feedback.
9. **SRT**: briefing → 60-situation loop → AI feedback.
10. **SD**: briefing → 5-paragraph editor → AI feedback (with congruence check vs TAT/WAT/SRT).
11. **Personal Interview**: audio + STT + dynamic question chain.
12. **Progress** screen — wire to aggregated `practice_sessions`.
13. **Fitness**, **Daily Briefing**, **PIQ edit** screens.
14. **Phase 2**: Lecturette, GD with AI participants, GPE, OIR, PPDT, Current Affairs.

---

## Open Questions for the Developer

These weren't decided in design; flag to product:

1. Should audio for Lecturette / Interview be stored long-term in Firebase Storage (₹ cost) or deleted after transcript + AI feedback are saved?
2. The "Coach review" delay — should AI feedback be sync (block the user post-submit) or async (notify when ready)? The UI assumes near-real-time.
3. Should "Pause" be allowed during a test session (and if so, how many times)? Real SSB has no pause.
4. What's the rate limit on AI calls per user per day? An aggressive user could rack up many sessions.
5. WhatsApp OTP — is the BSP template ready, and what's the failure path (SMS fallback)?
6. Image bank — start with a 50-image TAT bank? Where do these come from (purchased / generated / curated)?

---

End of handoff. Open the prototype's `index.html` alongside this README and you have everything to start building.
