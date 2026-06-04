// ══════════════════════════════════════════════
//  ADMIN — pages/KnowledgeBase.jsx
// ══════════════════════════════════════════════

import { useState } from "react";
import {
  Search, BookOpen, Eye, ThumbsUp, CheckCircle,
  Plus, Trash2, ShieldCheck, X,
} from "lucide-react";
import { Card, Badge, SectionHeader } from "../../shared/components/UI";
import { MOCK_ARTICLES } from "../../shared/utils/constants";

const CATEGORIES = ["All", "Onboarding", "Reports", "Technical", "Templates", "Meetings"];

const KnowledgeBase = () => {
  const [articles,  setArticles]  = useState(MOCK_ARTICLES);
  const [search,    setSearch]    = useState("");
  const [category,  setCategory]  = useState("All");
  const [showForm,  setShowForm]  = useState(false);
  const [form,      setForm]      = useState({ title: "", category: "General" });

  const toggleVerify = id =>
    setArticles(as => as.map(a => a.id === id ? { ...a, verified: !a.verified } : a));

  const deleteArticle = id =>
    setArticles(as => as.filter(a => a.id !== id));

  const handleAdd = () => {
    if (!form.title.trim()) return;
    setArticles([{
      id:       Date.now(),
      title:    form.title,
      category: form.category,
      views:    0,
      helpful:  0,
      author:   "Admin",
      date:     "Mar 18, 2026",
      tags:     [],
      verified: false,
    }, ...articles]);
    setForm({ title: "", category: "General" });
    setShowForm(false);
  };

  const filtered = articles.filter(a =>
    (category === "All" || a.category === category) &&
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalViews = articles.reduce((s, a) => s + a.views, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      <SectionHeader
        title="Intelligence Assets"
        subtitle="Operational oversight of the Knowledge Base repository"
        action={
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-500/20"
            style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
          >
            <Plus size={16} /> New Asset
          </button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-orange-500">
           <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                 <BookOpen size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Total Repositories</p>
                 <h4 className="text-2xl font-black">{articles.length}</h4>
              </div>
           </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-emerald-500">
           <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <CheckCircle size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Verified Content</p>
                 <h4 className="text-2xl font-black">{articles.filter(a => a.verified).length}</h4>
              </div>
           </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-blue-500">
           <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Eye size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Cumulative Reach</p>
                 <h4 className="text-2xl font-black">{totalViews}</h4>
              </div>
           </div>
        </Card>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="p-6 relative overflow-hidden" 
          style={{ background: 'var(--background)', border: '1px solid #f97316' }}>
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none text-orange-500">
             <Plus size={100} />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: '#f97316' }}>Initialize Knowledge Asset</h3>
            <button onClick={() => setShowForm(false)} className="hover:opacity-100 opacity-60" style={{ color: 'var(--muted)' }}>
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Article title…"
              className="flex-1 min-w-[300px] px-4 py-3 text-sm rounded-xl outline-none font-bold placeholder:opacity-50"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
            />
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="px-4 py-3 text-sm rounded-xl outline-none font-black uppercase tracking-widest cursor-pointer"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
            >
              {["General","Onboarding","Reports","Technical","Templates","Meetings"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={handleAdd}
              className="px-8 py-3 rounded-xl text-white text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-500/10 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
            >
              Initialize
            </button>
          </div>
        </Card>
      )}

      {/* Search + Category */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 group-focus-within:scale-110 transition-transform" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter library assets…"
            className="w-full pl-12 pr-6 py-3 rounded-xl outline-none text-sm font-bold transition-all focus:ring-2 focus:ring-orange-500/10"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:scale-110 active:scale-95 hover:shadow-orange-500/20`}
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
      </div>

      {/* Article Table */}
      <Card className="overflow-hidden p-0 border-0 shadow-2xl shadow-black/5" style={{ background: 'var(--card)' }}>
        <div className="overflow-x-auto">
           <table className="w-full text-sm">
             <thead>
               <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                 {["Article / Resource", "Category", "Author", "Reach", "Feedback", "Security", "Ops"].map(h => (
                   <th
                     key={h}
                     className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-60 ${h === "Ops" ? "text-center" : "text-left"}`}
                   >
                     {h}
                   </th>
                 ))}
               </tr>
             </thead>
             <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
               {filtered.map(a => (
                 <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors group">
                   <td className="px-6 py-5">
                     <div className="flex items-center gap-4">
                       <div className="p-2.5 rounded-xl transition-all group-hover:scale-110 shadow-lg shadow-orange-500/5 flex-shrink-0"
                         style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                         <BookOpen size={15} className="text-orange-500" />
                       </div>
                       <span className="font-black text-sm tracking-tight line-clamp-1 group-hover:text-orange-500 transition-colors" style={{ color: 'var(--foreground)' }}>
                         {a.title}
                       </span>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                      <Badge variant="gray">{a.category}</Badge>
                   </td>
                   <td className="px-6 py-5">
                      <span className="text-xs font-bold" style={{ color: 'var(--muted)' }}>{a.author}</span>
                   </td>
                   <td className="px-6 py-5">
                     <span className="flex items-center gap-2 text-xs font-black" style={{ color: 'var(--muted)' }}>
                        <Eye size={14} className="text-orange-500" /> {a.views}
                     </span>
                   </td>
                   <td className="px-6 py-5">
                     <span className="flex items-center gap-2 text-xs font-black" style={{ color: 'var(--muted)' }}>
                        <ThumbsUp size={14} className="text-orange-500" /> {a.helpful}
                     </span>
                   </td>
                   <td className="px-6 py-5">
                     {a.verified
                       ? <Badge variant="success">✓ SECURE</Badge>
                       : <Badge variant="warning">PENDING</Badge>
                     }
                   </td>
                   <td className="px-6 py-5">
                     <div className="flex items-center justify-center gap-2">
                       <button
                         onClick={() => toggleVerify(a.id)}
                         title={a.verified ? "Revoke Verification" : "Authorize Content"}
                         className="p-2.5 text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all active:scale-90 border border-transparent hover:border-emerald-500/20"
                       >
                         <ShieldCheck size={16} strokeWidth={2.5} />
                       </button>
                       <button
                         onClick={() => deleteArticle(a.id)}
                         title="Purge Record"
                         className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-all active:scale-90 border border-transparent hover:border-red-500/20"
                       >
                         <Trash2 size={16} strokeWidth={2.5} />
                       </button>
                     </div>
                   </td>
                 </tr>
               ))}
               {filtered.length === 0 && (
                 <tr>
                   <td colSpan={7} className="px-6 py-20 text-center opacity-40">
                      <div className="flex flex-col items-center gap-4">
                        <BookOpen size={40} className="stroke-1" />
                        <p className="text-sm font-black uppercase tracking-widest text-slate-400">Database Search Returned Null</p>
                      </div>
                   </td>
                 </tr>
               )}
             </tbody>
           </table>
        </div>
      </Card>

    </div>
  );
};

export default KnowledgeBase;