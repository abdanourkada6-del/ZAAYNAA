import { useState, useEffect } from "react";

const CRITERIA = [
  { id: "wow", label: "Effet WOW", question: "Est-ce que le produit surprend ou impressionne au premier regard ?", weight: 2 },
  { id: "problem", label: "Résout un problème", question: "Est-ce qu'il résout un vrai problème quotidien ?", weight: 2 },
  { id: "explain", label: "S'explique en 3 sec", question: "Est-ce qu'on comprend l'utilité en moins de 3 secondes ?", weight: 1.5 },
  { id: "margin", label: "Marge 3x minimum", question: "Peut-on le vendre au moins 3x son prix fournisseur ?", weight: 2 },
  { id: "light", label: "Léger & facile à livrer", question: "Est-ce que le produit est petit, léger, pas fragile ?", weight: 1.5 },
  { id: "viral", label: "Potentiel viral", question: "Peut-on faire une vidéo TikTok/Reels accrocheuse dessus ?", weight: 2 },
  { id: "scandi", label: "Fit marché scandinave", question: "Est-ce que le produit correspond aux valeurs scandinaves (nature, bien-être, qualité, durabilité) ?", weight: 2 },
  { id: "saturation", label: "Peu saturé", question: "Est-ce que tu vois peu de pubs pour ce produit en Scandinavie ?", weight: 2 },
  { id: "seasonal", label: "Vente toute l'année", question: "Est-ce que le produit se vend en dehors des fêtes / saisons ?", weight: 1 },
  { id: "niche", label: "Niche ciblée", question: "Est-ce que le produit vise une audience spécifique et passionnée ?", weight: 1.5 },
];

const SCORE_LEVELS = [
  { min: 85, label: "🔥 WINNER POTENTIEL", color: "#00ff87", bg: "rgba(0,255,135,0.08)", desc: "Lance-toi maintenant. Ce produit coche presque toutes les cases." },
  { min: 65, label: "⚡ BON PRODUIT", color: "#ffd700", bg: "rgba(255,215,0,0.08)", desc: "Produit solide. Travaille l'angle marketing pour te démarquer." },
  { min: 45, label: "⚠️ RISQUÉ", color: "#ff8c42", bg: "rgba(255,140,66,0.08)", desc: "Trop de points faibles. Cherche un meilleur produit ou pivote." },
  { min: 0, label: "❌ ÉVITE", color: "#ff4757", bg: "rgba(255,71,87,0.08)", desc: "Ce produit n'est pas fait pour le marché scandinave." },
];

const SUGGESTIONS = [
  "Lampe de luminothérapie portable", "Coussin chauffant cervicales", "Brosse autonettoyante pour animaux",
  "Gourde filtrante outdoor", "Support téléphone magnétique voiture", "Masque yeux avec chaleur",
  "Tapis de acupression", "Carnet intelligent réutilisable", "Chargeur solaire portable",
  "Porte-clé GPS tracker", "Boîte bento compartimentée", "Ceinture de posture connectée",
];

export default function App() {
  const [productName, setProductName] = useState("");
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState("input"); // input | quiz | result
  const [score, setScore] = useState(0);
  const [animScore, setAnimScore] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    setSuggestion(SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)]);
  }, []);

  useEffect(() => {
    if (step === "result") {
      let start = 0;
      const end = score;
      const duration = 1200;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) { setAnimScore(end); clearInterval(timer); }
        else setAnimScore(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    }
  }, [step, score]);

  const handleStart = () => {
    if (!productName.trim()) return;
    setStep("quiz");
    setCurrentQ(0);
    setAnswers({});
  };

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [CRITERIA[currentQ].id]: val };
    setAnswers(newAnswers);
    if (currentQ < CRITERIA.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const totalWeight = CRITERIA.reduce((s, c) => s + c.weight, 0);
      const earned = CRITERIA.reduce((s, c) => s + (newAnswers[c.id] ?? 0) * c.weight, 0);
      const maxEarned = CRITERIA.reduce((s, c) => s + c.weight, 0);
      const pct = Math.round((earned / maxEarned) * 100);
      setScore(pct);
      setStep("result");
    }
  };

  const handleReset = () => {
    setProductName("");
    setAnswers({});
    setStep("input");
    setCurrentQ(0);
    setScore(0);
    setAnimScore(0);
    setSuggestion(SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)]);
  };

  const level = SCORE_LEVELS.find(l => score >= l.min);
  const progress = ((currentQ) / CRITERIA.length) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'Courier New', monospace",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Grid background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(0,255,135,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Glow */}
      <div style={{
        position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "300px",
        background: "radial-gradient(ellipse, rgba(0,255,135,0.06) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "580px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ color: "#00ff87", fontSize: "11px", letterSpacing: "4px", marginBottom: "12px", opacity: 0.7 }}>
            DROPSHIP SCANNER v2.6
          </div>
          <h1 style={{
            color: "#fff", fontSize: "clamp(22px, 5vw, 32px)", fontWeight: "700",
            margin: 0, lineHeight: 1.2, letterSpacing: "-0.5px",
          }}>
            Analyse ton produit<br />
            <span style={{ color: "#00ff87" }}>avant de perdre ton budget</span>
          </h1>
          <p style={{ color: "#555", fontSize: "13px", marginTop: "10px" }}>
            10 critères • Marché scandinave • Score instantané
          </p>
        </div>

        {/* STEP: INPUT */}
        {step === "input" && (
          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px", padding: "32px",
          }}>
            <label style={{ color: "#888", fontSize: "11px", letterSpacing: "2px", display: "block", marginBottom: "10px" }}>
              NOM DU PRODUIT
            </label>
            <input
              value={productName}
              onChange={e => setProductName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleStart()}
              placeholder={`ex: ${suggestion}`}
              style={{
                width: "100%", background: "rgba(0,255,135,0.04)", border: "1px solid rgba(0,255,135,0.2)",
                borderRadius: "10px", padding: "14px 16px", color: "#fff", fontSize: "15px",
                outline: "none", boxSizing: "border-box", fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(0,255,135,0.6)"}
              onBlur={e => e.target.style.borderColor = "rgba(0,255,135,0.2)"}
            />

            <div style={{ marginTop: "8px", color: "#444", fontSize: "12px" }}>
              💡 Suggestion aléatoire : <span style={{ color: "#00ff87", cursor: "pointer" }}
                onClick={() => setProductName(suggestion)}>{suggestion}</span>
            </div>

            <button
              onClick={handleStart}
              disabled={!productName.trim()}
              style={{
                marginTop: "24px", width: "100%", padding: "15px",
                background: productName.trim() ? "linear-gradient(135deg, #00ff87, #00cc6a)" : "rgba(255,255,255,0.05)",
                border: "none", borderRadius: "10px", color: productName.trim() ? "#000" : "#333",
                fontSize: "14px", fontWeight: "700", letterSpacing: "2px", cursor: productName.trim() ? "pointer" : "default",
                fontFamily: "inherit", transition: "all 0.2s",
              }}
            >
              ANALYSER CE PRODUIT →
            </button>

            {/* Criteria preview */}
            <div style={{ marginTop: "28px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {CRITERIA.map(c => (
                <div key={c.id} style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "20px", padding: "5px 12px", color: "#555", fontSize: "11px",
                }}>
                  {c.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP: QUIZ */}
        {step === "quiz" && (
          <div>
            {/* Progress */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#555", fontSize: "11px", letterSpacing: "1px" }}>
                  QUESTION {currentQ + 1} / {CRITERIA.length}
                </span>
                <span style={{ color: "#00ff87", fontSize: "11px" }}>
                  {productName.toUpperCase()}
                </span>
              </div>
              <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
                <div style={{
                  height: "100%", borderRadius: "2px",
                  background: "linear-gradient(90deg, #00ff87, #00cc6a)",
                  width: `${progress}%`, transition: "width 0.4s ease",
                }} />
              </div>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px", padding: "32px",
            }}>
              <div style={{
                display: "inline-block", background: "rgba(0,255,135,0.1)",
                border: "1px solid rgba(0,255,135,0.2)", borderRadius: "6px",
                padding: "4px 10px", color: "#00ff87", fontSize: "11px",
                letterSpacing: "1px", marginBottom: "16px",
              }}>
                {CRITERIA[currentQ].label}
              </div>

              <p style={{
                color: "#fff", fontSize: "clamp(16px, 3vw, 20px)", lineHeight: "1.5",
                margin: "0 0 32px 0", fontWeight: "500",
              }}>
                {CRITERIA[currentQ].question}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { val: 1, label: "OUI", sub: "Clairement ✓", color: "#00ff87" },
                  { val: 0.5, label: "PEUT-ÊTRE", sub: "Pas sûr...", color: "#ffd700" },
                  { val: 0, label: "NON", sub: "Pas vraiment", color: "#ff4757" },
                  { val: 0, label: "JE SAIS PAS", sub: "À vérifier", color: "#888" },
                ].map(opt => (
                  <button key={opt.label} onClick={() => handleAnswer(opt.val)}
                    style={{
                      padding: "16px", background: "rgba(255,255,255,0.02)",
                      border: `1px solid rgba(${opt.color === "#00ff87" ? "0,255,135" : opt.color === "#ffd700" ? "255,215,0" : opt.color === "#ff4757" ? "255,71,87" : "255,255,255"},0.15)`,
                      borderRadius: "10px", color: opt.color, cursor: "pointer",
                      fontFamily: "inherit", transition: "all 0.15s", textAlign: "left",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ fontWeight: "700", fontSize: "13px", letterSpacing: "1px" }}>{opt.label}</div>
                    <div style={{ fontSize: "11px", opacity: 0.6, marginTop: "3px" }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP: RESULT */}
        {step === "result" && level && (
          <div>
            <div style={{
              background: level.bg, border: `1px solid ${level.color}22`,
              borderRadius: "16px", padding: "32px", textAlign: "center", marginBottom: "20px",
            }}>
              {/* Score circle */}
              <div style={{
                width: "120px", height: "120px", margin: "0 auto 20px",
                borderRadius: "50%", border: `3px solid ${level.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `radial-gradient(circle, ${level.color}11, transparent)`,
                position: "relative",
              }}>
                <svg style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke={`${level.color}22`} strokeWidth="3" />
                  <circle cx="60" cy="60" r="54" fill="none" stroke={level.color} strokeWidth="3"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${2 * Math.PI * 54 * (1 - animScore / 100)}`}
                    strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.1s" }}
                  />
                </svg>
                <div>
                  <div style={{ color: level.color, fontSize: "32px", fontWeight: "700", lineHeight: 1 }}>
                    {animScore}
                  </div>
                  <div style={{ color: "#555", fontSize: "11px" }}>/ 100</div>
                </div>
              </div>

              <div style={{ color: level.color, fontSize: "18px", fontWeight: "700", letterSpacing: "1px", marginBottom: "8px" }}>
                {level.label}
              </div>
              <div style={{ color: "#888", fontSize: "16px", marginBottom: "6px" }}>
                "{productName}"
              </div>
              <p style={{ color: "#aaa", fontSize: "14px", lineHeight: "1.6", margin: "12px 0 0" }}>
                {level.desc}
              </p>
            </div>

            {/* Breakdown */}
            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px", padding: "24px", marginBottom: "16px",
            }}>
              <div style={{ color: "#555", fontSize: "11px", letterSpacing: "2px", marginBottom: "16px" }}>
                DÉTAIL PAR CRITÈRE
              </div>
              {CRITERIA.map(c => {
                const val = answers[c.id] ?? 0;
                const pct = val * 100;
                const col = val === 1 ? "#00ff87" : val === 0.5 ? "#ffd700" : "#ff4757";
                return (
                  <div key={c.id} style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ color: "#888", fontSize: "12px" }}>{c.label}</span>
                      <span style={{ color: col, fontSize: "12px" }}>
                        {val === 1 ? "✓ OUI" : val === 0.5 ? "~ PEUT-ÊTRE" : "✗ NON"}
                      </span>
                    </div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
                      <div style={{ height: "100%", borderRadius: "2px", background: col, width: `${pct}%`, transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <button onClick={handleReset} style={{
                padding: "14px", background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px",
                color: "#888", fontSize: "13px", cursor: "pointer", fontFamily: "inherit",
                letterSpacing: "1px", transition: "all 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
              >
                ← NOUVEAU PRODUIT
              </button>
              <button onClick={() => { setProductName(""); setStep("input"); setSuggestion(SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)]); }}
                style={{
                  padding: "14px", background: "linear-gradient(135deg, #00ff87, #00cc6a)",
                  border: "none", borderRadius: "10px", color: "#000",
                  fontSize: "13px", fontWeight: "700", cursor: "pointer",
                  fontFamily: "inherit", letterSpacing: "1px",
                }}>
                TESTER UN AUTRE →
              </button>
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "24px", color: "#333", fontSize: "11px", letterSpacing: "1px" }}>
          DROPSHIP SCANNER • SCANDINAVIE 2026
        </div>
      </div>
    </div>
  );
}
