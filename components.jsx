/* ====== Shared components for FAOSSB Platform ====== */

const NAV = [
  { group: "Command", items: [
    { id: "dashboard", code: "00", label: "Dashboard" },
    { id: "briefing",  code: "01", label: "Daily Briefing" },
    { id: "progress",  code: "02", label: "My Progress" },
  ]},
  { group: "Psychology (Manasa)", items: [
    { id: "tat", code: "03", label: "TAT" },
    { id: "wat", code: "04", label: "WAT" },
    { id: "srt", code: "05", label: "SRT" },
    { id: "sd",  code: "06", label: "Self Description" },
    { id: "ppdt", code: "07", label: "PPDT" },
  ]},
  { group: "GTO (Karma)", items: [
    { id: "gd",  code: "08", label: "Group Discussion" },
    { id: "lec", code: "09", label: "Lecturette" },
    { id: "gpe", code: "10", label: "GPE" },
  ]},
  { group: "Interview (Vacha)", items: [
    { id: "interview", code: "11", label: "Personal Interview" },
    { id: "oir", code: "12", label: "OIR Screening" },
  ]},
  { group: "Profile", items: [
    { id: "piq",     code: "13", label: "PIQ Form" },
    { id: "fitness", code: "14", label: "Fitness Tracker" },
  ]},
];

const NAV_FLAT = NAV.flatMap(g => g.items);
const NAV_LOOKUP = Object.fromEntries(NAV_FLAT.map(n => [n.id, n]));

function Sidebar({ current, onNav }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true"></div>
        <div>
          <div className="brand-title">FAOSSB</div>
          <div className="brand-sub">Bootcamp · v1</div>
        </div>
      </div>
      <nav style={{ overflowY: "auto", flex: 1 }}>
        {NAV.map(group => (
          <div key={group.group}>
            <div className="nav-group-label">{group.group}</div>
            {group.items.map(item => (
              <div
                key={item.id}
                className={"nav-item " + (current === item.id ? "active" : "")}
                onClick={() => onNav(item.id)}
              >
                <span className="nav-id">{item.code}</span>
                <span>{item.label}</span>
                {item.id === "tat" && current !== "tat" && <span className="nav-dot" title="due today"></span>}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-foot">
        Col. R. Sharma · Founder<br/>
        <span style={{ color: "rgba(245,243,238,0.25)" }}>© FAOA · Restricted</span>
      </div>
    </aside>
  );
}

function TopBar({ current, onNav }) {
  const item = NAV_LOOKUP[current] || { code: "00", label: "Dashboard" };
  return (
    <div className="topbar">
      <div className="crumb">
        FAOA / Practice / <b>{item.code} · {item.label.toUpperCase()}</b>
      </div>
      <div className="spacer" />
      <div className="pill"><span className="dot"></span> Session Live</div>
      <div className="pill mono">SSB · 42 D</div>
      <div className="pill">Streak · 17</div>
      <button className="btn btn-ghost btn-sm">🔔</button>
      <div className="avatar" title="Cadet Aarav Mehra">AM</div>
    </div>
  );
}

function PageHead({ no, title, sub, meta, right }) {
  return (
    <div className="briefing-head">
      <div>
        <div className="section-no">{no ? `${no} · ` : ""}{sub || "Briefing"}</div>
        <h1 className="h-page" style={{ marginTop: 6 }}>{title}</h1>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
        {meta && <div className="meta">{meta}</div>}
        {right}
      </div>
    </div>
  );
}

/* === Chevron icon === */
function Chev({ dir = "right", size = 12 }) {
  const rot = { right: 0, down: 90, left: 180, up: -90 }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M4 2 L8 6 L4 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="square" />
    </svg>
  );
}

/* === Star (OLQ ranks) === */
function StarRow({ value = 3, max = 5 }) {
  return (
    <span style={{ color: "var(--gold-line)", letterSpacing: 2, fontSize: 13 }}>
      {Array.from({ length: max }, (_, i) => i < value ? "★" : "☆").join("")}
    </span>
  );
}

/* === Simple image slot === */
function ImgSlot({ label, height = 180, src, style }) {
  const [failed, setFailed] = React.useState(false);
  if (src && !failed) {
    return (
      <div className="img-slot" style={{ height, padding: 0, overflow: "hidden", ...style }}>
        <img
          src={src}
          alt={label}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }
  return (
    <div className="img-slot" style={{ height, ...style }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{
          width: 28, height: 28, border: "1.5px solid var(--olive-line-strong)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--olive-line-strong)", borderRadius: 2,
        }}>◇</div>
        <div>{label || "image slot"}</div>
      </div>
    </div>
  );
}

/* === Timer ring === */
function TimerRing({ value, max, label, size = 110, danger = false, stroke = 5 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  const color = danger ? "var(--danger)" : "var(--olive)";
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--olive-line)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
          strokeLinecap="butt"
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 2,
      }}>
        <div className="timer-display" style={{ fontSize: 22, color: danger ? "var(--danger)" : "var(--ink)" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

/* === A small "OLQ chip" === */
function OLQChip({ name, status }) {
  // status: 'good' | 'miss' | 'neutral'
  const cls = status === "good" ? "olq olq-good" : status === "miss" ? "olq olq-miss" : "olq";
  return <span className={cls}>{name}</span>;
}

/* === Module Card (used on dashboard, etc) === */
function ModuleCard({ no, name, kind, status, score, time, onClick, accent }) {
  return (
    <div className="card row-hover" onClick={onClick} style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="eyebrow eyebrow-olive">{no} · {kind}</span>
        {accent && <span className={"chip " + accent.cls}>{accent.text}</span>}
      </div>
      <div className="h-card">{name}</div>
      <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: "auto" }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {time}
        </div>
        <div style={{ flex: 1 }} />
        {score != null && (
          <span className="mono" style={{ fontSize: 12, color: "var(--olive)", letterSpacing: "0.05em" }}>
            {score}<span style={{ color: "var(--ink-4)" }}>/10</span>
          </span>
        )}
        <Chev />
      </div>
    </div>
  );
}

/* === Live timer hook === */
function useCountdown(seconds, running = true) {
  const [t, setT] = React.useState(seconds);
  React.useEffect(() => { setT(seconds); }, [seconds]);
  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT(v => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);
  return [t, setT];
}
function fmtMMSS(s) {
  const m = Math.floor(s / 60);
  const ss = (s % 60).toString().padStart(2, "0");
  return `${m.toString().padStart(2, "0")}:${ss}`;
}

/* === Numbered Section Header === */
function SectionHead({ no, title, action }) {
  return (
    <div style={{
      display: "flex", alignItems: "baseline", justifyContent: "space-between",
      gap: 12, marginBottom: 12, marginTop: 24,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span className="section-no">{no}</span>
        <span className="h-section">{title}</span>
      </div>
      {action}
    </div>
  );
}

/* Mini sparkline */
function Spark({ data, w = 120, h = 28, color = "var(--olive)" }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = h - ((v - min) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.4" />
      <circle cx={(data.length-1)*stepX} cy={h - ((data[data.length-1]-min)/range)*h} r="2" fill={color} />
    </svg>
  );
}

/* ============== TEST BRIEFING (intro / rules / start) ============== */
function TestBrief({
  no,
  module,            /* "TAT" */
  pillar,            /* "Manasa" | "Karma" | "Vacha" */
  title,             /* "Thematic Apperception Test" */
  oneLiner,          /* description */
  duration,          /* "~55 min" */
  itemCount,         /* "12 stories" */
  phases,            /* [{ no, label, time, body }] */
  rules,             /* { do: [...], dont: [...] } */
  olqs,              /* ["Initiative","Org. Ability",...] */
  hardRule,          /* the brutal-truth one-liner */
  setLabel,          /* "TAT-26-MAY-B" */
  onStart,
  onBack,
}) {
  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <PageHead
        no={no}
        sub={`${pillar} · ${module} · Briefing`}
        title={title}
        meta={<React.Fragment><span>Set <b>{setLabel}</b></span><span>Duration <b>{duration}</b></span></React.Fragment>}
        right={onBack && <button className="btn btn-ghost btn-mono" onClick={onBack}>← Back</button>}
      />

      {/* Overview band */}
      <div className="card-olive" style={{ padding: 22, position: "relative", overflow: "hidden", marginBottom: 18 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(135deg, transparent 49%, rgba(255,255,255,0.04) 50%, transparent 51%)",
          backgroundSize: "10px 10px",
          pointerEvents: "none",
        }} />
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.6fr) 240px", gap: 24, position: "relative", alignItems: "center" }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--gold)" }}>{no} · {pillar} · {module}</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{oneLiner}</div>
            <div style={{ display: "flex", gap: 24, marginTop: 14, color: "rgba(255,255,255,0.85)" }}>
              <BriefStat label="Duration" v={duration} />
              <BriefStat label="Items" v={itemCount} />
              <BriefStat label="Format" v={module === "OIR" ? "MCQ" : module === "Interview" ? "Audio" : "Written"} />
              <BriefStat label="Stakes" v="Real SSB tempo" />
            </div>
          </div>
          <div>
            <button className="btn btn-gold btn-lg" style={{ width: "100%", justifyContent: "center", height: 56, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }} onClick={onStart}>
              Begin {module} <Chev />
            </button>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 8, textAlign: "center", opacity: 0.85 }}>
              Time starts the moment you click
            </div>
          </div>
        </div>
      </div>

      {/* Phases */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 18 }}>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--olive-line)" }}>
            <span className="eyebrow eyebrow-olive">Q.01 · Phases</span>
          </div>
          <div>
            {phases.map((p, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "60px 120px 1fr",
                gap: 16,
                padding: "16px 18px",
                borderBottom: i === phases.length - 1 ? "none" : "1px dashed var(--olive-line)",
                alignItems: "flex-start",
              }}>
                <span className="mono" style={{ fontSize: 13, color: "var(--olive)", letterSpacing: "0.1em", fontWeight: 600 }}>{p.no}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.label}</div>
                  <div className="timer-display" style={{ fontSize: 16, color: "var(--ink)", marginTop: 4 }}>{p.time}</div>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, paddingTop: 2 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 16 }}>
            <span className="eyebrow eyebrow-olive">Q.02 · Rules · DO</span>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {rules.do.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12.5, color: "var(--ink-2)" }}>
                  <div className="mono" style={{ width: 16, height: 16, borderRadius: 2, background: "var(--success)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0, marginTop: 1 }}>✓</div>
                  <span style={{ lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-paper" style={{ padding: 16 }}>
            <span className="eyebrow" style={{ color: "var(--danger)" }}>Q.03 · Rules · DO NOT</span>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {rules.dont.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12.5, color: "var(--ink-2)" }}>
                  <div className="mono" style={{ width: 16, height: 16, borderRadius: 2, background: "var(--danger)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0, marginTop: 1 }}>✗</div>
                  <span style={{ lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* OLQs + Brutal truth */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 18, marginTop: 18 }}>
        <div className="card" style={{ padding: 18 }}>
          <span className="eyebrow eyebrow-olive">Q.04 · Evaluated against</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            {olqs.map(o => <OLQChip key={o} name={o} />)}
          </div>
          <div className="divider" style={{ margin: "14px 0" }} />
          <div className="eyebrow">3-D Test Pillar</div>
          <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 12.5, color: "var(--ink-2)" }}>
            <DimRow active={pillar === "Manasa"} k="Manasa" v="Thought" />
            <DimRow active={pillar === "Karma"} k="Karma" v="Action" />
            <DimRow active={pillar === "Vacha"} k="Vacha" v="Speech" />
          </div>
        </div>
        <div className="card-paper" style={{ padding: 18, display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "3px solid var(--olive)" }}>
          <span className="eyebrow" style={{ color: "var(--olive)" }}>Q.05 · The hard rule</span>
          <div style={{ fontSize: 16, fontWeight: 500, color: "var(--ink)", marginTop: 8, lineHeight: 1.5, fontStyle: "italic" }}>
            “{hardRule}”
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 10 }}>
            Col. R. Sharma · SSB bootcamp
          </div>
        </div>
      </div>

      {/* Bottom start */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, padding: "18px 22px", border: "1px solid var(--olive-line)", borderRadius: 2, background: "#fff" }}>
        <div>
          <div className="eyebrow eyebrow-olive">Ready when you are.</div>
          <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>Pause is allowed once per set. Aborting wastes a slot in your dossier — don't.</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost btn-mono">Read full rulebook</button>
          <button className="btn btn-primary btn-mono" onClick={onStart} style={{ minWidth: 200, justifyContent: "center" }}>I'm ready · Start <Chev /></button>
        </div>
      </div>
    </div>
  );
}

function BriefStat({ label, v }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginTop: 3 }}>{v}</div>
    </div>
  );
}

function DimRow({ k, v, active }) {
  return (
    <div style={{
      flex: 1,
      padding: 10,
      border: "1px solid " + (active ? "var(--olive)" : "var(--olive-line)"),
      background: active ? "rgba(74,93,35,0.06)" : "#fff",
      borderRadius: 2,
    }}>
      <div className="mono" style={{ fontSize: 10.5, color: active ? "var(--olive)" : "var(--ink-4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{k}</div>
      <div style={{ fontSize: 13, fontWeight: active ? 600 : 500, color: "var(--ink-2)", marginTop: 2 }}>{v}</div>
    </div>
  );
}

Object.assign(window, {
  NAV, NAV_FLAT, NAV_LOOKUP,
  Sidebar, TopBar, PageHead, Chev, StarRow, ImgSlot, TimerRing,
  OLQChip, ModuleCard, useCountdown, fmtMMSS, SectionHead, Spark,
  TestBrief,
});
