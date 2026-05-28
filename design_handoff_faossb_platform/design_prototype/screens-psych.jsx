/* ====== Psychology modules: TAT, WAT, SRT, SD, PPDT ====== */

/* ============== TAT ============== */
function TATScreen({ onNav }) {
  const [started, setStarted] = React.useState(false);
  if (!started) {
    return (
      <TestBrief
        no="03"
        module="TAT"
        pillar="Manasa"
        title="Thematic Apperception Test."
        oneLiner="12 pictures. 12 stories. Your subconscious patterns will leak through — make sure they're the right ones."
        duration="~55 min"
        itemCount="12 stories (11 pictures + 1 blank)"
        setLabel="TAT-26-MAY-B"
        phases={[
          { no: "01", label: "Observe", time: "30 s × 12", body: "Each picture is shown for 30 seconds. Look — do not write." },
          { no: "02", label: "Write",   time: "4 min × 12", body: "Picture moves to the corner. You write a 90–110 word story in past tense. One central named hero. Positive theme. ~75% action." },
          { no: "03", label: "Blank slide", time: "+1 story", body: "The 12th slide is blank. Write from imagination — no scene to anchor to." },
          { no: "04", label: "Coach review", time: "auto", body: "After submission you receive story-by-story inline feedback, a rule tally, and a rewrite of your worst-of-set." },
        ]}
        rules={{
          do: [
            "Name your hero with a realistic Indian name (Arjun, Meera, Vikram — never Ram/Shyam).",
            "Give the hero high status (officer, engineer, doctor, graduate).",
            "Past tense only. One theme per story. Theme must benefit a community.",
            "~75% of the words should be ACTION the hero takes.",
            "Pick your hero from inside the picture, not from outside it.",
            "Use formal verbs — 'informed' over 'told', 'visited' over 'gone'.",
          ],
          dont: [
            "No negative words — if, but, never, cannot.",
            "No politics, elections, money, religion as themes.",
            "Don't describe the picture — write a STORY with a beginning, action, outcome.",
            "Don't go under 90 or over 110 words.",
            "Don't leave any of the 12 blank — even a weak story beats a blank.",
          ],
        }}
        olqs={["Effective Intelligence", "Initiative", "Organising Ability", "Determination", "Power of Expression", "Cooperation", "Social Adaptability"]}
        hardRule="A blank story is not a small mistake. It is a signal of low mental stamina. Your assessor will read it that way."
        onStart={() => setStarted(true)}
        onBack={() => onNav("dashboard")}
      />
    );
  }

  // ----- Active TAT state -----
  return <TATActive onNav={onNav} />;
}

function TATActive({ onNav }) {
  // Active state: viewing picture 4 of 12, writing the story (4-min timer)
  const [phase, setPhase] = React.useState("write"); // observe | write
  const [secs, setSecs] = React.useState(phase === "observe" ? 30 : 4*60);
  React.useEffect(() => { setSecs(phase === "observe" ? 30 : 4*60); }, [phase]);
  React.useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs(s => Math.max(0, s-1)), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const [story, setStory] = React.useState(
    "Arjun, a 22-year-old IIT graduate, returned to his drought-hit village in western Rajasthan after seeing the parched fields from the train window. He met the sarpanch the next morning and proposed a low-cost drip-irrigation cooperative funded by a state grant he had researched. He rallied twelve farmers, mapped the borewells, drew up rotation schedules and trained the youth on the new pipes. Within three months the kharif sowing was back on track and the village had its first surplus in five years."
  );
  const words = story.trim().split(/\s+/).filter(Boolean).length;
  const wordOk = words >= 90 && words <= 110;

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="03" sub="Psychology · Manasa · TAT" title="Thematic Apperception Test."
        meta={<React.Fragment><span>Story <b>04 / 12</b></span><span>Set <b>TAT-26-MAY-B</b></span></React.Fragment>}
        right={<div style={{ display: "flex", gap: 8 }}><button className="btn btn-ghost btn-mono">Pause</button><button className="btn btn-ghost btn-mono">Abort</button></div>}
      />

      <ProgressDots current={4} total={12} />

      <div style={{ display: "grid", gridTemplateColumns: phase === "observe" ? "1fr" : "minmax(0, 1.05fr) minmax(0, 1fr)", gap: 18, marginTop: 18, transition: "grid-template-columns .35s" }}>
        {/* Picture panel */}
        <div className="card" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">D.01 · Picture 04 / 12 · Observe</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {phase === "observe" ? "Observation phase" : "Story phase · picture locked"}
            </span>
          </div>
          <div style={{ padding: 16, background: "var(--paper-soft)" }}>
            <ImgSlot
              label="TAT bank · Image 04 · ambiguous scene"
              height={phase === "observe" ? 520 : 360}
            />
          </div>
          <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Image visible · do not type during observation
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className={"btn btn-sm btn-mono " + (phase === "observe" ? "btn-primary" : "btn-ghost")} onClick={() => setPhase("observe")}>Observe</button>
              <button className={"btn btn-sm btn-mono " + (phase === "write" ? "btn-primary" : "btn-ghost")} onClick={() => setPhase("write")}>Write</button>
            </div>
          </div>
        </div>

        {/* Right column: timer + composer */}
        {phase === "write" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="card" style={{ padding: 14, display: "flex", alignItems: "center", gap: 14 }}>
              <TimerRing label={fmtMMSS(secs)} value={4*60 - secs} max={4*60} danger={secs <= 30} />
              <div>
                <div className="eyebrow eyebrow-olive">D.02 · Story timer</div>
                <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>
                  4 minutes to write a 90–110 word story. Past tense. One central character with a name. Positive theme. ~75% action.
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 0 }}>
              <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="eyebrow eyebrow-olive">D.03 · Story composer</span>
                <span className="mono" style={{ fontSize: 12, color: wordOk ? "var(--success)" : "var(--warning)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {words} words · target 90–110
                </span>
              </div>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="input"
                style={{ minHeight: 260, border: "none", borderRadius: 0, padding: 16, fontSize: 14, lineHeight: 1.65, fontFamily: "var(--font-sans)" }}
              />
              <div style={{ padding: "10px 16px", borderTop: "1px solid var(--olive-line)", display: "flex", gap: 14, alignItems: "center" }}>
                <div className="bar" style={{ flex: 1 }}><i style={{ right: `${100 - Math.min(100, (words/100)*100)}%` }}></i></div>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{Math.min(100, Math.round((words/100)*100))}%</span>
                <button className="btn btn-primary btn-sm">Submit & next <Chev /></button>
              </div>
            </div>

            <div className="card-paper" style={{ padding: 14 }}>
              <div className="eyebrow eyebrow-olive">D.04 · Live rule check</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                <RuleRow ok label="Hero named (Arjun) — realistic name" />
                <RuleRow ok label="Past tense detected throughout" />
                <RuleRow ok label="Single central character" />
                <RuleRow ok label="Theme: socially benefitting (rural irrigation)" />
                <RuleRow warn label="Action ratio ≈ 71% · target ≥ 75% (one descriptive line could be tightened)" />
                <RuleRow warn label='Word “returned” — formal alternative: “travelled back”' />
                <RuleRow ok label="No negative words (if, but, never)" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressDots({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          flex: 1, height: 6,
          background: i < current - 1 ? "var(--olive)" : i === current - 1 ? "var(--gold)" : "var(--paper-soft)",
          border: "1px solid " + (i < current - 1 ? "var(--olive-dark)" : i === current - 1 ? "var(--gold-line)" : "var(--olive-line)"),
        }} />
      ))}
    </div>
  );
}

function RuleRow({ ok, warn, fail, label }) {
  const state = ok ? "ok" : warn ? "warn" : "fail";
  const color = ok ? "var(--success)" : warn ? "var(--warning)" : "var(--danger)";
  const mark = ok ? "✓" : warn ? "!" : "✗";
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12.5 }}>
      <div className="mono" style={{ width: 18, height: 18, borderRadius: 2, background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{mark}</div>
      <span style={{ color: "var(--ink-2)", lineHeight: 1.45 }}>{label}</span>
    </div>
  );
}

/* ============== WAT ============== */
function WATScreen({ onNav }) {
  const [started, setStarted] = React.useState(false);
  if (!started) {
    return (
      <TestBrief
        no="04"
        module="WAT"
        pillar="Manasa"
        title="Word Association Test."
        oneLiner="60 words. 15 seconds each. One sentence per word — your subconscious has nowhere to hide."
        duration="15 min"
        itemCount="60 words"
        setLabel="WAT-26-MAY-A"
        phases={[
          { no: "01", label: "Stimulus", time: "Each word: 15 s", body: "One word flashes on screen for 15 seconds. Type one meaningful sentence." },
          { no: "02", label: "Auto-advance", time: "Strict", body: "On timer expiry the next word appears. Submit early to move on faster — but never leave blanks." },
          { no: "03", label: "Pattern read", time: "After 60", body: "We surface your subconscious pattern: positivity ratio, completion rate, negative-word handling, cliché count." },
        ]}
        rules={{
          do: [
            "One meaningful sentence. Not a phrase. Not a paragraph.",
            "Positive, action-oriented thinking — show what you DO, not what you feel.",
            "Convert negative words constructively: Fear → 'face boldly'. Failure → 'learn and improve'.",
            "Base on real observation, not memorised lines.",
          ],
          dont: [
            "NEVER leave a blank. The single biggest red flag.",
            "No proverbs or quoted lines — assessors spot these in 2 seconds.",
            "No 'always' / 'never' absolutes.",
            "Don't start every sentence with 'I' — shows self-centeredness.",
            "Don't write more than one sentence — wastes time, hurts you.",
          ],
        }}
        olqs={["Effective Intelligence", "Social Adaptability", "Initiative", "Self-Confidence", "Determination", "Cooperation"]}
        hardRule="WAT is not an English test. It is a 15-minute scan of your reflexes. The pattern across 60 words is the answer."
        onStart={() => setStarted(true)}
        onBack={() => onNav("dashboard")}
      />
    );
  }
  return <WATActive onNav={onNav} />;
}

function WATActive({ onNav }) {
  // Active: word 23/60, 15-second sentence
  const [secs, setSecs] = React.useState(11);
  React.useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs(s => Math.max(0, s-1)), 1000);
    return () => clearInterval(id);
  }, []);
  const [val, setVal] = React.useState("");

  const recent = [
    { w: "Failure",   s: "Failure trains the mind to plan the next attempt more carefully." , status: "ok" },
    { w: "Crowd",     s: "A crowd brings energy when its purpose is shared with discipline." , status: "ok" },
    { w: "Boss",      s: "A good boss listens before he directs." , status: "warn", note: "Slightly self-distanced — try first-person observation" },
    { w: "Fight",     s: "Fights end fastest when one person chooses to listen." , status: "ok" },
    { w: "Father",    s: "My father taught me responsibility through example." , status: "warn", note: "Uses 'My' — try framing around the action" },
    { w: "Mistake",   s: "Mistakes corrected early save the whole team time later." , status: "ok" },
    { w: "Lazy",      s: "" , status: "fail", note: "BLANK · 🚨 red flag" },
    { w: "Friends",   s: "Friends keep each other honest about weaknesses." , status: "ok" },
  ];

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="04" sub="Psychology · Manasa · WAT" title="Word Association Test."
        meta={<React.Fragment><span>Word <b>23 / 60</b></span><span>Set <b>WAT-26-MAY-A</b></span></React.Fragment>}
        right={<button className="btn btn-ghost btn-mono">Abort set</button>}
      />

      <ProgressDots current={23} total={60} />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: 18, marginTop: 18 }}>
        {/* Word + sentence */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">E.01 · Word 23 / 60 · 15 s per word</span>
            <span className="chip">7 blanks of 60 unacceptable</span>
          </div>
          <div style={{ padding: 48, textAlign: "center", background: "linear-gradient(180deg, var(--paper-soft), #fff)" }}>
            <div className="eyebrow" style={{ color: "var(--olive)" }}>Stimulus word</div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: 86,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              margin: "20px 0",
            }}>Soldier</div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
              <TimerRing label={String(secs).padStart(2, "0")} value={15-secs} max={15} danger={secs <= 3} size={86} stroke={4}/>
              <div style={{ textAlign: "left" }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Seconds remaining</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-2)", maxWidth: 280 }}>One meaningful sentence. Positive. Action-oriented.</div>
              </div>
            </div>
          </div>
          <div style={{ padding: 16, borderTop: "1px solid var(--olive-line)" }}>
            <input
              autoFocus
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="Type one sentence and press Enter…"
              className="input"
              style={{ fontSize: 18, padding: "14px 16px", border: "2px solid var(--olive)", background: "#fff" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span className="chip">↵ submit & next</span>
                <span className="chip">⌘ ↵ skip</span>
              </div>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {val.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
          </div>
        </div>

        {/* Stream of past responses */}
        <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">E.02 · Live response stream</span>
            <div style={{ display: "flex", gap: 4 }}>
              <span className="chip chip-ok">19 ok</span>
              <span className="chip chip-warn">2 weak</span>
              <span className="chip chip-dgr">1 blank</span>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", maxHeight: 460 }}>
            {recent.map((r, i) => (
              <div key={i} style={{ padding: "10px 14px", borderBottom: "1px dashed var(--olive-line)", display: "flex", gap: 12 }}>
                <div style={{ width: 90 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{r.w}</div>
                  <div className="mono" style={{ fontSize: 10, color: "var(--ink-4)", letterSpacing: "0.1em" }}>#{String(22-i).padStart(2,"0")}</div>
                </div>
                <div style={{ flex: 1, fontSize: 13, color: "var(--ink-2)" }}>
                  {r.s || <span style={{ color: "var(--danger)" }}>— blank —</span>}
                  {r.note && (
                    <div className="mono" style={{ fontSize: 10.5, color: r.status === "fail" ? "var(--danger)" : "var(--warning)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>
                      {r.note}
                    </div>
                  )}
                </div>
                <Dot v={r.status === "ok" ? "good" : r.status === "fail" ? "miss" : "neutral"} />
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 14px", borderTop: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--paper)" }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pattern reading begins after word 30</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============== SRT ============== */
function SRTScreen({ onNav }) {
  const [started, setStarted] = React.useState(false);
  if (!started) {
    return (
      <TestBrief
        no="05"
        module="SRT"
        pillar="Manasa"
        title="Situation Reaction Test."
        oneLiner="60 real-life situations. 30 seconds each. What would YOU practically do — not theoretically."
        duration="30 min"
        itemCount="60 situations"
        setLabel="SRT-26-MAY-A"
        phases={[
          { no: "01", label: "Situation", time: "30 s each", body: "A short situation appears. Write your reaction in 10–12 words." },
          { no: "02", label: "Auto-advance", time: "Strict", body: "On timer expiry the next situation appears. No going back." },
          { no: "03", label: "Pattern read", time: "After 60", body: "We flag passive responses, superhero responses, delegation patterns, and check completion rate." },
        ]}
        rules={{
          do: [
            "Structure: Action → Responsibility → Outcome.",
            "Take personal action FIRST, then inform authorities — never the reverse.",
            "10–12 words. Crisp. No essays.",
            "Be realistic and practical — not theoretical.",
            "Attempt ALL 60 — completion is the foundation.",
          ],
          dont: [
            "Don't be a bystander ('I would call the police and wait').",
            "Don't be a superhero ('I would single-handedly fight 5 terrorists').",
            "Don't delegate everything — that signals weak personality.",
            "Don't write over 15 words — poor time management.",
            "Don't overthink — you have 30 seconds. First instinct usually wins.",
          ],
        }}
        olqs={["Initiative", "Sense of Responsibility", "Speed of Decision", "Courage", "Effective Intelligence", "Social Adaptability"]}
        hardRule="Overthinking equals failure here. Being 'too safe' equals failure here. Practical and responsible wins."
        onStart={() => setStarted(true)}
        onBack={() => onNav("dashboard")}
      />
    );
  }
  return <SRTActive onNav={onNav} />;
}

function SRTActive({ onNav }) {
  const [secs, setSecs] = React.useState(21);
  React.useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs(s => Math.max(0, s-1)), 1000);
    return () => clearInterval(id);
  }, []);

  const past = [
    { n: 31, t: "He is rejoining duty after a long illness and his platoon doubts his fitness.", a: "He'd run the morning PT himself the next day and finish first to settle the doubt.", flag: "ok" },
    { n: 30, t: "His friend is being bullied for being from a minority.", a: "He'd walk up, stand beside the friend and quietly tell the bullies to stop.", flag: "ok" },
    { n: 29, t: "He finds a stranger's wallet with ₹12,000 cash on the metro.", a: "He'd call the police helpline and wait at the next station.", flag: "warn", note: "Waiting = passive · take personal action first" },
    { n: 28, t: "He is alone at home and a stranger forces the door open.", a: "He'd lock himself in the bedroom and call neighbours.", flag: "warn", note: "Defensive only · no follow-through plan" },
    { n: 27, t: "His teammate cheated in the tournament and they won.", a: "He'd inform the captain and request to forfeit the win.", flag: "ok" },
  ];
  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="05" sub="Psychology · Manasa · SRT" title="Situation Reaction Test."
        meta={<React.Fragment><span>Situation <b>32 / 60</b></span><span>Set <b>SRT-26-MAY-A</b></span></React.Fragment>}
        right={<button className="btn btn-ghost btn-mono">Abort set</button>}
      />
      <ProgressDots current={32} total={60} />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: 18, marginTop: 18 }}>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">F.01 · Situation 32 / 60 · 30 s</span>
            <TimerRing label={fmtMMSS(secs).slice(2,5).replace(":", "")} value={30-secs} max={30} danger={secs <= 5} size={60} stroke={3.5}/>
          </div>
          <div style={{ padding: 28, background: "linear-gradient(180deg, var(--paper-soft), #fff)" }}>
            <div className="eyebrow" style={{ color: "var(--olive)", marginBottom: 8 }}>Situation</div>
            <div style={{ fontSize: 21, fontWeight: 500, lineHeight: 1.4, letterSpacing: "-0.005em", color: "var(--ink)", maxWidth: 600 }}>
              He is leading a hiking group of six juniors when one of them slips on a wet rock and twists her ankle. The nearest road is 3 km downhill. It is 5 PM and light is fading. He…
            </div>
          </div>
          <div style={{ padding: 16, borderTop: "1px solid var(--olive-line)" }}>
            <textarea
              className="input"
              placeholder="His action in 10–12 words…"
              style={{ minHeight: 88, fontSize: 16, lineHeight: 1.55 }}
              defaultValue="…would splint her ankle with a stick, lead the group down, leaving two as marker, and call her parents."
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--warning)", letterSpacing: "0.1em", textTransform: "uppercase" }}>17 words · target 10–12</span>
              <button className="btn btn-primary btn-sm">Submit & next <Chev /></button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card-paper" style={{ padding: 14 }}>
            <div className="eyebrow eyebrow-olive">F.02 · Coach watching for</div>
            <div style={{ marginTop: 8, fontSize: 12.5, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 6 }}>
              <div>· Action → Responsibility → Outcome structure</div>
              <div>· Personal initiative before delegating to authorities</div>
              <div>· Practical realism (no superhero, no bystander)</div>
              <div>· 10–12 words · over 15 = poor time management</div>
            </div>
          </div>

          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow eyebrow-olive">F.03 · Last 5 reactions</span>
              <div style={{ display: "flex", gap: 4 }}>
                <span className="chip chip-warn">9 passive</span>
                <span className="chip chip-ok">22 active</span>
              </div>
            </div>
            {past.map((p, i) => (
              <div key={i} style={{ padding: "10px 14px", borderBottom: i === past.length-1 ? "none" : "1px dashed var(--olive-line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span className="mono" style={{ fontSize: 10.5, color: "var(--olive)", letterSpacing: "0.12em" }}>SRT · {String(p.n).padStart(2, "0")}</span>
                  <Dot v={p.flag === "ok" ? "good" : p.flag === "fail" ? "miss" : "neutral"} />
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 4 }}>{p.t}</div>
                <div style={{ fontSize: 13, color: "var(--ink)", marginTop: 4 }}>{p.a}</div>
                {p.note && <div className="mono" style={{ fontSize: 10.5, color: "var(--warning)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>{p.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============== SD (Self Description) ============== */
function SDScreen({ onNav }) {
  const [started, setStarted] = React.useState(false);
  if (!started) {
    return (
      <TestBrief
        no="06"
        module="SD"
        pillar="Manasa"
        title="Self Description."
        oneLiner="The psychologist confirms here whether the person in your TAT, WAT and SRT is the same person you consciously describe."
        duration="15 min"
        itemCount="5 paragraphs · ~200 words"
        setLabel="SD-26-MAY-A"
        phases={[
          { no: "01", label: "Parents",  time: "~3 min", body: "How your parents would describe you. Third person. Specific, with examples." },
          { no: "02", label: "Friends",  time: "~3 min", body: "How your friends would describe you. Include one trait they'd politely complain about." },
          { no: "03", label: "Teachers", time: "~3 min", body: "How your teachers / colleagues would describe you. Steady, not glowing." },
          { no: "04", label: "Self",     time: "~3 min", body: "Strengths AND weaknesses in your own voice. Weaknesses real but non-fatal." },
          { no: "05", label: "Become",   time: "~3 min", body: "The person you want to become. Aspirational but realistic." },
        ]}
        rules={{
          do: [
            "Be natural and realistic — no dictionary adjectives.",
            "Every trait backed by a brief example.",
            "Show above-average personality, not extreme.",
            "Balanced tone — not all positive, not negative-heavy.",
            "All five voices must paint the same person (congruence is the test).",
          ],
          dont: [
            "Don't confess extreme flaws (theft, lying, cheating).",
            "Don't write artificial weaknesses ('I work too hard').",
            "Don't cram or memorise — the psychologist spots robotic language.",
            "Don't list adjectives. Don't use bullet points. Paragraphs only.",
            "Don't contradict what your TAT / WAT / SRT have already shown.",
          ],
        }}
        olqs={["Self-Confidence", "Effective Intelligence", "Social Adaptability", "Sense of Responsibility", "Power of Expression"]}
        hardRule="SD is not about honesty. It is about CONTROLLED honesty aligned with officer qualities."
        onStart={() => setStarted(true)}
        onBack={() => onNav("dashboard")}
      />
    );
  }
  return <SDActive onNav={onNav} />;
}

function SDActive({ onNav }) {
  const sections = [
    { key: "parents",   no: "01", label: "What your parents think of you", target: 40, person: "third-person · your parents' voice" },
    { key: "friends",   no: "02", label: "What your friends think of you", target: 40, person: "third-person · your friends' voice" },
    { key: "teachers",  no: "03", label: "What your teachers / colleagues think", target: 40, person: "third-person · their voice" },
    { key: "self",      no: "04", label: "What you think of yourself — strengths and weaknesses", target: 50, person: "first-person · honest, supported" },
    { key: "become",    no: "05", label: "What kind of person you want to become", target: 40, person: "first-person · aspirational, realistic" },
  ];
  const [values, setValues] = React.useState({
    parents: "My parents see me as the more disciplined of their two children — the one who keeps a routine, who doesn't drop tasks halfway. They feel I have become more patient with my younger sister since the move to Jaisalmer, though they wish I would speak more about what I want.",
    friends: "My friends call me the quiet planner — the person who fixes logistics on group trips and stays back to finish things others abandon. A few of them have said I overthink before speaking up in arguments, but they also say I argue fairly.",
    teachers: "My class teachers in 12th remember me as steady rather than brilliant — the boy who improved every term after a weak Class 11. My football coach values my fitness and willingness to play out of position when the team needs it.",
    self: "I see myself as dependable, physically fit and slow to anger. My biggest weakness is that I take on more than I can finish — last semester I committed to NCC, the inter-college tournament and a state-quiz simultaneously and dropped the quiz. I am trying to learn to refuse early rather than apologise later.",
    become: "I want to become the officer my CO can hand a half-baked task to and walk away — someone who completes things, brings juniors along and stays calm when the plan changes. Closer to home, I want to be the elder brother my sister consults before her parents.",
  });
  const [active, setActive] = React.useState("self");

  const totalWords = Object.values(values).reduce((acc, v) => acc + v.trim().split(/\s+/).filter(Boolean).length, 0);
  const [secs, setSecs] = React.useState(8 * 60 + 14);
  React.useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs(s => Math.max(0, s-1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="06" sub="Psychology · Manasa · SD" title="Self Description."
        meta={<React.Fragment><span>~200 words · 5 paragraphs</span><span>Set <b>SD-26-MAY-A</b></span></React.Fragment>}
        right={
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="timer-display" style={{ fontSize: 22, color: secs < 120 ? "var(--danger)" : "var(--ink)" }}>{fmtMMSS(secs)}</div>
            <button className="btn btn-ghost btn-mono">Save draft</button>
            <button className="btn btn-primary btn-mono">Submit set</button>
          </div>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 320px", gap: 18 }}>
        {/* Section nav */}
        <div className="card" style={{ padding: 0, height: "fit-content", position: "sticky", top: 80 }}>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--olive-line)" }}>
            <span className="eyebrow eyebrow-olive">G.01 · Paragraphs</span>
          </div>
          {sections.map(s => {
            const w = values[s.key].trim().split(/\s+/).filter(Boolean).length;
            const ok = Math.abs(w - s.target) <= 15;
            return (
              <div key={s.key} className="row-hover" onClick={() => setActive(s.key)}
                style={{
                  padding: "12px 14px",
                  borderBottom: "1px dashed var(--olive-line)",
                  background: active === s.key ? "var(--paper-soft)" : "transparent",
                  borderLeft: active === s.key ? "3px solid var(--olive)" : "3px solid transparent",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span className="mono" style={{ fontSize: 10.5, color: "var(--olive)", letterSpacing: "0.12em" }}>{s.no}</span>
                  <span className="mono" style={{ fontSize: 10.5, color: ok ? "var(--success)" : "var(--warning)" }}>{w}w</span>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 500, marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            );
          })}
          <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between" }}>
            <span className="eyebrow">Total</span>
            <span className="mono" style={{ fontSize: 13, color: totalWords < 250 && totalWords > 180 ? "var(--success)" : "var(--warning)" }}>{totalWords} / ~200</span>
          </div>
        </div>

        {/* Editor */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="eyebrow eyebrow-olive">G.02 · {sections.find(s => s.key === active).no} · {sections.find(s => s.key === active).label}</div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3 }}>
                {sections.find(s => s.key === active).person}
              </div>
            </div>
            <span className="chip">Target ~{sections.find(s => s.key === active).target} words</span>
          </div>
          <textarea
            value={values[active]}
            onChange={(e) => setValues(v => ({ ...v, [active]: e.target.value }))}
            className="input"
            style={{ minHeight: 360, border: "none", borderRadius: 0, padding: 22, fontSize: 15, lineHeight: 1.7, fontFamily: "var(--font-sans)" }}
          />
          <div style={{ padding: "10px 18px", borderTop: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between" }}>
            <span className="eyebrow">Avoid · adjective dumps, fake weaknesses, memorised lines</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{values[active].trim().split(/\s+/).filter(Boolean).length} words</span>
          </div>
        </div>

        {/* Congruence check */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">G.03 · Congruence check</span>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>Are all five voices painting the same person?</div>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              <CongruenceRow trait="Disciplined / steady" status="ok" sources="parents · teachers · self" />
              <CongruenceRow trait="Plans ahead" status="ok" sources="friends · self" />
              <CongruenceRow trait="Over-commits" status="ok" sources="self · ↔ corroborated by GD logs" />
              <CongruenceRow trait="Team player" status="warn" sources='claimed in "self" · contradicts TAT (lone hero ×9)' />
              <CongruenceRow trait="Calm under change" status="neutral" sources="not yet supported in §05" />
            </div>
          </div>
          <div className="card-paper" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">G.04 · Cross-test mirror</span>
            <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.55 }}>
              In the last 5 TAT stories, your hero acted <b>alone</b> in 4 of 5. Your SD calls you a team player. The psychologist will catch this. Either:
              <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
                <li>Soften "team player" with a real solo-tendency caveat</li>
                <li>Add a TAT-class scenario where the hero coordinates with others</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CongruenceRow({ trait, status, sources }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingBottom: 6, borderBottom: "1px dashed var(--olive-line)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12.5, fontWeight: 500 }}>{trait}</span>
        <Dot v={status === "ok" ? "good" : status === "warn" ? "miss" : "neutral"} />
      </div>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.08em" }}>{sources}</div>
    </div>
  );
}

/* ============== PPDT ============== */
function PPDTScreen({ onNav }) {
  const [started, setStarted] = React.useState(false);
  if (!started) {
    return (
      <TestBrief
        no="07"
        module="PPDT"
        pillar="Manasa + Vacha"
        title="Picture Perception & Description Test."
        oneLiner="Screening Day 1. The story matters less than what happens in the discussion that follows."
        duration="~12 min + discussion"
        itemCount="1 hazy image · 1 story · 1 group discussion"
        setLabel="PPDT-26-MAY"
        phases={[
          { no: "01", label: "Observe",     time: "30 s",  body: "A hazy / blurred image is shown for 30 seconds." },
          { no: "02", label: "Perceive",    time: "1 min", body: "Note number of characters, age, gender, mood — assessor checks if your perception is reasonable." },
          { no: "03", label: "Write story", time: "4 min", body: "One positive-themed story with a clear named hero and action." },
          { no: "04", label: "Discussion",  time: "~8 min", body: "4-5 simulated cadets narrate their interpretations. You support good points, build the narrative, and stay composed when disagreed with." },
        ]}
        rules={{
          do: [
            "Pick the hero from inside the picture.",
            "Predominantly positive mood readings (assessors expect optimists).",
            "In discussion: narrate confidently, listen actively, build on others.",
            "Support a stronger interpretation than yours if it's clearly better — that's leadership.",
            "Hold your version if it has logic — don't fold under social pressure.",
          ],
          dont: [
            "Don't go silent in discussion — silence reads as low confidence.",
            "Don't dominate — speaking too much hurts as much as speaking too little.",
            "Don't argue rudely. Parliamentary language only.",
            "Don't try to reach consensus or summarise — that's not your job.",
          ],
        }}
        olqs={["Power of Expression", "Effective Intelligence", "Social Adaptability", "Cooperation", "Ability to Influence Group"]}
        hardRule="Screening is passed in the DISCUSSION, not the story. Logic, communication and behaviour outweigh content."
        onStart={() => setStarted(true)}
        onBack={() => onNav("dashboard")}
      />
    );
  }
  return <PPDTActive onNav={onNav} />;
}

function PPDTActive({ onNav }) {
  const [chars, setChars] = React.useState([{ age: 24, gender: "M", mood: "Determined" }]);
  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="07" sub="Screening · Manasa + Vacha · PPDT" title="Picture Perception & Description Test."
        meta={<React.Fragment><span>Phase <b>3 / 4</b> · Discussion</span><span>Set <b>PPDT-26-MAY</b></span></React.Fragment>}
      />
      <ProgressDots current={3} total={4} />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1.4fr)", gap: 18, marginTop: 18 }}>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">H.01 · Picture (hazy) · perception</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Image locked</span>
          </div>
          <div style={{ padding: 16, background: "var(--paper-soft)" }}>
            <div style={{ position: "relative" }}>
              <ImgSlot label="PPDT bank · hazy image" height={280}
                style={{ filter: "grayscale(0.4) blur(0.5px)" }} />
            </div>
          </div>
          <div style={{ padding: 16 }}>
            <div className="eyebrow eyebrow-olive">H.02 · Characters perceived</div>
            <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "60px 80px 1fr 24px", gap: 8 }}>
              <div className="eyebrow">Age</div>
              <div className="eyebrow">Gender</div>
              <div className="eyebrow">Mood</div>
              <div></div>
              {chars.map((c, i) => (
                <React.Fragment key={i}>
                  <input className="input" defaultValue={c.age} />
                  <select className="input" defaultValue={c.gender}><option>M</option><option>F</option></select>
                  <input className="input" defaultValue={c.mood} />
                  <button className="btn btn-ghost btn-sm" style={{ padding: 0, width: 24, height: 24, justifyContent: "center" }}>×</button>
                </React.Fragment>
              ))}
            </div>
            <button className="btn btn-ghost btn-sm btn-mono" style={{ marginTop: 10 }} onClick={() => setChars(c => [...c, { age: 22, gender: "F", mood: "Hopeful" }])}>+ add character</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow eyebrow-olive">H.03 · Group discussion simulation</span>
              <span className="chip chip-olive">5 cadets · 8 min</span>
            </div>
            <PPDTDiscussion />
          </div>
        </div>
      </div>
    </div>
  );
}

function PPDTDiscussion() {
  const turns = [
    { who: "You", chest: "06", text: "I saw a 24-year-old engineer who returned to his village to set up a solar pump for the farmers. He convinced the sarpanch in three days and started installation by the weekend." },
    { who: "Cadet 03", chest: "03", text: "I read it differently — I think the character is meeting his estranged father after years. The mood looked reflective to me." },
    { who: "Cadet 04", chest: "04", text: "I lean closer to 06's reading. There's a tool box near him. I'd add that he probably trained the local youth to maintain the pump." },
    { who: "Cadet 01", chest: "01", text: "I think we're overcomplicating it. He's just a tourist." },
    { who: "Coach", chest: "—", text: "06 — agree with 04's point or hold your version. Don't go silent. 5 seconds elapsed." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ maxHeight: 360, overflowY: "auto" }}>
        {turns.map((t, i) => {
          const isYou = t.who === "You";
          const isCoach = t.who === "Coach";
          return (
            <div key={i} style={{
              padding: "10px 16px",
              borderBottom: "1px dashed var(--olive-line)",
              background: isYou ? "rgba(74,93,35,0.04)" : isCoach ? "rgba(197,165,90,0.08)" : "transparent",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: isYou ? "var(--olive)" : isCoach ? "var(--gold-line)" : "var(--ink)" }}>
                  {t.who} {!isCoach && <span className="mono" style={{ color: "var(--ink-4)", fontSize: 11, marginLeft: 6 }}>Chest {t.chest}</span>}
                </span>
                {isCoach && <span className="chip chip-gold">Coach nudge</span>}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>{t.text}</div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: 14, borderTop: "1px solid var(--olive-line)", display: "flex", gap: 8 }}>
        <input className="input" placeholder="Type your point — keep it parliamentary, build on others…" style={{ flex: 1 }} />
        <button className="btn btn-primary">Send</button>
        <button className="btn btn-ghost">🎙 Speak</button>
      </div>
    </div>
  );
}

Object.assign(window, { TATScreen, WATScreen, SRTScreen, SDScreen, PPDTScreen });
