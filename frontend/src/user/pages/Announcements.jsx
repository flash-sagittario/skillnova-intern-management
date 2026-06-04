// ══════════════════════════════════════════════
//  USER — pages/Announcements.jsx
// ══════════════════════════════════════════════

import { useState } from "react";
import { Pin, Megaphone } from "lucide-react";
import { Card, Badge, SectionHeader } from "../../shared/components/UI";
import { MOCK_ANNOUNCEMENTS } from "../../shared/utils/constants";

const PRIORITY_VARIANTS = { High: "danger", Medium: "warning", Low: "success" };
const FILTERS = ["All", "High", "Medium", "Low"];

const Announcements = () => {
  const [items,  setItems]  = useState(MOCK_ANNOUNCEMENTS);
  const [filter, setFilter] = useState("All");

  const togglePin = id =>
    setItems(items.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a));

  const filtered = items
    .filter(a => filter === "All" || a.priority === filter)
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Announcements"
        subtitle="Stay updated with platform and internship news"
        action={
          <span className="text-sm" style={{ color: 'var(--muted)' }}>{items.filter(a => a.pinned).length} pinned</span>
        }
      />

      {/* Priority Filter */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 hover:shadow-orange-500/20`}
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

      {/* Announcement Cards */}
      <div className="space-y-3">
        {filtered.map(a => (
          <Card
            key={a.id}
            className={`p-5 transition`}
            style={{ borderLeft: a.pinned ? '4px solid #f97316' : '1px solid var(--border)' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {a.pinned && (
                    <span className="text-xs font-black flex items-center gap-1" style={{ color: '#f97316' }}>
                      <Pin size={11} /> Pinned
                    </span>
                  )}
                  <Badge variant={PRIORITY_VARIANTS[a.priority]}>{a.priority}</Badge>
                </div>
                <h3 className="font-black tracking-tight leading-snug" style={{ color: 'var(--foreground)' }}>{a.title}</h3>
                <p className="text-sm mt-1 leading-relaxed font-medium" style={{ color: 'var(--muted)' }}>{a.desc}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-2" style={{ color: 'var(--muted)', opacity: 0.7 }}>{a.date}</p>
              </div>

              <button
                onClick={() => togglePin(a.id)}
                className={`p-1.5 rounded-lg transition flex-shrink-0`}
                style={{
                  background: a.pinned ? 'rgba(249,115,22,0.1)' : 'var(--background)',
                  color: a.pinned ? '#f97316' : 'var(--muted)',
                }}
                title={a.pinned ? "Unpin" : "Pin"}
              >
                <Pin size={15} />
              </button>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: 'var(--muted)' }}>
            <Megaphone size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold">No announcements found.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Announcements;