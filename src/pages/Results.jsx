import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [checked, setChecked] = useState(() => new Set());
  const [copied, setCopied] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const raw = localStorage.getItem('skillaunch_idea');
    if (!raw) { navigate('/onboarding', { replace: true }); return; }
    try {
      setIdea(JSON.parse(raw));
    } catch {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);

  const toggleChecklist = (i) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const copyText = (text, label) => {
    navigator.clipboard.writeText(text || '');
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); }, 1000);
  };

  if (!idea) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0a0a14]">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-spin">⚙️</div>
          <p className="text-white/60">Loading your idea...</p>
        </div>
      </main>
    );
  }

  const {
    businessName, tagline, idea: description,
    targetCustomers = [], pricing = {}, materials = [],
    startupChecklist = [], startupCost, profitPerSale,
    breakEvenSales, weeklyTimeCommitment, instaBio, whatsappPitch,
  } = idea;

  const checklistProgress = Math.round((checked.size / (startupChecklist.length || 1)) * 100);
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappPitch || '')}`;

  const tabs = ['overview', 'financials', 'checklist', 'brand kit'];

  return (
    <main className="min-h-screen bg-[#0a0a14] px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── HERO HEADER ── */}
        <div className="relative rounded-3xl overflow-hidden bg-[#1a1a2e] border border-white/10 p-8">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-500/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-orange-500/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold tracking-wider uppercase">
                ✨ Your Business Idea
              </span>
            </div>
            <h1 style={{ fontFamily: 'Georgia, serif' }}
              className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
              {businessName}
            </h1>
            <p className="text-orange-400 text-lg italic mb-6">{tagline}</p>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl border-l-2 border-orange-500 pl-4">
              {description}
            </p>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: '💰', label: 'Startup Cost', value: `₹${Number(startupCost).toLocaleString('en-IN')}`, color: 'text-orange-400' },
            { icon: '📈', label: 'Profit / Sale', value: `₹${Number(profitPerSale).toLocaleString('en-IN')}`, color: 'text-green-400' },
            { icon: '🎯', label: 'Break-even', value: `${breakEvenSales} sales`, color: 'text-blue-400' },
            { icon: '⏱️', label: 'Time / week', value: weeklyTimeCommitment, color: 'text-purple-400' },
          ].map((s) => (
            <div key={s.label} className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-4 text-center hover:border-orange-500/30 transition-all">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all capitalize
                ${activeTab === tab
                  ? 'bg-orange-500 text-white'
                  : 'bg-[#1a1a2e] text-white/50 border border-white/10 hover:border-orange-500/40'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── TAB: OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="space-y-4">

            {/* Target Customers */}
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-white text-xl font-bold mb-4">
                🎯 Target Customers
              </h2>
              <div className="flex flex-wrap gap-2">
                {targetCustomers.map((c, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-white text-xl font-bold mb-4">
                💵 Suggested Pricing
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Per unit', value: pricing.perUnit },
                  { label: 'Weekly plan', value: pricing.weeklyPlan },
                  { label: 'Monthly plan', value: pricing.monthlyPlan },
                ].map((p) => (
                  <div key={p.label} className="bg-[#0f0f1f] rounded-xl p-4 text-center border border-white/5">
                    <div className="text-orange-400 text-2xl font-bold">₹{Number(p.value).toLocaleString('en-IN')}</div>
                    <div className="text-white/40 text-xs mt-1">{p.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-white text-xl font-bold mb-4">
                🛒 Materials Needed
              </h2>
              <div className="space-y-2">
                {materials.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    <span className="text-orange-500 text-lg">•</span>
                    <span className="text-white/80 text-sm">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: FINANCIALS ── */}
        {activeTab === 'financials' && (
          <div className="space-y-4">
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-white text-xl font-bold mb-6">
                📊 Financial Breakdown
              </h2>
              <div className="space-y-5">
                {[
                  { label: 'Total startup investment', value: `₹${Number(startupCost).toLocaleString('en-IN')}`, bar: 100, color: 'bg-orange-500' },
                  { label: 'Profit per sale', value: `₹${Number(profitPerSale).toLocaleString('en-IN')}`, bar: Math.min((profitPerSale / startupCost) * 100 * 5, 100), color: 'bg-green-500' },
                  { label: 'Sales needed to break even', value: `${breakEvenSales} sales`, bar: Math.min(100 - (breakEvenSales / 100) * 10, 90), color: 'bg-blue-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/60 text-sm">{item.label}</span>
                      <span className="text-white font-semibold text-sm">{item.value}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.bar}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reality check */}
            <div className="bg-[#1a1a2e] border border-orange-500/20 rounded-2xl p-6">
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-white text-xl font-bold mb-2">
                🔍 Reality Check
              </h2>
              <p className="text-white/50 text-sm mb-4">Based on 10 sales/week estimate</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Monthly revenue', value: `₹${(profitPerSale * 2.5 * 10 * 4).toLocaleString('en-IN')}` },
                  { label: 'Monthly profit', value: `₹${Math.max(0, (profitPerSale * 10 * 4) - (startupCost / 6)).toLocaleString('en-IN')}` },
                  { label: 'Break-even in weeks', value: `~${Math.ceil(startupCost / (profitPerSale * 10))} weeks` },
                  { label: 'Yearly potential', value: `₹${(profitPerSale * 10 * 52).toLocaleString('en-IN')}` },
                ].map((r) => (
                  <div key={r.label} className="bg-[#0f0f1f] rounded-xl p-4 border border-white/5">
                    <div className="text-green-400 text-lg font-bold">{r.value}</div>
                    <div className="text-white/40 text-xs mt-1">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: CHECKLIST ── */}
        {activeTab === 'checklist' && (
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-white text-xl font-bold">
                ✅ Startup Checklist
              </h2>
              <span className="text-orange-400 text-sm font-semibold">{checked.size}/{startupChecklist.length} done</span>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${checklistProgress}%` }} />
            </div>

            {checklistProgress === 100 && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-4 text-center">
                <p className="text-green-400 font-semibold">🎉 You're ready to launch!</p>
              </div>
            )}

            <div className="space-y-2">
              {startupChecklist.map((item, i) => (
                <div key={i} onClick={() => toggleChecklist(i)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border
                    ${checked.has(i)
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-[#0f0f1f] border-white/5 hover:border-orange-500/20'}`}>
                  <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${checked.has(i) ? 'bg-green-500 border-green-500' : 'border-white/20'}`}>
                    {checked.has(i) && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <span className={`text-sm leading-relaxed ${checked.has(i) ? 'text-white/30 line-through' : 'text-white/80'}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: BRAND KIT ── */}
        {activeTab === 'brand kit' && (
          <div className="space-y-4">

            {/* Brand name */}
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-white text-xl font-bold mb-4">
                ✨ Your Brand Name
              </h2>
              <div className="bg-[#0f0f1f] rounded-xl p-6 text-center border border-orange-500/20 mb-4">
                <p style={{ fontFamily: 'Georgia, serif' }} className="text-4xl font-bold text-orange-400">
                  {businessName}
                </p>
                <p className="text-white/40 text-sm mt-2 italic">{tagline}</p>
              </div>
              <button onClick={() => copyText(businessName, 'name')}
                className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-2xl transition-all">
                {copied === 'name' ? '✓ Copied!' : 'Copy Brand Name'}
              </button>
            </div>

            {/* Instagram bio */}
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📸</span>
                <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-white text-xl font-bold">
                  Instagram Bio
                </h2>
              </div>
              <div className="bg-[#0f0f1f] rounded-xl p-4 border border-white/5 mb-4">
                <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line font-mono">
                  {instaBio}
                </p>
              </div>
              <button onClick={() => copyText(instaBio, 'insta')}
                className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-2xl transition-all">
                {copied === 'insta' ? '✓ Copied!' : 'Copy Instagram Bio'}
              </button>
            </div>

            {/* WhatsApp pitch */}
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💬</span>
                <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-white text-xl font-bold">
                  WhatsApp Pitch
                </h2>
              </div>
              <div className="bg-[#0f0f1f] rounded-xl p-4 border border-white/5 mb-4">
                <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
                  {whatsappPitch}
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => copyText(whatsappPitch, 'wa')}
                  className="flex-1 border border-white/20 hover:border-orange-500/40 text-white/70 font-semibold py-3 rounded-2xl transition-all text-sm">
                  {copied === 'wa' ? '✓ Copied!' : 'Copy pitch'}
                </button>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-2xl transition-all text-sm text-center flex items-center justify-center gap-2">
                  <span>Open WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── ACTION BUTTONS ── */}
        <div className="flex flex-wrap gap-3 justify-end pt-2 pb-6">
          <button onClick={() => { localStorage.clear(); navigate('/onboarding'); }}
            className="px-6 py-3 rounded-2xl border border-white/20 text-white/60 text-sm hover:border-orange-500/40 transition-all">
            Start over
          </button>
          <button onClick={handleSave} disabled={saving || saved}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all
              ${saved ? 'bg-green-600 text-white' : 'bg-[#1a1a2e] border border-orange-500/40 text-orange-400 hover:bg-orange-500/10'}`}>
            {saved ? '✓ Saved!' : saving ? 'Saving...' : '💾 Save Idea'}
          </button>
          <button onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-all">
            View Dashboard →
          </button>
        </div>

      </div>
    </main>
  );
}

export default Results;