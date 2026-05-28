/* ====== Core screens: Dashboard, Briefing, Progress ====== */

/* ============== DASHBOARD ============== */
function Dashboard({ onNav }) {
  return (
    <div className="page">
      <PageHead
        no="00"
        sub="Today's Operations Brief"
        title="Good morning, Cadet Aarav."
        meta={
          <React.Fragment>
            <span>D-Day <b>SSB 42</b></span>
            <span>Streak <b>17</b></span>
            <span>Sessions <b>148</b></span>
          </React.Fragment>
        }
      />

      {/* === Top: Today's Mission + KPIs === */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.45fr) minmax(0, 1fr)", gap: 18 }}>
        <TodaysMission onNav={onNav} />
        <KPIStack />
      </div>

      {/* === HERO: Questions You Should Be Prepared For === */}
      <SectionHead
        no="A.01"
        title="Questions You Should Be Prepared For"
        action={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="eyebrow">Derived from your PIQ · refreshed 06:14 IST</span>
            <button className="btn btn-ghost btn-sm btn-mono">Regenerate</button>
          </div>
        }
      />
      <QuestionsGrid />

      {/* === Two col: Briefing + Fitness === */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.45fr) minmax(0, 1fr)", gap: 18, marginTop: 24 }}>
        <DailyBriefingCard onNav={onNav} />
        <FitnessSnapshot onNav={onNav} />
      </div>

      {/* === OLQ Profile + Recent Activity === */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)", gap: 18, marginTop: 24 }}>
        <OLQConsistency />
        <RecentActivity />
      </div>

      {/* === Quick practice === */}
      <SectionHead no="A.06" title="Quick Practice" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <ModuleCard no="03" kind="Psychology · Manasa" name="TAT — 12 stories" time="~55 min" accent={{cls:"chip-gold", text:"Due"}} onClick={() => onNav("tat")} />
        <ModuleCard no="04" kind="Psychology · Manasa" name="WAT — 60 words" time="15 min" score="7.2" onClick={() => onNav("wat")} />
        <ModuleCard no="05" kind="Psychology · Manasa" name="SRT — 60 situations" time="30 min" score="6.4" onClick={() => onNav("srt")} />
        <ModuleCard no="11" kind="Interview · Vacha" name="Personal Interview" time="20 min" score="7.8" onClick={() => onNav("interview")} />
      </div>
    </div>
  );
}

function TodaysMission({ onNav }) {
  return (
    <div className="card-olive" style={{ padding: 22, position: "relative", overflow: "hidden", minHeight: 220 }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(135deg, transparent 49%, rgba(255,255,255,0.04) 50%, transparent 51%)",
        backgroundSize: "10px 10px",
        pointerEvents: "none",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
        <div>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>A.00 · Today's Mission</div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 6, letterSpacing: "-0.015em" }}>
            Close the gap on <span style={{ color: "var(--gold)" }}>SRT initiative</span>.
          </div>
          <div style={{ marginTop: 8, color: "rgba(255,255,255,0.78)", fontSize: 13, maxWidth: 480 }}>
            Your last 3 SRT sets show a passive pattern — you delegated in 22 of 60 responses.
            We've cued a focused 30-situation set + WAT refresh, then a 10-min review with the coach engine.
          </div>
        </div>
        <span className="stamp stamp-gold" style={{ background: "rgba(197,165,90,0.08)" }}>Priority · 01</span>
      </div>

      <div style={{ display: "flex", gap: 24, marginTop: 18, position: "relative", flexWrap: "wrap" }}>
        <MissionStep n="01" label="SRT focus · 30 situations" time="15:00" />
        <MissionStep n="02" label="WAT · negative-word set" time="08:00" />
        <MissionStep n="03" label="Coach review · pattern read" time="10:00" />
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 18, position: "relative" }}>
        <button className="btn btn-gold" onClick={() => onNav("srt")}>Begin mission <Chev /></button>
        <button className="btn btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>Reschedule</button>
      </div>
    </div>
  );
}

function MissionStep({ n, label, time }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <span className="mono" style={{ color: "var(--gold)", fontSize: 11, letterSpacing: "0.15em" }}>{n}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
        <div className="mono" style={{ fontSize: 10.5, color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em" }}>{time}</div>
      </div>
    </div>
  );
}

function KPIStack() {
  const olq = [
    { name: "Initiative", value: 7.2, trend: [5,5.5,6,6.2,6.8,7,7.2] },
    { name: "Cooperation", value: 5.8, trend: [6.5,6.3,6.1,5.9,5.9,5.8,5.8] },
    { name: "Decision Speed", value: 6.4, trend: [5,5.4,5.6,6,6.2,6.3,6.4] },
    { name: "Expression", value: 7.6, trend: [6,6.4,6.8,7,7.2,7.4,7.6] },
  ];
  return (
    <div className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14, minHeight: 220 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow eyebrow-olive">A.0X · OLQ Trendline · 7-day</span>
        <span className="chip chip-ok">Improving</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {olq.map(o => (
          <div key={o.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 12, color: "var(--ink-2)", fontWeight: 500 }}>{o.name}</span>
              <span className="mono" style={{ fontSize: 12, color: "var(--ink)" }}>{o.value.toFixed(1)}</span>
            </div>
            <Spark data={o.trend} w={140} h={22} />
          </div>
        ))}
      </div>
      <div className="divider" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="eyebrow">3-D Consistency</div>
        <div style={{ display: "flex", gap: 6 }}>
          <span className="chip chip-ok">Manasa · 7.1</span>
          <span className="chip chip-warn">Karma · 6.0</span>
          <span className="chip chip-ok">Vacha · 7.4</span>
        </div>
      </div>
    </div>
  );
}

/* === Questions You Should Be Prepared For === */
function QuestionsGrid() {
  const cats = [
    {
      tag: "Native State", source: "PIQ § Bareilly, Rajasthan",
      qs: [
        "What is the strategic significance of the Thar Desert for India's western defence?",
        "Name three Indian Army regiments raised from Rajasthan and their battle honours.",
        "Why does Jaisalmer host one of the Air Force's key forward bases?",
        "What is the difference between Rajputana Rifles and the Rajput Regiment?",
      ],
      stamp: { cls: "chip-olive", text: "Hot · 04 likely" },
    },
    {
      tag: "Hobby · Guitar", source: "PIQ § Hobbies & Interests",
      qs: [
        "What is a capo and how does it change the playable key?",
        "Difference between rhythm and lead — which do you play and why?",
        "Name two Indian guitarists you study and one piece you can perform end-to-end.",
        "How do open chords differ in tone from barre chords for the same shape?",
      ],
      stamp: { cls: "chip-gold", text: "Depth check" },
    },
    {
      tag: "Education · Class 12 dip", source: "PIQ § 78% (drop from 91%)",
      qs: [
        "Walk us through the year your marks slipped. What was happening at home and at school?",
        "What did you change in your study method after Class 11?",
        "Which subject pulled the average down, and is that subject still a weak spot today?",
      ],
      stamp: { cls: "chip-warn", text: "Vulnerability" },
    },
    {
      tag: "Entry · NDA", source: "PIQ § Preferred Service · Army",
      qs: [
        "Why NDA and not pursue graduation first and try CDS?",
        "Outside parades and movies, name three things you actually know about life at the NDA.",
        "If you fail medicals for Army, are you willing to be allotted Navy or Air Force? Why?",
      ],
      stamp: { cls: "chip-ok", text: "Standard" },
    },
    {
      tag: "Family · Father · Civil servant", source: "PIQ § Family Background",
      qs: [
        "Your father chose civil services. Why did you choose the uniform instead?",
        "What does your mother feel about you joining a combat arm? Be specific.",
        "Of your siblings, who is most like you in temperament, and how?",
      ],
      stamp: { cls: "chip-ok", text: "Standard" },
    },
    {
      tag: "Current Affairs · Neighbourhood", source: "Geo-political watch · last 30d",
      qs: [
        "What changed in India-Bangladesh relations over the past 6 months?",
        "Explain the Siachen ceasefire claim and why India did not accept it.",
        "Which Quad exercise was held this quarter, and what did India deploy?",
      ],
      stamp: { cls: "chip-gold", text: "Refreshed today" },
    },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
      {cats.map((c, i) => (
        <div key={i} className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, minHeight: 240 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">{c.tag}</span>
            <span className={"chip " + c.stamp.cls}>{c.stamp.text}</span>
          </div>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-4)", textTransform: "uppercase" }}>{c.source}</div>
          <ol style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.45 }}>
            {c.qs.map((q, j) => <li key={j}>{q}</li>)}
          </ol>
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8 }}>
            <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{c.qs.length} prompts</span>
            <button className="btn btn-ghost btn-sm btn-mono">Drill <Chev /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

function DailyBriefingCard({ onNav }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--olive-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow eyebrow-olive">A.02 · Morning Briefing · 06:00 IST</span>
        <button className="btn btn-ghost btn-sm btn-mono" onClick={() => onNav("briefing")}>Open briefing <Chev /></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)", gap: 0 }}>
        <div style={{ padding: 18, borderRight: "1px solid var(--olive-line)" }}>
          <ImgSlot label="Col Sharma · today's drill" height={150} />
          <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600 }}>“Initiative is not aggression. It is the smallest move you take before being asked.”</div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>
            Day 31 · Psychology · 4 min 12 s
          </div>
        </div>
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="eyebrow">Current Affairs · Top 3 for SSB</div>
          <CABullet
            tag="Defence"
            title="India clears AMCA Mk-2 prototype timeline"
            body="DAC approves indigenous fifth-gen prototype build by FY28; HAL named lead integrator."
            qs={["Difference between AMCA Mk-1 and Mk-2?", "Why fifth-gen matters for theatre command?"]}
          />
          <CABullet
            tag="Geopolitics"
            title="India–Maldives recalibration"
            body="Hydrography MOU revived; military advisors replaced by civilian technicians."
            qs={["What was the original 2024 dispute about?", "How does this affect IOR posture?"]}
          />
          <CABullet
            tag="Economy"
            title="Defence exports cross ₹26,000 cr"
            body="Brahmos, AKM-203 lines drive growth; Vietnam, Philippines top buyers."
            qs={["Who are top 3 buyers of Indian defence equipment?"]}
          />
        </div>
      </div>
    </div>
  );
}

function CABullet({ tag, title, body, qs }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingBottom: 10, borderBottom: "1px dashed var(--olive-line)" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span className="chip">{tag}</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{title}</span>
      </div>
      <div style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{body}</div>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Likely Qs · {qs.join(" / ")}
      </div>
    </div>
  );
}

function FitnessSnapshot({ onNav }) {
  return (
    <div className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow eyebrow-olive">A.03 · Fitness · GTO Prep</span>
        <button className="btn btn-ghost btn-sm btn-mono" onClick={() => onNav("fitness")}>Log session <Chev /></button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="eyebrow">Target · 2.5 km</div>
          <div className="timer-display" style={{ fontSize: 32 }}>11:48</div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Last run · D-3 · 12:18</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="eyebrow">BMI</div>
          <div className="timer-display" style={{ fontSize: 32 }}>22.4</div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--success)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Within band</div>
        </div>
      </div>
      <div className="divider" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <FitRow label="Run · 2.5 km · sub 12" pct={88} />
        <FitRow label="Push-ups · 40 / min" pct={72} />
        <FitRow label="Pull-ups · 8 reps" pct={55} />
        <FitRow label="Rope · 6 m" pct={66} />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <span className="chip chip-warn">Today · skipped pull-ups</span>
        <span className="chip">D-42 to SSB</span>
      </div>
    </div>
  );
}
function FitRow({ label, pct }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 36px", gap: 10, alignItems: "center" }}>
      <span style={{ fontSize: 12.5 }}>{label}</span>
      <div className="bar"><i style={{ right: `${100-pct}%` }}></i></div>
      <span className="mono" style={{ fontSize: 11, textAlign: "right", color: "var(--ink-3)" }}>{pct}%</span>
    </div>
  );
}

function OLQConsistency() {
  // OLQ list — show good/miss/neutral pattern across modules
  const matrix = [
    { name: "Initiative",        m: "good", k: "miss", v: "good" },
    { name: "Cooperation",       m: "miss", k: "miss", v: "neutral" },
    { name: "Decision Speed",    m: "neutral", k: "good", v: "good" },
    { name: "Effective Intel.",  m: "good", k: "good", v: "good" },
    { name: "Self-Confidence",   m: "good", k: "neutral", v: "good" },
    { name: "Determination",     m: "good", k: "good", v: "good" },
    { name: "Stamina",           m: "neutral", k: "miss", v: "neutral" },
    { name: "Soc. Adaptability", m: "miss", k: "neutral", v: "good" },
  ];
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow eyebrow-olive">A.04 · OLQ × 3-D Consistency</span>
        <span className="chip chip-warn">2 inconsistencies</span>
      </div>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase", margin: "10px 0 6px" }}>
        Manasa · Karma · Vacha — must align
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--olive-line)" }}>
            <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 500, color: "var(--ink-3)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>Quality</th>
            <th style={{ width: 80, fontWeight: 500, color: "var(--ink-3)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>Manasa</th>
            <th style={{ width: 80, fontWeight: 500, color: "var(--ink-3)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>Karma</th>
            <th style={{ width: 80, fontWeight: 500, color: "var(--ink-3)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>Vacha</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map(row => (
            <tr key={row.name} style={{ borderBottom: "1px dashed var(--olive-line)" }}>
              <td style={{ padding: "9px 0" }}>{row.name}</td>
              <td><Dot v={row.m} /></td>
              <td><Dot v={row.k} /></td>
              <td><Dot v={row.v} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-2)" }}>
        <b style={{ color: "var(--danger)" }}>Flagged:</b> Your SD claims “natural team player” but Cooperation is missing in TAT and weak in GD entries. Address before next mock.
      </div>
    </div>
  );
}
function Dot({ v }) {
  const color = v === "good" ? "var(--success)" : v === "miss" ? "var(--danger)" : "var(--ink-5)";
  return <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, border: "1px solid rgba(0,0,0,0.1)" }} />;
}

function RecentActivity() {
  const rows = [
    { m: "TAT",  no: "03", date: "Yesterday · 21:40", title: "12-story set · Theme: rural development", score: 6.8, tags: ["passive heroes ×3", "word count low"] },
    { m: "WAT",  no: "04", date: "Yesterday · 18:15", title: "60-word standard set",                  score: 7.4, tags: ["completion 58/60", "+2 vs last"] },
    { m: "SRT",  no: "05", date: "D-2 · 20:05",       title: "60-situation set",                       score: 6.4, tags: ["delegation pattern ×9"] },
    { m: "GD",   no: "08", date: "D-3 · 19:00",       title: "Lead 2 · Education reform",              score: 7.0, tags: ["late entry (4:30)"] },
    { m: "INT.", no: "11", date: "D-4 · 17:30",       title: "PIQ-driven · 22 questions",              score: 7.8, tags: ["hobby depth strong"] },
  ];
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--olive-line)" }}>
        <span className="eyebrow eyebrow-olive">A.05 · Recent Sessions</span>
        <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.12em", color: "var(--ink-4)", textTransform: "uppercase" }}>Last 7 d</span>
      </div>
      <div>
        {rows.map((r, i) => (
          <div key={i} className="row-hover" style={{ display: "grid", gridTemplateColumns: "60px 1fr 160px 70px", gap: 12, padding: "12px 18px", borderBottom: i === rows.length-1 ? "none" : "1px dashed var(--olive-line)", alignItems: "center" }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--olive)" }}>{r.no} {r.m}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{r.title}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                {r.tags.map((t, j) => <span key={j} className="chip" style={{ fontSize: 9 }}>{t}</span>)}
              </div>
            </div>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{r.date}</span>
            <span className="timer-display" style={{ fontSize: 16, color: r.score >= 7 ? "var(--olive)" : "var(--warning)", textAlign: "right" }}>{r.score.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============== DAILY BRIEFING ============== */
function BriefingScreen({ onNav }) {
  return (
    <div className="page">
      <PageHead no="01" sub="Daily Briefing · 28 May 2026" title="Morning briefing & current affairs."
        meta={<React.Fragment><span>Updated <b>06:14 IST</b></span><span>By <b>Col. R. Sharma</b></span></React.Fragment>} />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 18 }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="eyebrow eyebrow-olive">B.01 · Today's Video</div>
          <ImgSlot label="▶  Video poster · The 22-second rule" height={300} style={{ marginTop: 10 }} />
          <h3 className="h-card" style={{ marginTop: 12 }}>The 22-second rule — why your first answer is usually right.</h3>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>
            Psychology · 6 min 22 s · Day 31 of bootcamp
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn btn-primary">▶ Play</button>
            <button className="btn btn-ghost">Mark watched</button>
            <button className="btn btn-ghost">Open notes</button>
          </div>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--olive-line)" }}>
            <span className="eyebrow eyebrow-olive">B.02 · Watch next</span>
          </div>
          {[
            { t: "Why your SRT is failing (and it's not what you think)", k: "Psychology", min: "8:14" },
            { t: "GTO obstacle 4 — the one cadets always over-think", k: "GTO", min: "5:48" },
            { t: "Walking through a 9.5/10 self-description", k: "Psychology", min: "11:02" },
            { t: "Indo-Pacific posture · 8-min explainer", k: "Current Affairs", min: "8:32" },
          ].map((v, i) => (
            <div key={i} className="row-hover" style={{ padding: "12px 18px", borderBottom: "1px dashed var(--olive-line)", display: "flex", gap: 12, alignItems: "center" }}>
              <ImgSlot label="▶" height={50} style={{ width: 80 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{v.t}</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>{v.k} · {v.min}</div>
              </div>
              <Chev />
            </div>
          ))}
        </div>
      </div>

      <SectionHead no="B.03" title="Current Affairs · This Week" action={<button className="btn btn-ghost btn-sm btn-mono">Take CA quiz <Chev /></button>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {[
          { d:"28 MAY", tag:"Defence", t:"AMCA Mk-2 indigenous prototype gets DAC clearance", body:"India's fifth-gen stealth fighter's indigenous prototype build approved for FY28. HAL named lead integrator alongside ADA.", qs:["Difference between AMCA Mk-1 and Mk-2?","Which engine is being negotiated for Mk-2?","How does this fit into the theatre command rollout?"] },
          { d:"27 MAY", tag:"Geopolitics", t:"India–Maldives security recalibration", body:"Civilian technicians replace Indian military advisors. Hydrography MOU renewed for 5 years.", qs:["What was the original Operation Cactus reference?","Why is Maldives strategically critical for India?"] },
          { d:"26 MAY", tag:"Defence", t:"Indian Army's K9-Vajra deployment expanded to LoC", body:"Self-propelled howitzer regiment moves to Northern Command. Indigenous content now 60%.", qs:["What is the range of K9-Vajra?","Why are SP guns preferred over towed in mountains?"] },
          { d:"25 MAY", tag:"Economy", t:"Defence exports cross ₹26,000 cr", body:"Vietnam, Philippines lead buyers. Brahmos and AKM-203 production lines drive 38% YoY growth.", qs:["Name 3 indigenous weapons currently exported.","Which Indian PSU leads defence exports by value?"] },
        ].map((c, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span className="chip chip-olive">{c.tag}</span>
                <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{c.d}</span>
              </div>
              <button className="btn btn-ghost btn-sm">Save</button>
            </div>
            <h3 className="h-card" style={{ marginTop: 8, lineHeight: 1.3 }}>{c.t}</h3>
            <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 6 }}>{c.body}</div>
            <div className="divider-rule" style={{ margin: "12px 0 8px" }}>Likely Interview Qs</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 4 }}>
              {c.qs.map((q, j) => <li key={j}>{q}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============== PROGRESS ============== */
function ProgressScreen() {
  const modules = [
    { code:"03", name:"TAT",  score:6.8, prev:6.2, sessions:14, trend:[5.0,5.2,5.5,5.8,5.9,6.2,6.0,6.4,6.6,6.8] },
    { code:"04", name:"WAT",  score:7.4, prev:7.0, sessions:11, trend:[6.0,6.2,6.5,6.8,6.9,7.0,7.1,7.2,7.4,7.4] },
    { code:"05", name:"SRT",  score:6.4, prev:6.6, sessions:12, trend:[7.0,6.8,6.6,6.5,6.5,6.6,6.4,6.3,6.4,6.4] },
    { code:"06", name:"SD",   score:7.2, prev:6.8, sessions:5,  trend:[6.0,6.2,6.6,6.8,7.0,7.2] },
    { code:"07", name:"PPDT", score:6.6, prev:6.0, sessions:6,  trend:[5.5,5.8,6.0,6.2,6.4,6.6] },
    { code:"08", name:"GD",   score:7.0, prev:6.4, sessions:8,  trend:[5.8,6.0,6.2,6.4,6.6,6.8,7.0,7.0] },
    { code:"09", name:"LEC",  score:6.8, prev:6.4, sessions:6,  trend:[5.6,5.8,6.0,6.2,6.6,6.8] },
    { code:"10", name:"GPE",  score:6.5, prev:6.0, sessions:4,  trend:[5.5,5.8,6.2,6.5] },
    { code:"11", name:"INT.", score:7.8, prev:7.0, sessions:9,  trend:[6.0,6.4,6.8,7.0,7.2,7.2,7.4,7.6,7.8] },
    { code:"12", name:"OIR",  score:8.4, prev:7.8, sessions:11, trend:[6.5,7.0,7.2,7.5,7.8,7.9,8.0,8.2,8.3,8.4] },
  ];
  return (
    <div className="page">
      <PageHead no="02" sub="Performance Dossier" title="My Progress."
        meta={<React.Fragment><span>148 sessions</span><span>Joined <b>04 Mar 2026</b></span></React.Fragment>}
        right={<button className="btn btn-ghost btn-mono">Export PDF</button>}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard label="Overall Score" value="7.1" sub="/ 10" tone="ok" />
        <StatCard label="Sessions · 30d" value="62" sub="+18 vs prior" tone="ok" />
        <StatCard label="Avg Completion" value="92%" sub="WAT/SRT blanks ↓" tone="ok" />
        <StatCard label="Coach Flags Open" value="3" sub="see below" tone="warn" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 18 }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow eyebrow-olive">C.01 · Module scores · last 10 sessions</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-sm btn-mono">7 d</button>
              <button className="btn btn-ghost btn-sm btn-mono" style={{ background: "var(--olive)", color: "#fff", borderColor: "var(--olive-dark)" }}>30 d</button>
              <button className="btn btn-ghost btn-sm btn-mono">All</button>
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--olive-line)" }}>
                {["Code","Module","Last 10","Now","Δ","Sessions",""].map((h,i)=> (
                  <th key={i} style={{ textAlign: i>=2 && i!==1 ? "right" : "left", padding: "8px 0", fontWeight: 500, color: "var(--ink-3)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map(m => {
                const d = m.score - m.prev;
                return (
                  <tr key={m.code} className="row-hover" style={{ borderBottom: "1px dashed var(--olive-line)" }}>
                    <td style={{ padding: "10px 0" }}><span className="mono" style={{ color: "var(--olive)", fontSize: 11, letterSpacing: "0.1em" }}>{m.code}</span></td>
                    <td>{m.name}</td>
                    <td style={{ textAlign: "right" }}><Spark data={m.trend} w={120} h={22} color={d >= 0 ? "var(--olive)" : "var(--danger)"} /></td>
                    <td style={{ textAlign: "right" }} className="mono">{m.score.toFixed(1)}</td>
                    <td style={{ textAlign: "right" }} className="mono" >
                      <span style={{ color: d >= 0 ? "var(--success)" : "var(--danger)" }}>{d >= 0 ? "+" : ""}{d.toFixed(1)}</span>
                    </td>
                    <td className="mono" style={{ textAlign: "right", color: "var(--ink-3)" }}>{m.sessions}</td>
                    <td style={{ textAlign: "right" }}><Chev /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <RadarCard />
          <div className="card" style={{ padding: 18 }}>
            <span className="eyebrow eyebrow-olive">C.03 · Cross-test Consistency</span>
            <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.55, color: "var(--ink-2)" }}>
              <p style={{ margin: "6px 0" }}><b style={{ color: "var(--success)" }}>CONSISTENT</b> · Initiative shows up in TAT, SRT, and your SD.</p>
              <p style={{ margin: "6px 0" }}><b style={{ color: "var(--success)" }}>CONSISTENT</b> · Positive outlook — WAT patterns match TAT themes.</p>
              <p style={{ margin: "6px 0" }}><b style={{ color: "var(--danger)" }}>INCONSISTENT</b> · SD claims “team player” but TAT heroes work alone in 9 of 14 sessions.</p>
              <p style={{ margin: "6px 0" }}><b style={{ color: "var(--warning)" }}>CONCERN</b> · WAT negative-word responses (fear, failure, death) trend toward avoidance, not confrontation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, tone }) {
  const color = tone === "warn" ? "var(--warning)" : tone === "danger" ? "var(--danger)" : "var(--olive)";
  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="eyebrow">{label}</div>
      <div className="timer-display" style={{ fontSize: 30, marginTop: 6, color }}>{value}</div>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function RadarCard() {
  // simple radar
  const labels = ["Intel.","Reason","Org.","Express.","Soc. Adapt.","Coop.","Resp.","Init.","Conf.","Decision","Influence","Liveliness","Determ.","Courage","Stamina"];
  const vals  = [7.6, 7.2, 6.8, 7.4, 6.0, 5.8, 6.8, 7.2, 7.0, 6.4, 6.8, 6.6, 7.4, 6.8, 6.2];
  const center = 130; const r = 100;
  const pts = vals.map((v, i) => {
    const a = (Math.PI * 2 / vals.length) * i - Math.PI/2;
    const rr = (v / 10) * r;
    return [center + Math.cos(a) * rr, center + Math.sin(a) * rr];
  });
  const polyPts = pts.map(p => p.join(",")).join(" ");
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];
  return (
    <div className="card" style={{ padding: 18 }}>
      <span className="eyebrow eyebrow-olive">C.02 · 15 OLQ Profile</span>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
        <svg width={260} height={260} viewBox="0 0 260 260">
          {rings.map((rr, i) => {
            const pp = labels.map((_, j) => {
              const a = (Math.PI * 2 / labels.length) * j - Math.PI/2;
              return `${center + Math.cos(a)*r*rr},${center + Math.sin(a)*r*rr}`;
            }).join(" ");
            return <polygon key={i} points={pp} fill="none" stroke="var(--olive-line)" strokeWidth="0.7" />;
          })}
          {labels.map((_, i) => {
            const a = (Math.PI * 2 / labels.length) * i - Math.PI/2;
            return <line key={i} x1={center} y1={center} x2={center + Math.cos(a)*r} y2={center + Math.sin(a)*r} stroke="var(--olive-line)" strokeWidth="0.5" />;
          })}
          <polygon points={polyPts} fill="rgba(74,93,35,0.18)" stroke="var(--olive)" strokeWidth="1.5" />
          {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2" fill="var(--olive-dark)" />)}
          {labels.map((l, i) => {
            const a = (Math.PI * 2 / labels.length) * i - Math.PI/2;
            const lx = center + Math.cos(a) * (r + 14);
            const ly = center + Math.sin(a) * (r + 14);
            return <text key={i} x={lx} y={ly} fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" dominantBaseline="middle" fill="var(--ink-3)" letterSpacing="0.5">{l.toUpperCase()}</text>;
          })}
        </svg>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard, BriefingScreen, ProgressScreen });
