/* ====== App shell & router ====== */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#4A5D23", "#3B4A1C", "#C5A55A", "#F5F3EE"],
  "feedbackTone": "balanced",
  "density": "regular",
  "showFeedback": false
}/*EDITMODE-END*/;

function App() {
  const [route, setRoute] = React.useState("dashboard");
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply palette tweak
  React.useEffect(() => {
    const root = document.documentElement;
    if (Array.isArray(t.palette)) {
      root.style.setProperty("--olive", t.palette[0]);
      root.style.setProperty("--olive-dark", t.palette[1]);
      root.style.setProperty("--gold", t.palette[2]);
      root.style.setProperty("--paper", t.palette[3]);
    }
  }, [t.palette]);

  // Density
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--topbar-h", t.density === "compact" ? "52px" : t.density === "comfy" ? "68px" : "60px");
  }, [t.density]);

  const screenFor = (r) => {
    if (showFeedback || t.showFeedback) return <FeedbackScreen onNav={(id) => { setShowFeedback(false); setTweak("showFeedback", false); setRoute(id); }} module={r.toUpperCase()} />;
    switch (r) {
      case "dashboard":  return <Dashboard onNav={onNav} />;
      case "briefing":   return <BriefingScreen onNav={onNav} />;
      case "progress":   return <ProgressScreen onNav={onNav} />;
      case "tat":        return <TATScreen onNav={onNav} />;
      case "wat":        return <WATScreen onNav={onNav} />;
      case "srt":        return <SRTScreen onNav={onNav} />;
      case "sd":         return <SDScreen onNav={onNav} />;
      case "ppdt":       return <PPDTScreen onNav={onNav} />;
      case "gd":         return <GDScreen onNav={onNav} />;
      case "lec":        return <LecturetteScreen onNav={onNav} />;
      case "gpe":        return <GPEScreen onNav={onNav} />;
      case "interview":  return <InterviewScreen onNav={onNav} />;
      case "oir":        return <OIRScreen onNav={onNav} />;
      case "piq":        return <PIQScreen onNav={onNav} />;
      case "fitness":    return <FitnessScreen onNav={onNav} />;
      default:           return <Dashboard onNav={onNav} />;
    }
  };

  function onNav(id) {
    setRoute(id);
    setShowFeedback(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <div className="app">
      <Sidebar current={route} onNav={onNav} />
      <div className="main-col">
        <TopBar current={route} onNav={onNav} />
        {screenFor(route)}
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakColor
          label="Brand palette"
          value={t.palette}
          options={[
            ["#4A5D23", "#3B4A1C", "#C5A55A", "#F5F3EE"], /* olive · gold · paper (default) */
            ["#3F5530", "#2A3A1C", "#B89150", "#F4F2EB"], /* deeper olive */
            ["#5A6B3A", "#3D4922", "#D6B86A", "#F7F5EE"], /* lighter sage */
            ["#2E3B1F", "#1E2715", "#A98444", "#EDE9DD"], /* near-black, austere */
            ["#3F4A66", "#2A3349", "#B89150", "#F2F1ED"], /* naval blue alt */
          ]}
          onChange={(v) => setTweak("palette", v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak("density", v)}
        />

        <TweakSection label="Coach voice" />
        <TweakRadio
          label="Feedback tone"
          value={t.feedbackTone}
          options={["balanced", "sharp", "soft"]}
          onChange={(v) => setTweak("feedbackTone", v)}
        />

        <TweakSection label="Jump to" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[
            ["dashboard", "Dashboard"],
            ["tat", "TAT"],
            ["wat", "WAT"],
            ["srt", "SRT"],
            ["sd", "SD"],
            ["ppdt", "PPDT"],
            ["gd", "GD"],
            ["lec", "Lecturette"],
            ["gpe", "GPE"],
            ["interview", "Interview"],
            ["oir", "OIR"],
            ["piq", "PIQ form"],
            ["fitness", "Fitness"],
            ["progress", "Progress"],
            ["briefing", "Briefing"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => onNav(id)}
              style={{
                padding: "6px 8px",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: route === id ? "var(--olive)" : "transparent",
                color: route === id ? "#fff" : "var(--ink-2)",
                border: "1px solid var(--olive-line)",
                borderRadius: 2,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <TweakSection label="States" />
        <TweakButton
          label="Open coach report (TAT)"
          onClick={() => { setShowFeedback(true); }}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
