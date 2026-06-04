// ══════════════════════════════════════════════
//  ADMIN — pages/Announcements.jsx
// ══════════════════════════════════════════════

import { useState } from "react";
import { Plus, Pin, Trash2, Megaphone, X } from "lucide-react";
import { Card, Badge, SectionHeader } from "../../shared/components/UI";
import { MOCK_ANNOUNCEMENTS } from "../../shared/utils/constants";

const PRIORITY_VARIANTS = { High: "danger", Medium: "warning", Low: "success" };
const PRIORITIES        = ["High", "Medium", "Low"];
const FILTERS           = ["All", "High", "Medium", "Low"];

const Announcements = () => {
  const [items,    setItems]   = useState(MOCK_ANNOUNCEMENTS);
  const [filter,   setFilter]  = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]    = useState({ title: "", desc: "", priority: "Medium" });

  const togglePin = id =>
    setItems(is => is.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a));

  const deleteItem = id =>
    setItems(is => is.filter(a => a.id !== id));

  const handlePost = () => {
    if (!form.title.trim() || !form.desc.trim()) return;
    setItems([{
      id:       Date.now(),
      title:    form.title,
      desc:     form.desc,
      priority: form.priority,
      pinned:   false,
      date:     "Mar 18, 2026",
    }, ...items]);
    setForm({ title: "", desc: "", priority: "Medium" });
    setShowForm(false);
  };

  const filtered = items
    .filter(a => filter === "All" || a.priority === filter)
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Command Center: Announcements"
        subtitle="Global platform-wide broadcast system"
        action={
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-500/20"
            style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
          >
            <Plus size={16} /> New Broadcast
          </button>
        }
      />

      {/* Create Form */}
      {showForm && (
        <Card className="p-6 relative overflow-hidden" 
          style={{ background: 'var(--background)', border: '1px solid #f97316' }}>
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
             <Megaphone size={100} />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: '#f97316' }}>Create New Broadcast</h3>
            <button onClick={() => setShowForm(false)} className="hover:opacity-100 opacity-60" style={{ color: 'var(--muted)' }}>
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Announcement title…"
              className="w-full px-4 py-3 text-sm rounded-xl outline-none font-bold placeholder:opacity-50"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
            />
            <textarea
              value={form.desc}
              onChange={e => setForm({ ...form, desc: e.target.value })}
              placeholder="Message details…"
              rows={3}
              className="w-full px-4 py-3 text-sm rounded-xl outline-none font-medium placeholder:opacity-50 resize-none"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Priority Level:</label>
                <div className="flex gap-2">
                  {PRIORITIES.map(p => (
                    <button
                      key={p}
                      onClick={() => setForm({ ...form, priority: p })}
                      className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all`}
                      style={{
                        background: form.priority === p 
                          ? (p === "High" ? '#ef4444' : p === "Medium" ? '#f59e0b' : '#10b981') 
                          : 'var(--card)',
                        color: form.priority === p ? '#fff' : 'var(--muted)',
                        border: form.priority === p ? 'none' : '1px solid var(--border)',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handlePost}
                className="px-8 py-3 rounded-xl text-white text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-500/10 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
              >
                Post Now
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Filter Pills */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:scale-110 active:scale-95 hover:shadow-orange-500/20`}
            style={{
              background: filter === f ? '#f97316' : 'var(--card)',
              color: filter === f ? '#fff' : 'var(--muted)',
              border: filter === f ? '1px solid #f97316' : '1px solid var(--border)',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Broadcast List */}
      <div className="space-y-4">
        {filtered.map(a => (
          <Card
            key={a.id}
            className={`p-6 transition-all group`}
            style={{ borderLeft: a.pinned ? '4px solid #f97316' : '1px solid var(--border)' }}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {a.pinned && (
                    <span className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5" style={{ color: '#f97316' }}>
                      <Pin size={12} strokeWidth={3} /> Pinned
                    </span>
                  )}
                  <Badge variant={PRIORITY_VARIANTS[a.priority]}>{a.priority}</Badge>
                </div>
                <h3 className="text-lg font-black tracking-tight leading-snug mb-2" style={{ color: 'var(--foreground)' }}>{a.title}</h3>
                <p className="text-sm font-medium leading-relaxed max-w-2xl" style={{ color: 'var(--muted)' }}>{a.desc}</p>
                <div className="flex items-center gap-4 mt-4">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--muted)', opacity: 0.6 }}>Deployed: {a.date}</p>
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => togglePin(a.id)}
                  title={a.pinned ? "Unpin" : "Pin"}
                  className={`p-2.5 rounded-xl transition-all active:scale-90`}
                  style={{
                    background: a.pinned ? 'rgba(249,115,22,0.1)' : 'var(--background)',
                    color: a.pinned ? '#f97316' : 'var(--muted)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <Pin size={16} />
                </button>
                <button
                  onClick={() => deleteItem(a.id)}
                  title="Wipe Broadcast"
                  className="p-2.5 text-red-500 rounded-xl transition-all border border-transparent hover:border-red-500/20 active:scale-90"
                  style={{ background: 'var(--background)' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-24 text-slate-400">
            <Megaphone size={60} className="mx-auto mb-6 opacity-10" />
            <p className="text-xl font-black uppercase tracking-[0.3em] opacity-40">Zero Broadcasts Found</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Announcements;