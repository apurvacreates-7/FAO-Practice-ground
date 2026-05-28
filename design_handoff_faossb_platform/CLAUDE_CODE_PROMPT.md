# Starter prompt for Claude Code

Copy-paste this prompt into Claude Code (or `claude` CLI) after extracting this handoff zip into an empty repo. It primes Claude with everything needed to begin implementation.

---

```
You are helping me build the FAOSSB SSB Practice Platform — a web app where defence aspirants practice all stages of the SSB Interview process with AI-powered feedback. Brand: Future Army Officers Academy (faossb.com), founded by Col. Rajvir Sharma.

WHAT'S IN THIS REPO RIGHT NOW

- README.md ............... full design handoff doc — read this first
- PRD.md ................... product requirements, AI prompts, evaluation rules, backend schema
- design_prototype/ ........ working HTML prototype of all 14 screens (open index.html to see it)

YOUR JOB

Build the production app, screen by screen, in Next.js 14 + TypeScript + Tailwind + shadcn/ui, with Firebase (Auth + Firestore + Storage) for backend and the Anthropic Claude API for AI feedback.

CRITICAL RULES

1. The design_prototype/ files are REFERENCES, not code to copy. Recreate every screen as proper React/TypeScript components using shadcn primitives and Tailwind. Don't ship the prototype's inline JSX.

2. styles.css is the design-token source of truth. Port it to tailwind.config.ts as theme tokens and shadcn theme CSS variables. Match colors, type scale, and spacing precisely.

3. Use the PRD's AI system prompts verbatim (PRD § 11). They were drafted with intent — don't paraphrase.

4. Every AI feedback call must include:
   - Full user PIQ (from Firestore)
   - User's last 5 sessions in OTHER modules (for 3-D consistency: Manasa / Karma / Vacha)
   - The module-specific system prompt

5. The "briefing → active → feedback" pattern is universal across all 10 timed tests. Build TestBrief as a single reusable component and config-drive it per module (configs are inline in the prototype's screen files).

6. Mobile-first responsive — PRD says 80% of users will be on phones. The prototype is desktop-only by intention; you implement mobile as you go.

START HERE

Read README.md fully, then PRD.md. After that, propose an MVP cut for Phase 1 in this order:

  1. Project bootstrap (Next, Tailwind, shadcn, Firebase init, Rowy connection)
  2. Design system port (tokens → tailwind.config → shadcn theme)
  3. WhatsApp OTP login → PIQ wizard → dashboard
  4. TAT end-to-end: briefing → 12 stories → AI feedback report
  5. WAT → SRT → SD → Interview (PIQ-driven audio)

Show me your proposed file structure first. Don't write code until I approve the structure.

WHEN ASKING ME QUESTIONS

Ask in batches. Number each question. Flag which questions are blocking vs nice-to-have. Specifically I want decisions on:

- Pause-allowed during a test session? (Real SSB has no pause.)
- AI feedback sync (block user post-submit) or async (notify when ready)?
- Audio retention for Lecturette / Interview — keep long-term in Storage, or delete after transcript?
- Rate limits per user per day on AI calls?
- TAT / PPDT image bank source — purchased / curated / AI-generated?
- WhatsApp BSP — which one (Gupshup, Wati, etc) and is the template approved?

Begin.
```

---

## Tips for working with Claude Code on this project

1. **Keep the design prototype open** in a separate browser tab as you work. When you tell Claude "build the dashboard like the prototype", they should have the file path to inspect.

2. **Don't let it write all 14 screens in one shot**. Push for screen-by-screen with running review. Each module has nuance — the TAT story rule-checker is materially different from the SRT pattern detector.

3. **For AI feedback prompts**, start by deploying the PRD § 11 prompts verbatim and iterate from real user output. Don't over-engineer the prompt before seeing real responses.

4. **Cost monitoring**: Anthropic API costs add up fast with 60-word WAT analyses + 60-situation SRT + 12-story TAT per session per user. Set up usage alerts day one.

5. **The 3-D consistency check is the platform's moat**. Make sure cross-module data is queryable from the start — every session should include enough metadata that the AI can read across modules without expensive joins.

6. **Rowy admin first, custom admin later**. The PRD calls for Rowy explicitly. Don't get tempted to build a custom admin UI — Rowy gets you to launch faster.

7. **For audio modules** (Lecturette, Interview), get an end-to-end recording → STT → AI feedback loop working with a single user before scaling. Web Speech API is free; Whisper is paid. Default to Web Speech, fall back to Whisper if quality fails.

8. **The TAT/PPDT image bank is a real bottleneck**. Start sourcing on Day 1 of build, not Day 1 of launch.
