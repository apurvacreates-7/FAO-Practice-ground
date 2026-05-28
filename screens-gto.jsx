/* ====== GTO modules: GD, Lecturette, GPE ====== */

/* ============== GROUP DISCUSSION ============== */
function GDScreen({ onNav }) {
  const [started, setStarted] = React.useState(false);
  if (!started) {
    return (
      <TestBrief
        no="08"
        module="GD"
        pillar="Karma + Vacha"
        title="Group Discussion."
        oneLiner="20 minutes. 4 AI cadets. Pick a lead, defend it with data, and bring the quieter members in before the bell."
        duration="20 min"
        itemCount="1 topic · 3 leads · 5 cadets"
        setLabel="GD-26-MAY"
        phases={[
          { no: "01", label: "Topic shown", time: "instant", body: "Two current-affairs topics are shown. You (the group) pick one." },
          { no: "02", label: "Three leads", time: "instant", body: "Three equally-valid leads are offered. Pick the one you can defend with facts." },
          { no: "03", label: "Discuss",     time: "20 min",  body: "Open chat. AI cadets argue different leads, agree, counter, sometimes drift. You enter early, stay logical, address others." },
          { no: "04", label: "Coach review", time: "auto",   body: "Entry time, number of entries, facts cited, lead consistency, politeness, bringing quiet members in — all scored." },
        ]}
        rules={{
          do: [
            "Enter early — top 3 speakers in the first 5 minutes always score higher.",
            "Back every point with facts, figures, data.",
            "Address other speakers by chest number — build on their points.",
            "Polite, parliamentary language at all times.",
            "Bring the quiet members in around the last 5 minutes — leadership signal.",
            "Hold one lead consistently — switching reads as confused.",
          ],
          dont: [
            "Don't monopolise — speaking 30% of the time hurts.",
            "Don't go silent for 4+ minutes — re-enter even if briefly.",
            "Don't try to summarise or reach consensus — that's not the format.",
            "Don't rebut rudely or talk over others.",
            "Don't pre-load a memorised essay — adapt to what's being said.",
          ],
        }}
        olqs={["Power of Expression", "Effective Intelligence", "Ability to Influence Group", "Social Adaptability", "Self-Confidence", "Cooperation"]}
        hardRule="Weightage is for WHAT you speak, not which lead you pick. All three leads are equally valid."
        onStart={() => setStarted(true)}
        onBack={() => onNav("dashboard")}
      />
    );
  }
  return <GDActive onNav={onNav} />;
}

function GDActive({ onNav }) {
  // Active mid-discussion. 5 cadets, AI participants. Timer 12:43 remaining.
  const [secs, setSecs] = React.useState(12 * 60 + 43);
  React.useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs(s => Math.max(0, s-1)), 1000);
    return () => clearInterval(id);
  }, []);

  const turns = [
    { c: "01", n: "Cadet R. Verma",  lead: "A", t: "Online education is more inclusive — a student in Sikkim can attend the same lecture as one in Delhi. The infrastructure already exists." },
    { c: "02", n: "Cadet K. Iyer",   lead: "C", t: "Inclusion on paper isn't inclusion. 38% of rural students don't have steady 4G. The actual gap widened during the pandemic." },
    { c: "03", n: "Cadet S. Khan",   lead: "B", t: "We need a hybrid model. Treat online as a supplement, not a replacement. Classroom remains the anchor." },
    { c: "06", n: "You",             lead: "C", t: "Building on 02's point — the Annual Status of Education Report shows learning losses of 1.5 years in rural cohorts. Online widens the gap unless we first fix devices and bandwidth." },
    { c: "04", n: "Cadet P. Singh",  lead: "A", t: "Costs come down with scale though. NPTEL already delivers IIT-level content to remote colleges at near-zero marginal cost." },
    { c: "05", n: "Cadet A. Rao",    lead: "B", t: "(silent for 4 min)" },
    { c: "06", n: "You",             lead: "C", t: "I'd ask 05 — what's your read on Cadet 04's NPTEL point? You teach a coding class on weekends, you'd know the access reality." },
  ];

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="08" sub="GTO · Karma · Group Discussion" title="Online education v/s classroom · Lead C."
        meta={<React.Fragment><span>Time <b>{fmtMMSS(secs)}</b> / 20:00</span><span>Cadets 5</span></React.Fragment>}
        right={<button className="btn btn-ghost btn-mono">Stop early</button>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "240px minmax(0, 1.5fr) minmax(0, 1fr)", gap: 18 }}>
        {/* Participants */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--olive-line)" }}>
              <span className="eyebrow eyebrow-olive">I.01 · Cadets</span>
            </div>
            {[
              { c:"01", n:"R. Verma",  lead:"A", style:"Aggressive · 9 entries" },
              { c:"02", n:"K. Iyer",   lead:"C", style:"Analytical · 7 entries" },
              { c:"03", n:"S. Khan",   lead:"B", style:"Balanced · 5 entries" },
              { c:"04", n:"P. Singh",  lead:"A", style:"Dominant · 12 entries" },
              { c:"05", n:"A. Rao",    lead:"B", style:"Quiet · 1 entry", warn: true },
              { c:"06", n:"You",       lead:"C", style:"Steady · 4 entries", you: true },
            ].map((p, i) => (
              <div key={p.c} style={{
                padding: "10px 14px",
                borderBottom: i === 5 ? "none" : "1px dashed var(--olive-line)",
                background: p.you ? "rgba(74,93,35,0.06)" : "transparent",
                borderLeft: p.you ? "3px solid var(--olive)" : "3px solid transparent",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span className="mono" style={{ fontSize: 11, color: "var(--olive)", letterSpacing: "0.12em", border: "1px solid var(--olive-line)", padding: "1px 5px", borderRadius: 2 }}>CH {p.c}</span>
                    <span style={{ fontSize: 13, fontWeight: p.you ? 600 : 500 }}>{p.n}</span>
                  </div>
                  <span className="mono" style={{ fontSize: 10.5, color: "var(--olive)", letterSpacing: "0.12em" }}>{p.lead}</span>
                </div>
                <div className="mono" style={{ fontSize: 10, color: p.warn ? "var(--warning)" : "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>{p.style}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">I.02 · Three leads</span>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
              <LeadRow id="A" t="Online education is the future" picked={false} />
              <LeadRow id="B" t="Classroom remains irreplaceable" picked={false} />
              <LeadRow id="C" t="Hybrid: digital is supplement, not substitute" picked={true} />
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">I.03 · Live transcript</span>
            <span className="chip chip-olive">Live · 7:17 elapsed</span>
          </div>
          <div style={{ maxHeight: 480, overflowY: "auto" }}>
            {turns.map((t, i) => {
              const you = t.c === "06";
              return (
                <div key={i} style={{
                  padding: "14px 18px",
                  borderBottom: "1px dashed var(--olive-line)",
                  background: you ? "rgba(74,93,35,0.04)" : "transparent",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span className="mono" style={{ fontSize: 11, color: "var(--olive)", letterSpacing: "0.12em", border: "1px solid var(--olive-line)", padding: "1px 5px", borderRadius: 2 }}>CH {t.c}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: you ? "var(--olive)" : "var(--ink)" }}>{t.n}</span>
                      <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.12em" }}>Lead {t.lead}</span>
                    </div>
                    <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-4)", letterSpacing: "0.1em" }}>04:1{i}</span>
                  </div>
                  <div style={{ fontSize: 14, color: t.t.startsWith("(") ? "var(--ink-4)" : "var(--ink-2)", marginTop: 6, lineHeight: 1.55, fontStyle: t.t.startsWith("(") ? "italic" : "normal" }}>{t.t}</div>
                </div>
              );
            })}
          </div>
          <div style={{ padding: 14, borderTop: "1px solid var(--olive-line)", display: "flex", gap: 8 }}>
            <input className="input" placeholder="Make your point — back with data, address the last speaker…" style={{ flex: 1 }} />
            <button className="btn btn-primary">Speak</button>
            <button className="btn btn-ghost">🎙</button>
          </div>
        </div>

        {/* Coach side panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">I.04 · Your meta</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
              <MetaTile label="Entries" value="4" sub="rank 4 of 6" />
              <MetaTile label="First entry" value="01:38" sub="good · top 3" tone="ok" />
              <MetaTile label="Lead held" value="C" sub="consistent" tone="ok" />
              <MetaTile label="Facts cited" value="2" sub="ASER, NPTEL" tone="ok" />
            </div>
          </div>
          <div className="card-paper" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">I.05 · Coach nudges (live)</span>
            <div style={{ marginTop: 8, fontSize: 12.5, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 8 }}>
              <Nudge tone="ok" t="Excellent — you invited Chest 05 in. That's leadership without dominance." />
              <Nudge tone="warn" t="You haven't disagreed with Chest 01 yet. Their lead is opposite to yours. Engage." />
              <Nudge tone="warn" t="Last entry 110 seconds ago. Make a structured re-entry." />
            </div>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">I.06 · Lead C · supporting data</span>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>Pre-loaded by you</div>
            <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 12.5, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 4 }}>
              <li>ASER 2024 — 1.5-yr rural learning loss</li>
              <li>NEP-2020 hybrid clause</li>
              <li>NIOS + Diksha — state precedents</li>
              <li>Skill India — vocational hybrid</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadRow({ id, t, picked }) {
  return (
    <div style={{
      display: "flex", gap: 10, alignItems: "flex-start",
      padding: 10, border: "1px solid var(--olive-line)", borderRadius: 2,
      background: picked ? "var(--olive)" : "var(--paper)",
      color: picked ? "#fff" : "var(--ink)",
    }}>
      <span className="mono" style={{ fontSize: 13, color: picked ? "var(--gold)" : "var(--olive)", letterSpacing: "0.1em", fontWeight: 600 }}>LEAD {id}</span>
      <span style={{ fontSize: 12.5, lineHeight: 1.4 }}>{t}</span>
    </div>
  );
}

function MetaTile({ label, value, sub, tone }) {
  const color = tone === "ok" ? "var(--success)" : tone === "warn" ? "var(--warning)" : "var(--ink)";
  return (
    <div style={{ padding: 8, border: "1px solid var(--olive-line)", borderRadius: 2 }}>
      <div className="eyebrow" style={{ fontSize: 9.5 }}>{label}</div>
      <div className="timer-display" style={{ fontSize: 20, marginTop: 2, color }}>{value}</div>
      <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function Nudge({ tone, t }) {
  const color = tone === "ok" ? "var(--success)" : tone === "warn" ? "var(--warning)" : "var(--danger)";
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, marginTop: 7, flexShrink: 0 }}/>
      <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>{t}</div>
    </div>
  );
}

/* ============== LECTURETTE ============== */
function LecturetteScreen({ onNav }) {
  const [started, setStarted] = React.useState(false);
  if (!started) {
    return (
      <TestBrief
        no="09"
        module="Lecturette"
        pillar="Karma + Vacha"
        title="Lecturette · 3 minutes solo."
        oneLiner="Pick one of four topics, prepare for 3 minutes, then speak for 3 minutes — alone, into the camera, with a bell at 02:30."
        duration="~7 min"
        itemCount="4 topics offered · 1 picked"
        setLabel="LEC-26-MAY"
        phases={[
          { no: "01", label: "Topic card", time: "instant", body: "4 topics: easy / medium / hard. Choose with intent — picking easy reads as lacking depth." },
          { no: "02", label: "Prepare",   time: "3 min",   body: "Notepad available. Plan: Intro (30 s) → Body (2 min) → Conclusion (30 s). Or: Past → Present → Future." },
          { no: "03", label: "Speak",     time: "3 min",   body: "Recording starts. Bell at 02:30. Auto-stop at 03:00. Live transcription + coach signals on the side." },
          { no: "04", label: "Coach review", time: "auto", body: "Structure check, fillers count, facts cited, both-sides coverage, vocabulary." },
        ]}
        rules={{
          do: [
            "Pick medium or hard if you can — they score more.",
            "Open with a 30-second intro. End with a 30-second conclusion.",
            "Quality > Quantity. 'Kaam ki baat' — substantive points.",
            "Cite facts, figures, data — at least 2.",
            "Cover both sides of the issue (the lecturette's advantage over GD).",
            "Maintain eye contact with the camera.",
          ],
          dont: [
            "Don't write on your palm. Don't lean on the lectern.",
            "Don't repeat points — be progressive, not circular.",
            "Don't fill with 'umm', 'like', 'you know'. Pause instead.",
            "Don't conclude after the 3-minute bell — auto-stops.",
            "Don't pick the easy topic just to play safe.",
          ],
        }}
        olqs={["Power of Expression", "Effective Intelligence", "Self-Confidence", "Organising Ability", "Liveliness"]}
        hardRule="Three minutes is enough for anyone with a plan. It is not enough for anyone without one."
        onStart={() => setStarted(true)}
        onBack={() => onNav("dashboard")}
      />
    );
  }
  return <LecturetteActive onNav={onNav} />;
}

function LecturetteActive({ onNav }) {
  const [phase, setPhase] = React.useState("speak"); // pick | prep | speak
  const [secs, setSecs] = React.useState(1*60 + 47); // mid speech, 1:47 remaining of 3 min
  React.useEffect(() => {
    if (phase !== "speak") return;
    if (secs <= 0) return;
    const id = setInterval(() => setSecs(s => Math.max(0, s-1)), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const elapsed = 3*60 - secs;
  const bellAt = 2*60 + 30;

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="09" sub="GTO · Karma · Lecturette" title="3 minutes. One topic. Speak."
        meta={<React.Fragment><span>Topic <b>2 of 4</b> chosen</span><span>Set <b>LEC-26-MAY</b></span></React.Fragment>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)", gap: 18 }}>
        {/* Speaking panel */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">J.01 · Speaking · live transcription</span>
            <span className="chip chip-olive">● REC · 24.1 kHz</span>
          </div>
          <div style={{ padding: 24, background: "linear-gradient(180deg, var(--paper-soft), #fff)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div className="eyebrow eyebrow-olive">Topic 2 · Hard</div>
            <div style={{ fontSize: 24, fontWeight: 600, textAlign: "center", letterSpacing: "-0.01em" }}>
              India's Right to Information Act — has it delivered?
            </div>

            {/* Timer + waveform */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16 }}>
              <TimerRing label={fmtMMSS(secs)} value={elapsed} max={3*60} danger={secs <= 20} />
              <Waveform elapsed={elapsed} bell={bellAt} total={180} />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <span className="chip chip-warn">Bell at 02:30</span>
              <span className="chip">Auto-stop at 03:00</span>
            </div>
          </div>

          {/* Transcript */}
          <div style={{ padding: 18, maxHeight: 220, overflowY: "auto", borderTop: "1px solid var(--olive-line)" }}>
            <div className="eyebrow">Live transcript</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginTop: 8, color: "var(--ink-2)" }}>
              The Right to Information Act of 2005 was passed under the UPA government with a clear intent — to make every public authority answerable to the citizen. <span style={{ color: "var(--olive)", fontWeight: 500 }}>In its first decade, more than 30 million RTIs were filed</span>, which is unprecedented in Indian democratic history. The Act covers the union, the states, and any body substantially financed by the government… <span className="mono" style={{ color: "var(--ink-4)", fontSize: 12 }}>(speaking · 73 seconds in)</span>
            </p>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--olive-line)" }}>
              <span className="eyebrow eyebrow-olive">J.02 · The 4 topics offered</span>
            </div>
            <div>
              {[
                { id:"1", lvl:"Easy",   t:"A memorable picnic with my family" },
                { id:"2", lvl:"Hard",   t:"India's Right to Information Act — has it delivered?", picked: true },
                { id:"3", lvl:"Medium", t:"Indo-Russian relations after Ukraine" },
                { id:"4", lvl:"Medium", t:"The case for girl-child education at the panchayat level" },
              ].map(t => (
                <div key={t.id} className="row-hover" style={{
                  padding: "10px 16px",
                  borderBottom: "1px dashed var(--olive-line)",
                  borderLeft: t.picked ? "3px solid var(--olive)" : "3px solid transparent",
                  background: t.picked ? "rgba(74,93,35,0.04)" : "transparent",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span className="mono" style={{ fontSize: 11, color: "var(--olive)" }}>{t.id}</span>
                      <span style={{ fontSize: 13, fontWeight: t.picked ? 600 : 500 }}>{t.t}</span>
                    </div>
                    <span className={"chip " + (t.lvl === "Hard" ? "chip-warn" : t.lvl === "Easy" ? "chip-ok" : "chip-gold")}>{t.lvl}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-paper" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">J.03 · Live coach signals</span>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
              <Nudge tone="ok" t="Structure clean — intro at 18 s, body started at 22 s." />
              <Nudge tone="ok" t="One data point in (30 M filings). Add one more before 02:00." />
              <Nudge tone="warn" t='Filler "umm" detected ×3 in last 30 s. Pause instead.' />
              <Nudge tone="warn" t="You haven't surfaced the counter-argument yet — RTI Amendment 2019." />
            </div>
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow eyebrow-olive">J.04 · Plan card (your 3-min prep)</span>
              <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>locked at 03:00</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.65, fontFamily: "var(--font-mono)" }}>
              <div><b>Intro</b> · what is RTI · 2005 · 30 s</div>
              <div><b>Body 1</b> · scale of usage · 30 M filings · 30 s</div>
              <div><b>Body 2</b> · two wins — Adarsh, 2G traces · 40 s</div>
              <div><b>Body 3</b> · 2019 amendment concern · 30 s</div>
              <div><b>Conclusion</b> · way forward · 20 s</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Waveform({ elapsed = 0, total = 180, bell = 150 }) {
  // simple sampled bars
  const bars = 60;
  const pct = elapsed / total;
  const bellPct = bell / total;
  const seed = [12,18,8,22,30,15,9,18,24,8,33,12,18,9,21,30,12,8,18,24,14,9,28,12,18,8,22,30,15,9,18,24,8,33,12,18,9,21,30,12,8,18,24,14,9,28,18,8,22,30,15,9,18,24,8,33,12,18,9,21];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 60, position: "relative" }}>
      {seed.slice(0, bars).map((h, i) => {
        const past = i / bars <= pct;
        return <div key={i} style={{ width: 3, height: Math.max(4, h), background: past ? "var(--olive)" : "var(--olive-line)" }} />;
      })}
      <div style={{
        position: "absolute", left: `calc(${bellPct * 100}% - 1px)`, top: -6, bottom: -6,
        width: 2, background: "var(--gold)",
      }} />
    </div>
  );
}

/* ============== GPE (map + plan) ============== */
function GPEScreen({ onNav }) {
  const [started, setStarted] = React.useState(false);
  if (!started) {
    return (
      <TestBrief
        no="10"
        module="GPE"
        pillar="Karma"
        title="Group Planning Exercise."
        oneLiner="A map, a narrative, multiple simultaneous problems, fixed resources. Address every problem. Time-distance math must be correct."
        duration="~25 min"
        itemCount="1 scenario · 5 problems · 4 resources"
        setLabel="GPE-26-MAY"
        phases={[
          { no: "01", label: "Read narrative", time: "5 min", body: "Sand-model map shown with landmarks. Narrative read aloud and printed. Take notes." },
          { no: "02", label: "Write plan",     time: "10 min", body: "Individual written plan. Address all problems. Use ALL available resources. Realistic time-distance math." },
          { no: "03", label: "Discussion",     time: "~10 min", body: "Group converges on a common solution. Same rules as GD apply — entry, logic, politeness." },
          { no: "04", label: "Coach review",   time: "auto",   body: "All-problems coverage, prioritisation, math correctness, resource use, realism, structure of plan." },
        ]}
        rules={{
          do: [
            "Address ALL problems mentioned — not just the dramatic ones.",
            "Prioritise: human life first (injured/in-danger), then prevent further damage, then other tasks.",
            "Use ALL available resources (manpower, vehicles, material).",
            "Verify time-distance math. Standard speeds: 4-wheeler 60 km/h metalled / 20 km/h non-metalled.",
            "Realistic time plan — no over-ambitious scheduling.",
            "Take personal action where possible — don't just 'inform authorities'.",
          ],
          dont: [
            "Don't ignore a problem because it's less exciting.",
            "Don't leave resources idle — under-utilisation costs marks.",
            "Don't walk 10 km when a bicycle is available.",
            "Don't write a vague plan — sequential, time-stamped, specific.",
            "Don't delegate everything to the police — the cadet must act.",
          ],
        }}
        olqs={["Effective Intelligence", "Reasoning Ability", "Organising Ability", "Initiative", "Sense of Responsibility", "Self-Confidence"]}
        hardRule="The two phrases that lose marks: 'I informed authorities' and 'time plan over-ambitious'."
        onStart={() => setStarted(true)}
        onBack={() => onNav("dashboard")}
      />
    );
  }
  return <GPEActive onNav={onNav} />;
}

function GPEActive({ onNav }) {
  const [secs, setSecs] = React.useState(6*60 + 14);
  React.useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs(s => Math.max(0, s-1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="10" sub="GTO · Karma · GPE" title="Group Planning Exercise."
        meta={<React.Fragment><span>Phase <b>2 / 3</b> · Individual plan</span><span>Set <b>GPE-26-MAY</b></span></React.Fragment>}
        right={<div className="timer-display" style={{ fontSize: 22 }}>{fmtMMSS(secs)} / 10:00</div>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: 18 }}>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">K.01 · Sand model · scenario K-12</span>
            <div style={{ display: "flex", gap: 6 }}>
              <span className="chip">5 problems</span>
              <span className="chip">4 resources</span>
            </div>
          </div>
          <GPEMap />
          <div style={{ padding: 14, borderTop: "1px solid var(--olive-line)" }}>
            <div className="eyebrow eyebrow-olive">K.02 · Narrative (locked)</div>
            <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.7, marginTop: 8 }}>
              You and your friends are at Point A near the railway station. At 4 PM you observe smoke rising from village V (5 km NE on a metalled road). A radio message confirms a fire in a primary school — 12 children may be trapped. Simultaneously you receive a call: your cousin is in critical condition at the district hospital H (8 km E along a non-metalled road), and a goods train has derailed on the line between A and the bridge B. You have <b>1 jeep, 2 motorbikes, 1 bicycle</b>, and <b>5 friends (incl. one with first-aid training, one a ham radio operator)</b>. The next bus to H leaves A at 5:15 PM.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow eyebrow-olive">K.03 · Your written plan</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>auto-saved · 17:42</span>
            </div>
            <textarea
              className="input"
              defaultValue={`Priority 1 · Fire at school V (12 lives, immediate)\n  · I take jeep + 2 friends (one first-aider) → V via metalled road\n  · 5 km @ 60 km/h = 5 min. Reach by 4:05 PM.\n  · First-aider triages, 2 friends evacuate children to open ground.\n\nPriority 2 · Cousin at H (critical, time-sensitive)\n  · Friend on motorbike 1 → H via non-metalled road\n  · 8 km @ 20 km/h = 24 min. Reach by 4:24 PM. Carries antibiotic kit.\n\nPriority 3 · Goods train derailment (no casualties yet but blocks line)\n  · Ham operator stays at A → contact railway authorities\n  · Cyclist marks the line section to warn next passenger train.\n\nPriority 4 · Bus rendezvous at 5:15 PM\n  · Motorbike 2 brings cousin's documents & cash to bus stop by 5:00.\n\nContingency · If V evacuation needs more hands, motorbike 2 swings to V.`}
              style={{ minHeight: 260, border: "none", borderRadius: 0, padding: 16, fontSize: 13, lineHeight: 1.65, fontFamily: "var(--font-mono)" }}
            />
          </div>

          <div className="card-paper" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">K.04 · Coach checks (silent)</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              <RuleRow ok label="All 5 problems addressed in plan" />
              <RuleRow ok label="Life-threat (fire) prioritised over comms (derailment)" />
              <RuleRow ok label="Time calc verified · jeep · 5 km / 60 km·h⁻¹ = 5 min" />
              <RuleRow warn label="Bicycle (15 km/h on metalled) under-utilised — could carry the railway warning instead of the ham operator" />
              <RuleRow ok label="Resources allocated (1 of 5 friends has medical training — placed correctly)" />
              <RuleRow warn label="No buffer for cousin's status if antibiotic kit insufficient — name a fallback" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GPEMap() {
  // 600x320-ish svg
  return (
    <div style={{ padding: 14, background: "#FAF6EC" }}>
      <svg viewBox="0 0 620 320" width="100%" style={{ display: "block", background: "#FAF6EC" }}>
        {/* grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(74,93,35,0.07)" strokeWidth="1"/>
          </pattern>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M-1,1 l2,-2 M0,6 l6,-6 M5,7 l2,-2" stroke="rgba(74,93,35,0.18)" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="620" height="320" fill="url(#grid)" />
        {/* river */}
        <path d="M0,200 C80,180 160,260 280,220 S480,180 620,200" stroke="#7FA3C6" strokeWidth="14" fill="none" opacity="0.5"/>
        {/* hill */}
        <ellipse cx="500" cy="80" rx="80" ry="36" fill="url(#hatch)" />
        <text x="500" y="80" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fill="var(--olive-dark)" letterSpacing="2">HILL · 380M</text>
        {/* metalled road A → V */}
        <line x1="80" y1="240" x2="380" y2="80" stroke="#3B4A1C" strokeWidth="3"/>
        <line x1="80" y1="240" x2="380" y2="80" stroke="#FFF" strokeWidth="1" strokeDasharray="6 6"/>
        {/* non-metalled road A → H */}
        <line x1="80" y1="240" x2="540" y2="240" stroke="#9A805A" strokeWidth="2" strokeDasharray="4 4"/>
        {/* railway A → B */}
        <line x1="80" y1="270" x2="540" y2="270" stroke="var(--ink)" strokeWidth="3"/>
        <line x1="80" y1="270" x2="540" y2="270" stroke="#fff" strokeWidth="1" strokeDasharray="2 6"/>
        {/* trees */}
        {[[200,60],[230,100],[260,70],[150,120],[180,80]].map((p, i) => (
          <text key={i} x={p[0]} y={p[1]} fontSize="14" fill="rgba(74,93,35,0.5)">♣</text>
        ))}
        {/* markers */}
        {[
          { x:80,  y:240, k:"A", n:"Start · Station" },
          { x:380, y:80,  k:"V", n:"Village (FIRE)", danger: true },
          { x:540, y:240, k:"H", n:"Hospital", warn: true },
          { x:300, y:270, k:"B", n:"Bridge", warn: true },
          { x:140, y:140, k:"R1", n:"Police outpost" },
        ].map(m => (
          <g key={m.k} transform={`translate(${m.x}, ${m.y})`}>
            <circle r="14" fill={m.danger ? "var(--danger)" : m.warn ? "var(--warning)" : "var(--olive)"} stroke="#fff" strokeWidth="2"/>
            <text x="0" y="4" fontSize="11" textAnchor="middle" fill="#fff" fontFamily="JetBrains Mono" fontWeight="600">{m.k}</text>
            <rect x="18" y="-9" width={m.n.length * 6.2 + 8} height="18" fill="#fff" stroke="var(--olive-line)" rx="2"/>
            <text x="22" y="3" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1" fill="var(--ink-2)">{m.n.toUpperCase()}</text>
          </g>
        ))}
        {/* legend */}
        <g transform="translate(20, 295)">
          <line x1="0" y1="0" x2="22" y2="0" stroke="#3B4A1C" strokeWidth="3" />
          <text x="28" y="3" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1" fill="var(--ink-3)">METALLED</text>
          <line x1="100" y1="0" x2="122" y2="0" stroke="#9A805A" strokeWidth="2" strokeDasharray="4 4"/>
          <text x="128" y="3" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1" fill="var(--ink-3)">NON-METAL</text>
          <line x1="220" y1="0" x2="242" y2="0" stroke="var(--ink)" strokeWidth="3"/>
          <text x="248" y="3" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1" fill="var(--ink-3)">RAIL</text>
          <text x="320" y="3" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1" fill="var(--ink-3)">SCALE · 1 sq = 1 KM</text>
        </g>
      </svg>
    </div>
  );
}

Object.assign(window, { GDScreen, LecturetteScreen, GPEScreen });
