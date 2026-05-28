/* ====== Other screens: Interview, OIR, Feedback, PIQ, Fitness ====== */

/* ============== PERSONAL INTERVIEW ============== */
function InterviewScreen({ onNav }) {
  const [started, setStarted] = React.useState(false);
  if (!started) {
    return (
      <TestBrief
        no="11"
        module="Interview"
        pillar="Vacha"
        title="Personal Interview."
        oneLiner="20-minute audio interview, PIQ-driven. Essay-type answers. The AI follows up the moment you sound vague."
        duration="20 min (practice) · 45–60 min (real SSB)"
        itemCount="~30 questions"
        setLabel="INT-26-MAY"
        phases={[
          { no: "01", label: "Mic check", time: "30 s",  body: "Confirm microphone, lighting, and PIQ context is loaded." },
          { no: "02", label: "Live interview", time: "20 min", body: "The IO asks one question at a time. You answer aloud. AI follows up on shallow answers, bluffs, contradictions with your PIQ." },
          { no: "03", label: "Coach review", time: "auto", body: "Per-CIQ scoring (Education, Family, Hobbies, CA, Personality, Motivation). Bluff flags. Specificity score." },
        ]}
        rules={{
          do: [
            "Essay-type answers — give a CONTEXT → ACTION → OUTCOME structure.",
            "Specific examples. Names. Dates. Numbers when possible.",
            "Be truthful — board members spot lies. Consistency with your PIQ is checked.",
            "Be natural. Confident without being over-smart.",
            "Read 10 minutes of current affairs every morning — IO will probe.",
          ],
          dont: [
            "Don't give one-liners — they signal shallow thinking.",
            "Don't bluff on hobbies. If you listed photography, know your camera.",
            "Don't try to 'impress' — be the person your PIQ describes.",
            "Don't conclude mid-interview that it's going badly — keep delivering.",
            "Don't fidget, glance away, or fill silences with 'umm'.",
          ],
        }}
        olqs={["Power of Expression", "Effective Intelligence", "Self-Confidence", "Sense of Responsibility", "Social Adaptability", "Determination"]}
        hardRule="Don't try to be impressive. Try to be the person your PIQ already says you are."
        onStart={() => setStarted(true)}
        onBack={() => onNav("dashboard")}
      />
    );
  }
  return <InterviewActive onNav={onNav} />;
}

function InterviewActive({ onNav }) {
  const [secs, setSecs] = React.useState(14*60 + 22);
  React.useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs(s => Math.max(0, s-1)), 1000);
    return () => clearInterval(id);
  }, []);

  const transcript = [
    { who: "IO", t: "Good morning, Aarav. Tell me about your journey to the board this morning — mode of transport, who you travelled with.", tag: "warm-up" },
    { who: "You", t: "Good morning, sir. I travelled by the Marudhar Express from Jaisalmer to Jodhpur last evening, then a state bus to the centre. My uncle dropped me at the platform. Total journey was 11 hours.", tag: "ok" },
    { who: "IO", t: "Why did you choose Marudhar over the morning AC service? Cost or convenience?", tag: "follow-up" },
    { who: "You", t: "Cost, sir. The AC train would have cost me ₹1,460. Marudhar was ₹325. I am supporting my own coaching from my pocket money this year, so I keep travel cheap.", tag: "ok" },
    { who: "IO", t: "Pocket money — how much do you get and from whom?", tag: "personal" },
    { who: "You", t: "₹2,500 a month from my father. I run two batches of weekend chess coaching for school kids — that adds about ₹3,000.", tag: "ok" },
    { who: "IO", t: "Good. Now — your PIQ says guitar is your hobby. What kind of guitar do you own?", tag: "hobby probe" },
    { who: "You", t: "A Yamaha F310, sir — acoustic, dreadnought body.", tag: "ok" },
    { who: "IO", t: "What is a capo and why would you use one?", tag: "depth probe" },
    { who: "You", t: "A capo is a clamp that shortens the playable length of the strings. It raises the pitch. If a song was written in C and the singer needs it in D, the easy way is to put the capo on the 2nd fret and keep playing C-shaped chords.", tag: "ok", olq: "Effective Intelligence" },
    { who: "IO", t: "Hmm. Last question on this — name one Indian guitarist you study, and one piece of his you can play end-to-end.", tag: "depth probe · cross-check" },
    { who: "You", t: "I follow Prateek Kuhad, sir, but he's not technically a guitarist in the lead sense. I…can play 'Cold/Mess' on rhythm chords. Honestly I haven't gone deep into Indian lead guitarists yet.", tag: "warn", olq: "Honesty", flag: "honest deflection — good, but signals limited depth" },
  ];

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="11" sub="Interview · Vacha · PIQ-driven" title="Personal Interview · live."
        meta={<React.Fragment><span>Elapsed <b>{fmtMMSS(20*60 - secs)}</b> / 20:00</span><span>Q <b>22 / ~30</b></span></React.Fragment>}
        right={<div style={{ display: "flex", gap: 8 }}><button className="btn btn-ghost btn-mono">Pause</button><button className="btn btn-primary btn-mono">End interview</button></div>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr) minmax(0, 1fr)", gap: 18 }}>
        {/* PIQ context */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--olive-line)" }}>
              <span className="eyebrow eyebrow-olive">L.01 · PIQ context · IO sees this</span>
            </div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              <PIQRow k="Entry" v="NDA · Army"/>
              <PIQRow k="Native" v="Jaisalmer, Rajasthan"/>
              <PIQRow k="Father" v="Civil servant · sub-collector"/>
              <PIQRow k="Class 10" v="91% · CBSE"/>
              <PIQRow k="Class 12" v="78% · Science (drop)"/>
              <PIQRow k="Hobby" v="Acoustic guitar · 3 yrs"/>
              <PIQRow k="Sports" v="Football · district level"/>
              <PIQRow k="NCC" v="None"/>
              <PIQRow k="Attempts" v="0 (first attempt)"/>
            </div>
          </div>
          <div className="card-paper" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">L.02 · Pending probe-areas</span>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4, fontSize: 12.5, color: "var(--ink-2)" }}>
              <div>· Class 12 dip — reason</div>
              <div>· Father's posting · transfer impact</div>
              <div>· Football positions & match count</div>
              <div>· "Why Army and not Civil Services?"</div>
              <div>· India-Pakistan western front · CA</div>
              <div>· Backup if not selected</div>
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">L.03 · Live transcript · auto-captioned</span>
            <span className="chip chip-olive">● recording</span>
          </div>
          <div style={{ maxHeight: 480, overflowY: "auto" }}>
            {transcript.map((t, i) => {
              const isYou = t.who === "You";
              return (
                <div key={i} style={{
                  padding: "12px 18px",
                  borderBottom: "1px dashed var(--olive-line)",
                  background: isYou ? "rgba(74,93,35,0.04)" : "transparent",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontWeight: 700, fontSize: 12, color: isYou ? "var(--olive)" : "var(--ink)", letterSpacing: "0.05em" }}>
                      {isYou ? "YOU" : "INTERVIEWING OFFICER"}
                    </span>
                    <span className="chip" style={{ fontSize: 9 }}>{t.tag}</span>
                  </div>
                  <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 6, lineHeight: 1.55 }}>{t.t}</div>
                  {t.flag && (
                    <div className="mono" style={{ fontSize: 10.5, color: "var(--warning)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>
                      ⚐ {t.flag} {t.olq && <span style={{ color: "var(--ink-4)" }}>· {t.olq}</span>}
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, color: "var(--olive)" }}>
              <div className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>IO is composing the next question…</div>
              <Pulse />
            </div>
          </div>
          <div style={{ padding: 14, borderTop: "1px solid var(--olive-line)", background: "var(--paper-soft)", display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--danger)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16 }}>🎙</div>
            <div style={{ flex: 1 }}>
              <Mic />
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Listening · speak when ready</div>
            </div>
            <button className="btn btn-ghost btn-sm btn-mono">Skip Q</button>
          </div>
        </div>

        {/* IO live notes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">L.04 · IO scratch pad</span>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--ink-2)" }}>
              <Note tone="ok" t="Frank about pocket money + side income. Self-supporting." />
              <Note tone="ok" t="Specific train, specific cost. Not hand-waving." />
              <Note tone="ok" t="Knew capo function — earned the hobby claim." />
              <Note tone="warn" t="Couldn't name an Indian lead guitarist. Honest about it — good. Depth is shallow though." />
              <Note tone="ok" t="No bluff detected so far. Cross-check Class 12 dip next." />
            </div>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">L.05 · Per-CIQ score · running</span>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
              <ScoreBar label="Education" v={7.4}/>
              <ScoreBar label="Family"    v={7.6}/>
              <ScoreBar label="Hobbies"   v={6.6}/>
              <ScoreBar label="Current Affairs" v="—" pending />
              <ScoreBar label="Personality" v={7.8}/>
              <ScoreBar label="Motivation" v="—" pending />
            </div>
          </div>
          <div className="card-paper" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">L.06 · Tips · live</span>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
              <Nudge tone="ok" t="Essay-type answers ✓ — keep this depth." />
              <Nudge tone="warn" t='Next IO question will likely be "tell me 3 Indian guitarists you respect". Prepare a structured non-answer if needed.' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PIQRow({ k, v }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 8, fontSize: 12.5 }}>
      <span className="mono" style={{ color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 10.5 }}>{k}</span>
      <span style={{ color: "var(--ink)", fontWeight: 500 }}>{v}</span>
    </div>
  );
}
function Note({ tone, t }) {
  const c = tone === "ok" ? "var(--success)" : tone === "warn" ? "var(--warning)" : "var(--danger)";
  return (
    <div style={{ display: "flex", gap: 8, paddingBottom: 6, borderBottom: "1px dashed var(--olive-line)" }}>
      <div className="mono" style={{ color: c, fontSize: 11, marginTop: 1 }}>·</div>
      <div style={{ fontSize: 12.5, lineHeight: 1.45 }}>{t}</div>
    </div>
  );
}
function ScoreBar({ label, v, pending }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-2)" }}>
        <span>{label}</span>
        <span className="mono">{pending ? "pending" : v.toFixed(1)}</span>
      </div>
      <div className="bar" style={{ marginTop: 4 }}><i style={{ right: pending ? "100%" : `${100 - v*10}%`, background: pending ? "var(--ink-5)" : "var(--olive)" }}></i></div>
    </div>
  );
}
function Pulse() {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: 5, height: 5, borderRadius: "50%", background: "var(--olive)",
          animation: `pulse 1s ${i*0.2}s infinite ease-in-out`,
        }} />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:.3;transform:translateY(0)} 50%{opacity:1;transform:translateY(-2px)} }`}</style>
    </div>
  );
}
function Mic() {
  const bars = [12, 24, 18, 36, 28, 14, 30, 22, 18, 28, 36, 18, 22, 14, 28, 18, 36, 22];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 24 }}>
      {bars.map((h, i) => (
        <div key={i} style={{ width: 2, height: h, background: "var(--olive)", opacity: 0.9, animation: `mic 0.9s ${i*0.05}s infinite ease-in-out` }} />
      ))}
      <style>{`@keyframes mic { 0%,100% { transform: scaleY(0.5); } 50% { transform: scaleY(1); } }`}</style>
    </div>
  );
}

/* ============== OIR ============== */
function OIRScreen({ onNav }) {
  const [started, setStarted] = React.useState(false);
  if (!started) {
    return (
      <TestBrief
        no="12"
        module="OIR"
        pillar="Screening"
        title="Officer Intelligence Rating."
        oneLiner="The test most cadets fail screening on because they take it lightly. Target 90%+. Strict timer. No going back."
        duration="~45 min total"
        itemCount="Verbal 70 + Non-verbal 60"
        setLabel="OIR-26-MAY"
        phases={[
          { no: "01", label: "Test 1 · Verbal", time: "40 min", body: "70 questions. Coding-decoding, blood relations, series, analogies, directions, syllogisms." },
          { no: "02", label: "Test 2 · Non-verbal", time: "30 min", body: "60 questions. Figure series, mirror images, paper folding, embedded figures, dice." },
          { no: "03", label: "Auto-submit",   time: "on expiry", body: "Tests submit automatically when timer runs out. No extensions." },
          { no: "04", label: "Score + breakdown", time: "instant", body: "Per-category accuracy, time per question, weakest category called out." },
        ]}
        rules={{
          do: [
            "Speed matters. Average ~34 seconds per question.",
            "Read the question fully before locking in.",
            "Mark uncertain ones for review and move on.",
            "Eliminate clearly-wrong options first.",
            "Aim for 90%+ accuracy — screening cutoff is typically 85-90%.",
          ],
          dont: [
            "Don't dwell. If you can't see it in 30 seconds, mark and move.",
            "Don't leave any blank — there's no negative marking, attempt everything.",
            "Don't guess randomly on the first pass — use elimination.",
            "Don't ignore the non-verbal half — cadets are weakest there.",
          ],
        }}
        olqs={["Effective Intelligence", "Reasoning Ability", "Speed of Decision", "Determination"]}
        hardRule="OIR is the door. If you don't clear it on Day 1, nothing else you do over the next four days matters."
        onStart={() => setStarted(true)}
        onBack={() => onNav("dashboard")}
      />
    );
  }
  return <OIRActive onNav={onNav} />;
}

function OIRActive({ onNav }) {
  const [secs, setSecs] = React.useState(38*60 + 12);
  React.useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs(s => Math.max(0, s-1)), 1000);
    return () => clearInterval(id);
  }, []);
  const [sel, setSel] = React.useState("C");

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="12" sub="Screening · OIR" title="Officer Intelligence Rating."
        meta={<React.Fragment><span>Test <b>1 · Verbal</b></span><span>Q <b>34 / 70</b></span><span>Set <b>OIR-26-MAY-V</b></span></React.Fragment>}
        right={<div className="timer-display" style={{ fontSize: 22, color: secs < 5*60 ? "var(--danger)" : "var(--ink)" }}>{fmtMMSS(secs)}</div>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 18 }}>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">M.01 · Q34 · Coding-Decoding</span>
            <span className="chip">avg 24 s / q</span>
          </div>
          <div style={{ padding: 28 }}>
            <div style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.55 }}>
              If <span className="mono" style={{ background: "var(--paper-soft)", padding: "2px 6px", border: "1px solid var(--olive-line)" }}>BRIGADE</span> is coded as <span className="mono" style={{ background: "var(--paper-soft)", padding: "2px 6px", border: "1px solid var(--olive-line)" }}>CSJHBEF</span>, how is <span className="mono" style={{ background: "var(--paper-soft)", padding: "2px 6px", border: "1px solid var(--olive-line)" }}>BATTALION</span> coded?
            </div>
            <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { k: "A", t: "CBUUMBJPO" },
                { k: "B", t: "CBUUBKJPO" },
                { k: "C", t: "CBUUBMJPO" },
                { k: "D", t: "CBUUCKKPN" },
              ].map(o => (
                <div key={o.k} onClick={() => setSel(o.k)} className="row-hover" style={{
                  display: "flex", gap: 14, alignItems: "center",
                  padding: 14,
                  border: "1px solid " + (sel === o.k ? "var(--olive)" : "var(--olive-line)"),
                  background: sel === o.k ? "rgba(74,93,35,0.06)" : "#fff",
                  borderRadius: 2,
                }}>
                  <div className="mono" style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: sel === o.k ? "var(--olive)" : "var(--paper-soft)",
                    border: "1px solid " + (sel === o.k ? "var(--olive-dark)" : "var(--olive-line)"),
                    color: sel === o.k ? "#fff" : "var(--ink-2)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600,
                  }}>{o.k}</div>
                  <span className="mono" style={{ fontSize: 16, letterSpacing: "0.05em" }}>{o.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: 14, borderTop: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-sm btn-mono">← Q33</button>
              <button className="btn btn-ghost btn-sm btn-mono">Mark for review</button>
              <button className="btn btn-ghost btn-sm btn-mono">Clear</button>
            </div>
            <button className="btn btn-primary btn-mono">Q35 <Chev /></button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow eyebrow-olive">M.02 · Sheet · 70 questions</span>
              <div style={{ display: "flex", gap: 4 }}>
                <span className="chip chip-ok">attempted 33</span>
                <span className="chip">marked 4</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 4, marginTop: 10 }}>
              {Array.from({ length: 70 }, (_, i) => {
                const n = i + 1;
                const attempted = n < 34;
                const flagged = [12, 18, 22, 31].includes(n);
                const current = n === 34;
                return (
                  <div key={n} style={{
                    aspectRatio: "1",
                    border: "1px solid " + (current ? "var(--olive)" : "var(--olive-line)"),
                    background: current ? "var(--gold)" : flagged ? "#FBE9C3" : attempted ? "var(--olive)" : "#fff",
                    color: attempted && !flagged ? "#fff" : "var(--ink-2)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                  }}>{n}</div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, fontSize: 10.5 }}>
              <LegendDot c="var(--olive)" label="Attempted" />
              <LegendDot c="#FBE9C3" label="Marked" />
              <LegendDot c="#fff" label="Unseen" />
              <LegendDot c="var(--gold)" label="Current" />
            </div>
          </div>
          <div className="card-paper" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">M.03 · Pacing</span>
            <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 4 }}>
              <div className="mono" style={{ display: "flex", justifyContent: "space-between" }}><span>Time per Q · target</span><span>34.3 s</span></div>
              <div className="mono" style={{ display: "flex", justifyContent: "space-between" }}><span>Your average</span><span style={{ color: "var(--success)" }}>24.1 s</span></div>
              <div className="mono" style={{ display: "flex", justifyContent: "space-between" }}><span>Projected attempts</span><span style={{ color: "var(--success)" }}>70 / 70</span></div>
              <div className="mono" style={{ display: "flex", justifyContent: "space-between" }}><span>Projected score</span><span style={{ color: "var(--olive)" }}>~62 / 70</span></div>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "var(--ink-3)" }}>
              Screening cutoff typically 60–63 / 70. You're at the edge. Push on the last 15.
            </div>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">M.04 · Category breakdown</span>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
              <CatBar label="Coding-decoding" v={88} />
              <CatBar label="Analogies" v={92} />
              <CatBar label="Series" v={70} tone="warn" />
              <CatBar label="Blood relations" v={84} />
              <CatBar label="Syllogisms" v={62} tone="warn" />
              <CatBar label="Directions" v={90} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function LegendDot({ c, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ width: 10, height: 10, border: "1px solid var(--olive-line)", background: c }} />
      <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)" }}>{label}</span>
    </div>
  );
}
function CatBar({ label, v, tone }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-2)" }}>
        <span>{label}</span>
        <span className="mono" style={{ color: tone === "warn" ? "var(--warning)" : "var(--olive)" }}>{v}%</span>
      </div>
      <div className="bar" style={{ marginTop: 4 }}><i style={{ right: `${100-v}%`, background: tone === "warn" ? "var(--warning)" : "var(--olive)" }}></i></div>
    </div>
  );
}

/* ============== FEEDBACK SCREEN ============== */
function FeedbackScreen({ onNav, module = "TAT" }) {
  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="03·F" sub={"Coach Report · " + module} title="Story-by-story feedback."
        meta={<React.Fragment><span>Set <b>TAT-26-MAY-B</b></span><span>Submitted <b>21:46 IST</b></span></React.Fragment>}
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-ghost btn-mono">Download PDF</button>
            <button className="btn btn-primary btn-mono" onClick={() => onNav("tat")}>Retry set</button>
          </div>
        }
      />

      {/* Top score banner */}
      <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 0 }}>
          <div style={{ padding: 22, background: "var(--olive)", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
            <div className="eyebrow" style={{ color: "var(--gold)" }}>Set score</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <div className="timer-display" style={{ fontSize: 64, color: "#fff", lineHeight: 1 }}>6.8</div>
              <div className="mono" style={{ color: "rgba(255,255,255,0.6)" }}>/ 10</div>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase" }}>+ 0.6 vs last set</div>
          </div>
          <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="eyebrow eyebrow-olive">N.01 · Coach summary</div>
            <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6 }}>
              Your structure is solid — 11 of 12 stories had a named hero with a positive theme. Where you're losing marks is the <b>action ratio</b>: you describe the setting in 25–30% of the words and that leaves too little room for what your hero <i>did</i>. Two stories had your hero working <b>alone</b> on a problem that obviously needed a team. Tighten the descriptive opener, name two collaborators, and you're at an 8.
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <OLQChip name="Initiative" status="good" />
              <OLQChip name="Effective Intelligence" status="good" />
              <OLQChip name="Determination" status="good" />
              <OLQChip name="Cooperation" status="miss" />
              <OLQChip name="Organising Ability" status="good" />
              <OLQChip name="Power of Expression" status="good" />
              <OLQChip name="Social Adaptability" status="miss" />
            </div>
          </div>
        </div>
      </div>

      {/* Story 1 deep feedback */}
      <SectionHead no="N.02" title="Story-by-story" action={<button className="btn btn-ghost btn-sm btn-mono">Open all</button>} />
      <StoryFeedback />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
        <RuleTallyCard />
        <RewriteCard />
      </div>

      <SectionHead no="N.03" title="3-D Mirror · this set vs your other modules" />
      <div className="card" style={{ padding: 18 }}>
        <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.6 }}>
          Your TAT heroes worked alone in 9 of 14 sessions over the last 30 days. Your <b>SD</b> calls you a team player and your <b>GD</b> entries explicitly invite quieter cadets in. That's a Manasa-vs-Vacha gap. Two ways to close it:
        </div>
        <ol style={{ marginTop: 10, paddingLeft: 18, fontSize: 13.5, color: "var(--ink-2)" }}>
          <li>In tomorrow's TAT, deliberately write a story where the hero <i>finds the right people</i> first, then acts.</li>
          <li>Soften the "natural team player" line in your SD with a real solo-tendency caveat — the IO will respect honesty over polish.</li>
        </ol>
      </div>
    </div>
  );
}

function StoryFeedback() {
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--olive)", letterSpacing: "0.12em" }}>Story · 04 / 12</span>
          <span className="chip chip-gold">Best of set · 8.4</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-ghost btn-sm btn-mono">← 03</button>
          <button className="btn btn-ghost btn-sm btn-mono">05 →</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 280px", gap: 0 }}>
        <div style={{ padding: 14, borderRight: "1px solid var(--olive-line)" }}>
          <ImgSlot label="Story 4 picture · TAT bank #B-04" height={140} style={{ filter: "grayscale(0.5)" }} />
          <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>30 s observe · 4 min write</div>
          <div style={{ marginTop: 8, fontSize: 12, color: "var(--ink-2)" }}>Word count <b>98 / 90–110</b> ✓</div>
          <div style={{ fontSize: 12, color: "var(--ink-2)" }}>Action ratio <b>71%</b> · target 75%</div>
        </div>
        <div style={{ padding: 18 }}>
          <div style={{ fontSize: 14.5, color: "var(--ink)", lineHeight: 1.75 }}>
            <Hi tone="ok">Arjun, a 22-year-old IIT graduate,</Hi> returned to his drought-hit village in western Rajasthan after seeing the parched fields from the train window. He met the sarpanch the next morning and proposed a low-cost drip-irrigation cooperative funded by a state grant <Hi tone="ok">he had researched</Hi>. He rallied twelve farmers, mapped the borewells, drew up rotation schedules and trained the youth on the new pipes. <Hi tone="warn">Within three months the kharif sowing was back on track and the village had its first surplus in five years.</Hi>
          </div>
          <div className="divider-rule" style={{ margin: "16px 0 10px" }}>Inline reasoning</div>
          <Inline tone="ok"  quote="Arjun, a 22-year-old IIT graduate" t="Named hero with clear high status — meets the SSB benchmark." />
          <Inline tone="ok"  quote="he had researched"                  t="Initiative shown before action — strong OLQ signal." />
          <Inline tone="warn" quote="Within three months… surplus"     t="Outcome summary is too compressed. Replace with two specific actions to push action-ratio to ≥75%." />
        </div>
        <div style={{ padding: 18, borderLeft: "1px solid var(--olive-line)", background: "var(--paper-soft)" }}>
          <div className="eyebrow eyebrow-olive">Score · 8.4 / 10</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
            <Scoreline label="Theme positive" v={10} />
            <Scoreline label="Word count" v={10} />
            <Scoreline label="Past tense" v={10} />
            <Scoreline label="Hero named + status" v={10} />
            <Scoreline label="Action %" v={7} />
            <Scoreline label="Cooperation visible" v={6} />
            <Scoreline label="Formality of language" v={8} />
            <Scoreline label="Fits the picture" v={9} />
          </div>
          <div className="divider" style={{ margin: "12px 0" }}></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <OLQChip name="Initiative" status="good" />
            <OLQChip name="Org. Ability" status="good" />
            <OLQChip name="Determination" status="good" />
            <OLQChip name="Cooperation" status="miss" />
          </div>
        </div>
      </div>
    </div>
  );
}
function Hi({ tone, children }) {
  const c = tone === "ok" ? "rgba(46,125,50,0.18)" : tone === "warn" ? "rgba(245,127,23,0.18)" : "rgba(198,40,40,0.18)";
  return <span style={{ background: c, borderRadius: 2, padding: "1px 3px" }}>{children}</span>;
}
function Inline({ tone, quote, t }) {
  const c = tone === "ok" ? "var(--success)" : tone === "warn" ? "var(--warning)" : "var(--danger)";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "8px 1fr", gap: 10, padding: "6px 0", fontSize: 13 }}>
      <div style={{ background: c, height: "100%", borderRadius: 1, marginTop: 5, alignSelf: "stretch" }}/>
      <div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>“{quote}”</div>
        <div style={{ color: "var(--ink-2)", marginTop: 2 }}>{t}</div>
      </div>
    </div>
  );
}
function Scoreline({ label, v }) {
  const ok = v >= 8;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--ink-2)" }}>
        <span>{label}</span>
        <span className="mono">{v}/10</span>
      </div>
      <div className="bar" style={{ marginTop: 3, height: 4 }}>
        <i style={{ right: `${100-v*10}%`, background: ok ? "var(--olive)" : "var(--warning)" }}/>
      </div>
    </div>
  );
}

function RuleTallyCard() {
  return (
    <div className="card" style={{ padding: 16 }}>
      <span className="eyebrow eyebrow-olive">N.02·A · Rule tally · this set</span>
      <table style={{ width: "100%", fontSize: 12.5, marginTop: 10, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--olive-line)" }}>
            {["Rule", "Pass", "Warn", "Fail"].map((h, i) => (
              <th key={i} style={{ textAlign: i === 0 ? "left" : "right", padding: "6px 0", fontWeight: 500, color: "var(--ink-3)", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Theme positive", 12, 0, 0],
            ["Word count 90–110", 10, 2, 0],
            ["Past tense", 12, 0, 0],
            ["Hero named, realistic", 12, 0, 0],
            ["Action ≥ 75%", 6, 5, 1],
            ["No negative words", 11, 1, 0],
            ["Cooperation present", 3, 4, 5],
            ["Formal language", 9, 3, 0],
          ].map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px dashed var(--olive-line)" }}>
              <td style={{ padding: "8px 0" }}>{r[0]}</td>
              <td className="mono" style={{ textAlign: "right", color: "var(--success)" }}>{r[1]}</td>
              <td className="mono" style={{ textAlign: "right", color: "var(--warning)" }}>{r[2]}</td>
              <td className="mono" style={{ textAlign: "right", color: r[3] > 0 ? "var(--danger)" : "var(--ink-4)" }}>{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function RewriteCard() {
  return (
    <div className="card-paper" style={{ padding: 16 }}>
      <span className="eyebrow eyebrow-olive">N.02·B · Worst-of-set rewrite</span>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>Story 09 · scored 4.6</div>
      <div style={{ marginTop: 10 }}>
        <div className="eyebrow">Your version</div>
        <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4, lineHeight: 1.55, padding: 10, background: "#fff", border: "1px solid var(--olive-line)" }}>
          The man was looking at the river. He was sad because his factory closed. He thought about what to do next. He decided to start farming. He worked hard and was successful one year later.
        </div>
        <div className="eyebrow" style={{ marginTop: 12 }}>Coach rewrite</div>
        <div style={{ fontSize: 13, color: "var(--ink)", marginTop: 4, lineHeight: 1.6, padding: 10, background: "#fff", border: "1px solid var(--olive-line)" }}>
          <b>Vikram, 38</b>, an engineer whose textile unit had shut, watched the canal water at dawn. He visited the agriculture officer that afternoon, secured a soil report and rented two acres of fallow land from the panchayat. He pooled six retrenched workers, divided shifts between drip-irrigation and seedlings, and personally trained them on the pump. Within one season the unit had its first vegetable consignment ready for the mandi.
        </div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--olive)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>
          Why this works · named hero · action ratio 86% · 6 collaborators · specific verbs
        </div>
      </div>
    </div>
  );
}

/* ============== PIQ FORM ============== */
function PIQScreen({ onNav }) {
  const [step, setStep] = React.useState(3);
  const steps = [
    { n: "01", t: "Basic Info" },
    { n: "02", t: "Education" },
    { n: "03", t: "SSB Specific" },
    { n: "04", t: "Hobbies & ECA" },
    { n: "05", t: "Self-Assessment" },
  ];
  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="13" sub="Profile · PIQ Form" title="Personal Information Questionnaire."
        meta={<React.Fragment><span>Completion <b>82%</b></span><span>Last edit <b>D-2</b></span></React.Fragment>}
        right={<div style={{ display: "flex", gap: 8 }}><button className="btn btn-ghost btn-mono">Cancel</button><button className="btn btn-primary btn-mono">Save & continue <Chev /></button></div>}
      />

      {/* Step rail */}
      <div className="card" style={{ padding: 14, marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 0 }}>
          {steps.map((s, i) => {
            const done = i < step - 1, active = i === step - 1;
            return (
              <div key={s.n} onClick={() => setStep(i + 1)} className="row-hover" style={{
                flex: 1, padding: "10px 12px",
                borderLeft: i === 0 ? "none" : "1px solid var(--olive-line)",
                background: active ? "var(--olive)" : done ? "rgba(74,93,35,0.08)" : "#fff",
                color: active ? "#fff" : "var(--ink)",
                display: "flex", gap: 10, alignItems: "center",
              }}>
                <span className="mono" style={{ fontSize: 11, color: active ? "var(--gold)" : "var(--olive)", letterSpacing: "0.12em" }}>{s.n}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{s.t}</div>
                  <div className="mono" style={{ fontSize: 10, color: active ? "rgba(255,255,255,0.7)" : "var(--ink-4)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>{done ? "complete" : active ? "in progress" : "pending"}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <span className="eyebrow eyebrow-olive">O.0{step} · SSB Specific</span>
        <h2 className="h-card" style={{ marginTop: 4, fontSize: 20 }}>Tell us what you're applying for.</h2>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>
          This drives the question bank for your interview, OIR cut-offs, and trainability expectations.
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="form-row">
            <label>Entry type</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["NDA", "CDS", "TES", "SSC(T)", "AFCAT", "TGC", "NCC Special"].map(e => (
                <button key={e} className={"chip " + (e === "NDA" ? "chip-olive" : "")}>{e}</button>
              ))}
            </div>
          </div>
          <div className="form-row">
            <label>Preferred service</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { n: "Army", c: "chip-olive", icon: "✦" },
                { n: "Navy", c: "", icon: "⚓" },
                { n: "Air Force", c: "", icon: "✈" },
              ].map(s => (
                <button key={s.n} className={"chip " + s.c} style={{ padding: "8px 14px" }}>
                  <span style={{ fontSize: 12, marginRight: 4 }}>{s.icon}</span>{s.n}
                </button>
              ))}
            </div>
          </div>
          <div className="form-row">
            <label>Previous attempts</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["0", "1", "2", "3+"].map(a => (
                <button key={a} className={"chip mono " + (a === "0" ? "chip-olive" : "")} style={{ padding: "6px 14px" }}>{a}</button>
              ))}
            </div>
          </div>
          <div className="form-row">
            <label>Why armed forces?</label>
            <textarea className="input" rows={4} defaultValue="My maternal uncle was an NCO with the Para SF. Growing up I saw the way the village welcomed him every time he came home — and the discipline he carried into civilian life. The forces are the one career where the job and the person have to be the same. I'd like that pressure." />
          </div>
          <div className="form-row">
            <label>Who inspired you?</label>
            <input className="input" defaultValue="Lt. Gen. Hanut Singh (Poonchhwala) and my maternal uncle Hav. R. Rathore." />
          </div>
          <div className="form-row" style={{ borderBottom: "none" }}>
            <label>SSB date (target)</label>
            <input className="input" type="date" defaultValue="2026-07-09" style={{ maxWidth: 200 }} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 18, borderTop: "1px solid var(--olive-line)" }}>
          <button className="btn btn-ghost btn-mono" onClick={() => setStep(s => Math.max(1, s - 1))}>← Back</button>
          <button className="btn btn-primary btn-mono" onClick={() => setStep(s => Math.min(5, s + 1))}>Save & continue <Chev /></button>
        </div>
      </div>
    </div>
  );
}

/* ============== FITNESS ============== */
function FitnessScreen({ onNav }) {
  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead no="14" sub="Profile · Fitness Tracker" title="GTO physical readiness."
        meta={<React.Fragment><span>D-Day SSB <b>42</b></span><span>BMI <b>22.4</b></span></React.Fragment>}
        right={<button className="btn btn-primary btn-mono">Log today's session</button>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard label="2.5 km run · best" value="11:42" sub="target sub-12 ✓" tone="ok" />
        <StatCard label="Push-ups / min" value="42" sub="+4 vs last week" tone="ok" />
        <StatCard label="Pull-ups" value="8" sub="target 12" tone="warn" />
        <StatCard label="Rope climb" value="6 m" sub="target 9 m" tone="warn" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: 18 }}>
        <div className="card" style={{ padding: 18 }}>
          <span className="eyebrow eyebrow-olive">P.01 · Today's prescription · auto-progressed</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 12 }}>
            {[
              { t: "Warm-up", e: "Skipping · 5 min · easy pace", done: true },
              { t: "Run",     e: "1.6 km @ steady, 800 m @ tempo, 400 m @ sprint", done: true },
              { t: "Upper",   e: "Pull-ups · 5×6 + 1×AMRAP (last week: 5×5 + 1×7)", done: false },
              { t: "Core",    e: "Plank ladder · 30/45/60/45/30 s · 2 rounds", done: false },
              { t: "Skill",   e: "Rope climb · 4 attempts · target 7 m today", done: false },
              { t: "Cool-down", e: "Static stretches · 8 min", done: false },
            ].map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "24px 100px 1fr 80px", gap: 12, padding: "12px 0", borderBottom: "1px dashed var(--olive-line)", alignItems: "center" }}>
                <input type="checkbox" defaultChecked={r.done} />
                <span className="mono" style={{ fontSize: 11, color: "var(--olive)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{r.t}</span>
                <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{r.e}</span>
                <span className={"chip " + (r.done ? "chip-ok" : "")}>{r.done ? "Done" : "Pending"}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--olive-line)" }}>
            <div className="eyebrow">Adapted from yesterday's load</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-mono btn-sm">Substitute exercise</button>
              <button className="btn btn-ghost btn-mono btn-sm">Mark all done</button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 18 }}>
            <span className="eyebrow eyebrow-olive">P.02 · Run history · 14 d</span>
            <div style={{ marginTop: 10, display: "flex", alignItems: "flex-end", gap: 4, height: 80 }}>
              {[13.5, 13.4, 13.2, 13.4, 13.1, 13.0, 12.8, 13.0, 12.7, 12.5, 12.3, 12.4, 11.9, 11.7].map((v, i) => {
                const h = ((14 - v) / 3) * 100;
                return <div key={i} style={{ flex: 1, height: `${h}%`, background: v < 12 ? "var(--olive)" : v < 13 ? "var(--gold)" : "var(--ink-5)", border: "1px solid rgba(0,0,0,0.05)" }} />;
              })}
            </div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 8, display: "flex", justifyContent: "space-between" }}>
              <span>14 d ago · 13:30</span>
              <span style={{ color: "var(--success)" }}>Today · 11:48 ▼</span>
            </div>
          </div>
          <div className="card" style={{ padding: 18 }}>
            <span className="eyebrow eyebrow-olive">P.03 · BMI band</span>
            <div style={{ marginTop: 8 }}>
              <BMIBar v={22.4} />
            </div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 10 }}>
              Height 174 cm · Weight 68 kg · Within optimal band
            </div>
          </div>
          <div className="card-paper" style={{ padding: 14 }}>
            <span className="eyebrow eyebrow-olive">P.04 · GTO obstacle ladder</span>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5 }}>
              {[
                ["Single ramp", true],
                ["Double ditch", true],
                ["Tarzan swing", true],
                ["Tiger leap", false],
                ["Burma bridge", false],
                ["High screen jump", false],
              ].map(([n, ok], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{i + 1}. {n}</span>
                  <span className={"chip " + (ok ? "chip-ok" : "chip-warn")}>{ok ? "Ready" : "Drill"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function BMIBar({ v }) {
  // 16 .. 35 range
  const pct = ((v - 16) / (35 - 16)) * 100;
  return (
    <div>
      <div style={{ position: "relative", height: 14, background: "linear-gradient(90deg, #FBE9C3 0 18%, #DBE8D5 18% 50%, #DBE8D5 50% 60%, #FBE9C3 60% 75%, #F3D1D1 75% 100%)", border: "1px solid var(--olive-line)" }}>
        <div style={{ position: "absolute", left: `${pct}%`, top: -4, bottom: -4, width: 2, background: "var(--olive)" }} />
        <div style={{ position: "absolute", left: `calc(${pct}% - 12px)`, top: -26, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--olive)", fontWeight: 600 }}>{v}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        <span>16</span><span>18.5</span><span>25</span><span>30</span><span>35</span>
      </div>
    </div>
  );
}

Object.assign(window, { InterviewScreen, OIRScreen, FeedbackScreen, PIQScreen, FitnessScreen });
