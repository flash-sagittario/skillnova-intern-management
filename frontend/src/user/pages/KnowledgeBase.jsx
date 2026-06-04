// ══════════════════════════════════════════════
//  USER — pages/KnowledgeBase.jsx
// ══════════════════════════════════════════════

import { useState } from "react";
import {
  Search, BookOpen, Eye, ThumbsUp, ChevronRight,
  ChevronLeft, Clock, User, CheckCircle,
} from "lucide-react";
import { Card, Badge } from "../../shared/components/UI";
import { MOCK_ARTICLES } from "../../shared/utils/constants";

const CATEGORIES = ["All", "Onboarding", "Reports", "Technical", "Templates", "Meetings"];

/* ── Article Detail ─── */
const ArticleDetail = ({ article, onBack }) => (
  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm mb-6 font-black uppercase tracking-widest transition-all hover:translate-x-[-4px]"
      style={{ color: '#f97316' }}
    >
      <ChevronLeft size={16} strokeWidth={3} /> Back to Library
    </button>

    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="default">{article.category}</Badge>
        {article.verified && <Badge variant="success">✓ Verified by Admin</Badge>}
      </div>

      <h1 className="text-4xl font-black tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
        {article.title}
      </h1>

      <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest mb-8 pb-6 border-b"
        style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}>
        <span className="flex items-center gap-2"><User size={14} className="text-orange-500" /> {article.author}</span>
        <span className="flex items-center gap-2"><Clock size={14} className="text-orange-500" /> {article.date}</span>
        <span className="flex items-center gap-2"><Eye size={14} className="text-orange-500" /> {article.views} views</span>
      </div>

      <Card className="p-8 space-y-6 leading-relaxed mb-10">
        <p style={{ color: 'var(--foreground)', opacity: 0.9 }}>
          This is the full content of <strong>{article.title}</strong>. In a live implementation this
          section renders rich text — headings, code blocks, embedded videos, images and more powered
          by a WYSIWYG editor like TipTap or Slate.
        </p>
        <p style={{ color: 'var(--foreground)', opacity: 0.9 }}>
          Knowledge articles help interns find answers fast, collaborate effectively, and maintain a
          shared source of truth across all departments. Admins can verify articles to mark them as
          authoritative.
        </p>
        <div className="rounded-2xl p-6 text-sm relative overflow-hidden" 
          style={{ background: 'var(--background)', border: '1px solid #f97316' }}>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <BookOpen size={80} />
          </div>
          <span className="font-black uppercase tracking-widest block mb-2" style={{ color: '#f97316' }}>💡 Pro Tip</span>
          <p style={{ color: 'var(--foreground)' }}>Use the search bar at the top to quickly find related articles or filter by category.</p>
        </div>
      </Card>

      <div className="flex items-center gap-4 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-sm font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Was this helpful?</p>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-500/20"
          style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
          <ThumbsUp size={16} /> Yes ({article.helpful})
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border text-sm font-black uppercase tracking-widest transition-all active:scale-95"
          style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
          No
        </button>
      </div>
    </div>
  </div>
);

/* ── Main Page ─── */
const KnowledgeBase = () => {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <ArticleDetail article={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = MOCK_ARTICLES.filter(a =>
    (category === "All" || a.category === category) &&
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* Hero Search Banner */}
      <div
        className="rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl shadow-orange-500/5"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", border: '1px solid #334155' }}
      >
        <div className="absolute top-0 left-0 w-64 h-64 -ml-20 -mt-20 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f97316, transparent 70%)' }} />
        
        <h1 className="text-4xl font-black tracking-tight text-white mb-2 uppercase">Knowledge Repository</h1>
        <p className="text-slate-400 text-sm font-medium mb-8 max-w-lg mx-auto">Explore documented technical guides, onboarding protocols and team tutorials</p>
        
        <div className="relative max-w-xl mx-auto group">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500 group-focus-within:scale-110 transition-transform" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search through intelligence library…"
            className="w-full pl-14 pr-6 py-4 rounded-2xl border bg-slate-900/50 text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all placeholder:text-slate-500"
            style={{ borderColor: '#334155' }}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm shadow-black/5 hover:scale-110 active:scale-95 hover:shadow-orange-500/30`}
            style={{
              background: category === c ? '#f97316' : 'var(--card)',
              color: category === c ? '#fff' : 'var(--muted)',
              border: category === c ? '1px solid #f97316' : '1px solid var(--border)',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--muted)', opacity: 0.6 }}>
        {filtered.length} INTEL RESOURCE{filtered.length !== 1 ? "S" : ""} IDENTIFIED
      </p>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(article => (
          <Card
            key={article.id}
            hover
            className="p-6 flex flex-col group overflow-hidden relative"
            onClick={() => setSelected(article)}
          >
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="p-3 rounded-2xl transition-all group-hover:scale-110 shadow-lg shadow-orange-500/10"
                style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                <BookOpen size={18} className="text-orange-500" />
              </div>
              {article.verified && (
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                  <CheckCircle size={12} strokeWidth={3} /> Verified
                </span>
              )}
            </div>

            <h3 className="text-lg font-black tracking-tight leading-snug mb-2 flex-1 group-hover:text-orange-500 transition-colors"
                style={{ color: 'var(--foreground)' }}>
              {article.title}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--muted)', opacity: 0.7 }}>
               <span style={{ color: '#f97316' }}>{article.category}</span> 
               <span className="opacity-30">/</span> 
               {article.date}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {article.tags.slice(0, 3).map(t => (
                <span key={t} className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight"
                  style={{ background: 'var(--background)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                  #{t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-5 border-t relative z-10" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3 text-[10px] font-black" style={{ color: 'var(--muted)' }}>
                <span className="flex items-center gap-1.5"><Eye size={12} className="text-orange-500" /> {article.views}</span>
                <span className="flex items-center gap-1.5"><ThumbsUp size={12} className="text-orange-500" /> {article.helpful}</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all group-hover:gap-3" style={{ color: '#f97316' }}>
                Open Access <ChevronRight size={14} strokeWidth={3} />
              </span>
            </div>
            
            {/* Hover Decor */}
            <div className="absolute bottom-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] transition-opacity translate-x-4 translate-y-4 pointer-events-none">
                <BookOpen size={120} />
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24" style={{ color: 'var(--muted)' }}>
          <BookOpen size={60} className="mx-auto mb-6 opacity-10" />
          <p className="text-xl font-black uppercase tracking-[0.3em] opacity-40">Intelligence Match: None</p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;