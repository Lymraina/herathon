import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [checked, setChecked] = useState(() => new Set());
  const [copied, setCopied] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [logoStyle, setLogoStyle] = useState(0); // 0: minimal, 1: rounded, 2: badge

  useEffect(() => {
    const raw = localStorage.getItem("skillaunch_idea") || "{}";

    try {
      const parsed = JSON.parse(raw);
      if (!parsed.businessName) {
        navigate("/onboarding", { replace: true });
      } else {
        setIdea(parsed);
      }
    } catch (error) {
      console.error("Error parsing idea data:", error);
      navigate("/onboarding", { replace: true });
    }
  }, [navigate]);

  // Location heat map: which areas are best for this business (high demand = hot)
  const getLocationHeatMap = (skill = "") => {
    const s = String(skill).toLowerCase();
    const heat = (location, level, reason) => ({ location, level, reason });
    if (s.includes("cook") || s.includes("food") || s.includes("tiffin") || s.includes("catering")) {
      return [
        heat("PGs (Paying Guest)", "high", "Residents need home-cooked meals daily"),
        heat("Hostels", "high", "Students look for affordable, homely food"),
        heat("Residential Societies", "high", "Families want tiffin or home delivery"),
        heat("Colleges / Universities", "medium", "Canteen alternative, event catering"),
        heat("Corporate Parks", "medium", "Office lunch & party orders"),
        heat("Near Hospitals", "low", "Patient family meals")
      ];
    }
    if (s.includes("tutor") || s.includes("teaching") || s.includes("coaching") || s.includes("education")) {
      return [
        heat("Residential Areas", "high", "Parents seek home tutors for kids"),
        heat("PGs & Hostels", "high", "Students need exam prep and doubt sessions"),
        heat("Schools / Coaching Hubs", "high", "Supplement classes, competition prep"),
        heat("Colleges", "high", "Placement prep, language, skills"),
        heat("Libraries", "medium", "Study groups and doubt sessions")
      ];
    }
    if (s.includes("design") || s.includes("graphic") || s.includes("logo") || s.includes("digital")) {
      return [
        heat("Startup Hubs", "high", "Early-stage companies need branding"),
        heat("IT Parks", "high", "Corporates need design & marketing assets"),
        heat("Co-working Spaces", "high", "Freelancers & small teams"),
        heat("Residential", "medium", "Personal projects, events, gifts"),
        heat("Colleges", "medium", "Event posters, society branding")
      ];
    }
    // Default for other skills
    return [
      heat("Residential Societies", "high", "Regular local demand"),
      heat("PGs & Hostels", "high", "Dense population, repeat customers"),
      heat("Commercial Areas", "medium", "Shops & small offices"),
      heat("Schools / Colleges", "medium", "Events and institutional clients"),
      heat("IT Parks / Corporates", "medium", "B2B opportunities")
    ];
  };

  const answersRaw = localStorage.getItem("skillaunch_answers") || "{}";
  const answers = (() => {
    try {
      return JSON.parse(answersRaw);
    } catch {
      return {};
    }
  })();
  const locationHeatMap = getLocationHeatMap(answers.skill);

  const toggleChecklist = (i) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text || "");
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1000);
  };

  if (!idea) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0a0a14]">
        <p className="text-white/60">Loading your idea...</p>
      </main>
    );
  }

  const {
    businessName,
    tagline,
    idea: description,
    targetCustomers = [],
    pricing = {},
    materials = [],
    startupChecklist = [],
    startupCost,
    profitPerSale,
    breakEvenSales,
    weeklyTimeCommitment,
    instaBio,
    whatsappPitch,
    competitorLandscape,
    firstWeekPlan = {},
    localMarketingTips = []
  } = idea;

  const checklistProgress = Math.round(
    (checked.size / (startupChecklist.length || 1)) * 100
  );

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    whatsappPitch || ""
  )}`;

  // Generate initials from business name (first letter of first 2 words, or first 2 chars)
  const getInitials = (name) => {
    const words = String(name || "B").trim().split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return (name || "B").slice(0, 2).toUpperCase();
  };

  const initials = getInitials(businessName);

  const logoStyleNames = ["Minimal", "Rounded", "Badge"];

  const getLogoSvgString = (style) => {
    const s = style % 3;
    const gradient = `<linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ed8936"/><stop offset="100%" stop-color="#dd6b20"/></linearGradient>`;
    const darkGrad = `<linearGradient id="gd" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#0f0f1f"/></linearGradient>`;
    let shape = "";
    if (s === 0) shape = `<circle cx="60" cy="60" r="55" fill="url(#g)"/>`;
    else if (s === 1) shape = `<rect x="5" y="5" width="110" height="110" rx="24" fill="url(#gd)" stroke="#ed8936" stroke-width="3"/>`;
    else shape = `<rect x="5" y="5" width="110" height="110" rx="24" fill="url(#g)"/>`;
    return `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs>${gradient}${s === 1 ? darkGrad : ""}</defs>${shape}<text x="60" y="72" text-anchor="middle" fill="white" font-size="42" font-weight="700" font-family="Georgia,serif">${initials}</text></svg>`;
  };

  const handleDownloadLogo = () => {
    const svgData = getLogoSvgString(logoStyle);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(businessName || "logo").replace(/\s+/g, "-")}-logo.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = ["overview", "financials", "checklist", "brand kit"];

  return (
    <main className="min-h-screen bg-[#0a0a14] px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HERO */}
        <div className="bg-[#1a1a2e] border border-white/10 rounded-3xl p-8">
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase">
            ✨ Your Business Idea
          </span>

          <h1
            style={{ fontFamily: "Georgia, serif" }}
            className="text-4xl font-bold text-white mt-3"
          >
            {businessName}
          </h1>

          <p className="text-orange-400 italic mt-2">{tagline}</p>

          <p className="text-white/70 mt-5 border-l-2 border-orange-500 pl-4">
            {description}
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "💰", label: "Startup Cost", value: startupCost },
            { icon: "📈", label: "Profit / Sale", value: profitPerSale },
            { icon: "🎯", label: "Break-even", value: `${breakEvenSales} sales` },
            { icon: "⏱️", label: "Time / week", value: weeklyTimeCommitment }
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4 text-center"
            >
              <div className="text-2xl">{s.icon}</div>
              <div className="text-lg text-orange-400 font-bold mt-1">
                {s.value || "—"}
              </div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm capitalize ${
                activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "bg-[#1a1a2e] text-white/60 border border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Target Customers */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                🎯 Target Customers
              </h2>
              <div className="flex flex-wrap gap-2">
                {targetCustomers.length > 0 ? (
                  targetCustomers.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-sm"
                    >
                      {c}
                    </span>
                  ))
                ) : (
                  <p className="text-white/40 text-sm">No target customers specified.</p>
                )}
              </div>
            </div>

            {/* Location Heat Map */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-2">
                🗺️ Location Heat Map
              </h2>
              <p className="text-white/50 text-sm mb-4">
                Where your business can thrive — hotter = higher demand in your city
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {locationHeatMap.map((item, i) => {
                  const styles = {
                    high: "bg-gradient-to-br from-red-500/90 to-orange-600/90 text-white border-red-400/50",
                    medium: "bg-gradient-to-br from-amber-500/70 to-orange-500/70 text-white border-amber-400/40",
                    low: "bg-gradient-to-br from-slate-600/60 to-slate-700/60 text-white/90 border-slate-500/30"
                  };
                  const labels = { high: "🔥 Hot", medium: "🌡️ Warm", low: "❄️ Cool" };
                  return (
                    <div
                      key={i}
                      className={`rounded-xl p-4 border ${styles[item.level]} transition-transform hover:scale-[1.02]`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{item.location}</span>
                        <span className="text-xs opacity-90">{labels[item.level]}</span>
                      </div>
                      <p className="text-xs opacity-90 mt-1">{item.reason}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-3 text-xs text-white/40">
                <span>🔥 Hot = High demand</span>
                <span>🌡️ Warm = Medium</span>
                <span>❄️ Cool = Lower potential</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                💵 Pricing
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Per unit", value: pricing.perUnit },
                  { label: "Weekly", value: pricing.weeklyPlan },
                  { label: "Monthly", value: pricing.monthlyPlan },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="bg-[#0f0f1f] rounded-lg p-3 text-center"
                  >
                    <div className="text-orange-400 font-bold">
                      {p.value || "—"}
                    </div>
                    <div className="text-white/40 text-xs mt-1">{p.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                🛒 Materials Needed
              </h2>
              {materials.length > 0 ? (
                materials.map((m, i) => (
                  <p key={i} className="text-white/70 text-sm">
                    • {m}
                  </p>
                ))
              ) : (
                <p className="text-white/40 text-sm">No materials specified.</p>
              )}
            </div>

            {/* Launch Plan */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                🚀 First Week Launch Plan
              </h2>
              {Object.keys(firstWeekPlan).length > 0 ? (
                Object.entries(firstWeekPlan).map(([day, task]) => (
                  <p key={day} className="text-white/70 text-sm">
                    <span className="text-orange-400 capitalize font-semibold">
                      {day}
                    </span>{" "}
                    — {task}
                  </p>
                ))
              ) : (
                <p className="text-white/40 text-sm">No launch plan available.</p>
              )}
            </div>

            {/* Time Management Tips for Homeworkers (when 5-10 hrs or less) */}
            {(() => {
              const hrs = String(weeklyTimeCommitment || '').toLowerCase();
              const hasLimitedHours = hrs.includes('5-10') || hrs.includes('1-5');
              return hasLimitedHours;
            })() && (
              <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
                <h2 className="text-white text-xl font-bold mb-3">
                  ⏰ Time Management Tips for Homeworkers
                </h2>
                <p className="text-white/50 text-sm mb-3">
                  With {weeklyTimeCommitment} hours/week, here’s how to make the most of your time at home:
                </p>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• <strong className="text-orange-400">Block focus time</strong> — Schedule 1–2 hour blocks when the house is calm (early morning or after kids sleep).</li>
                  <li>• <strong className="text-orange-400">Batch similar tasks</strong> — Do all client calls on certain days, content creation on others, to avoid context-switching.</li>
                  <li>• <strong className="text-orange-400">Use a dedicated workspace</strong> — Even a small corner signals “work mode” and helps family respect your boundaries.</li>
                  <li>• <strong className="text-orange-400">Automate what you can</strong> — Use WhatsApp quick replies, templates, and simple booking tools to save time.</li>
                  <li>• <strong className="text-orange-400">Set clear boundaries</strong> — Tell family your focus hours so they know when not to disturb.</li>
                  <li>• <strong className="text-orange-400">Track your wins</strong> — Note what tasks took longer than expected and adjust next week’s plan.</li>
                </ul>
              </div>
            )}

            {/* Marketing Tips */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                📣 Marketing Tips
              </h2>
              {localMarketingTips.length > 0 ? (
                localMarketingTips.map((tip, i) => (
                  <p key={i} className="text-white/70 text-sm">
                    • {tip}
                  </p>
                ))
              ) : (
                <p className="text-white/40 text-sm">No marketing tips available.</p>
              )}
            </div>

            {/* Market Insight */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                🧠 Market Insight
              </h2>
              <p className="text-white/70 text-sm">
                {competitorLandscape || "No market insight available."}
              </p>
            </div>
          </div>
        )}

        {/* FINANCIALS */}
        {activeTab === "financials" && (
          <div className="space-y-4">
            {/* Financial Overview */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-4">
                💰 Financial Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f0f1f] rounded-lg p-4">
                  <div className="text-white/40 text-sm mb-1">Startup Cost</div>
                  <div className="text-orange-400 text-2xl font-bold">
                    {startupCost || "—"}
                  </div>
                </div>
                <div className="bg-[#0f0f1f] rounded-lg p-4">
                  <div className="text-white/40 text-sm mb-1">Profit per Sale</div>
                  <div className="text-orange-400 text-2xl font-bold">
                    {profitPerSale || "—"}
                  </div>
                </div>
                <div className="bg-[#0f0f1f] rounded-lg p-4">
                  <div className="text-white/40 text-sm mb-1">
                    Break-even Sales
                  </div>
                  <div className="text-orange-400 text-2xl font-bold">
                    {breakEvenSales || "—"} sales
                  </div>
                </div>
                <div className="bg-[#0f0f1f] rounded-lg p-4">
                  <div className="text-white/40 text-sm mb-1">
                    Weekly Time Commitment
                  </div>
                  <div className="text-orange-400 text-2xl font-bold">
                    {weeklyTimeCommitment || "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-4">
                💵 Pricing Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Per Unit", value: pricing.perUnit },
                  { label: "Weekly Plan", value: pricing.weeklyPlan },
                  { label: "Monthly Plan", value: pricing.monthlyPlan },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="bg-[#0f0f1f] rounded-lg p-4 text-center"
                  >
                    <div className="text-white/40 text-sm mb-2">{p.label}</div>
                    <div className="text-orange-400 text-xl font-bold">
                      {p.value || "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHECKLIST */}
        {activeTab === "checklist" && (
          <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
            <h2 className="text-white text-xl font-bold mb-4">
              Startup Checklist
            </h2>
            {startupChecklist.length > 0 ? (
              startupChecklist.map((item, i) => (
                <div
                  key={i}
                  onClick={() => toggleChecklist(i)}
                  className="flex gap-3 py-2 cursor-pointer hover:bg-white/5 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checked.has(i)}
                    readOnly
                    className="cursor-pointer"
                  />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))
            ) : (
              <p className="text-white/40 text-sm">No checklist items available.</p>
            )}
            <div className="mt-4 text-orange-400 text-sm">
              Progress: {checklistProgress}%
            </div>
          </div>
        )}

        {/* BRAND KIT */}
        {activeTab === "brand kit" && (
          <div className="space-y-4">
            {/* Custom Logo */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                🎨 Custom Logo
              </h2>
              <p className="text-white/50 text-sm mb-4">
                Generated for {businessName} — download and use for social media, cards, and branding
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-[#0f0f1f] border border-white/10 flex items-center justify-center p-2 overflow-hidden">
                  <svg viewBox="0 0 120 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ed8936" />
                        <stop offset="100%" stopColor="#dd6b20" />
                      </linearGradient>
                      <linearGradient id="logoDark" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a1a2e" />
                        <stop offset="100%" stopColor="#0f0f1f" />
                      </linearGradient>
                    </defs>
                    {logoStyle === 0 && <circle cx="60" cy="60" r="55" fill="url(#logoGrad)" />}
                    {logoStyle === 1 && <rect x="5" y="5" width="110" height="110" rx="24" fill="url(#logoDark)" stroke="#ed8936" strokeWidth="3" />}
                    {logoStyle === 2 && <rect x="5" y="5" width="110" height="110" rx="24" fill="url(#logoGrad)" />}
                    <text x="60" y="72" textAnchor="middle" fill="white" fontSize="42" fontWeight="700" style={{ fontFamily: "Georgia, serif" }}>
                      {initials}
                    </text>
                  </svg>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <span className="text-white/60 text-sm">Style</span>
                    <div className="flex gap-2 mt-1">
                      {logoStyleNames.map((name, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setLogoStyle(i)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            logoStyle === i
                              ? "bg-orange-500 text-white"
                              : "bg-white/10 text-white/70 hover:bg-white/15"
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadLogo}
                    className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    Download SVG
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                Instagram Bio
              </h2>
              <p className="text-white/80 mb-4">
                {instaBio || "No Instagram bio available."}
              </p>
              <button
                onClick={() => copyText(instaBio, "insta")}
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                disabled={!instaBio}
              >
                {copied === "insta" ? "Copied!" : "Copy Bio"}
              </button>
            </div>

            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                WhatsApp Pitch
              </h2>
              <p className="text-white/80 mb-4">
                {whatsappPitch || "No WhatsApp pitch available."}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => copyText(whatsappPitch, "wa")}
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                  disabled={!whatsappPitch}
                >
                  {copied === "wa" ? "Copied!" : "Copy"}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                  aria-label="Open WhatsApp with pitch"
                >
                  Open WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/onboarding");
            }}
            className="border border-white/20 hover:border-white/40 px-4 py-2 rounded-lg text-white/60 hover:text-white/80 transition-colors"
          >
            Start over
          </button>
          <button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
            disabled={saving || saved}
          >
            {saved ? "Saved!" : saving ? "Saving..." : "Save Idea"}
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white transition-colors"
          >
            View Dashboard
          </button>
        </div>

      </div>
    </main>
  );
}

export default Results;