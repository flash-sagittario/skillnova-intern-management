// ══════════════════════════════════════════════
//  USER — Header.jsx  (CSS Variable Driven)
// ══════════════════════════════════════════════

import React, { useState } from "react";
import { Bell, Search, LayoutGrid } from "lucide-react";
import { ThemeToggle, Avatar } from "../../shared/components/UI";

const NOTIFS = [
  { text: "Your Week 1 report has been reviewed",   time: "5m ago",  dot: "orange" },
  { text: "Meeting reminder: Monday 10 AM standup", time: "1h ago",  dot: "green"  },
  { text: "New Knowledge Base article published",   time: "3h ago",  dot: "green"  },
];

const Header = ({ title }) => {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header
      className="h-20 flex items-center px-8 gap-6 flex-shrink-0 sticky top-0 z-40 transition-all duration-300"
      style={{
        background: 'var(--card)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Page Context */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
           <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 lg:hidden">
              <LayoutGrid size={20} />
           </div>
           <h1 className="text-xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>{title}</h1>
        </div>
      </div>

      {/* Global Search */}
      <div className="relative hidden lg:block group">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
        <input
          className="pl-12 pr-4 py-2.5 text-sm rounded-2xl w-80 border border-transparent focus:border-orange-500/30 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium"
          style={{ background: 'var(--background)', color: 'var(--foreground)' }}
          placeholder="Search everything..."
        />
      </div>

      {/* Action Suite */}
      <div className="flex items-center gap-3">

        {/* Toggle Mode */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="p-2.5 rounded-xl transition-all relative"
            style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--muted)' }}
          >
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-orange-500" style={{ boxShadow: '0 0 0 2px var(--card)' }} />
          </button>

          {showNotif && (
            <div
              className="absolute right-0 top-14 w-80 rounded-2xl shadow-2xl p-2"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="p-3 flex items-center justify-between mb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--foreground)' }}>Alerts</p>
                <button className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:underline">Clear</button>
              </div>
              <div className="space-y-1">
                {NOTIFS.map((n, i) => (
                  <div key={i} className="p-3 rounded-xl transition-colors cursor-pointer flex gap-3"
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--background)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.dot === 'orange' ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                    <div>
                      <p className="text-xs font-bold leading-tight mb-1" style={{ color: 'var(--card-foreground)' }}>{n.text}</p>
                      <p className="text-[10px] font-bold uppercase" style={{ color: 'var(--muted)' }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Identity */}
        <div className="flex items-center gap-3 pl-4 ml-1" style={{ borderLeft: '1px solid var(--border)' }}>
          <div className="hidden md:block text-right">
            <p className="text-xs font-black leading-tight" style={{ color: 'var(--foreground)' }}>Rahul Sharma</p>
            <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: 'var(--muted)' }}>AI/ML Intern</p>
          </div>
          <Avatar initials="RS" size="md" />
        </div>
      </div>
    </header>
  );
};

export default Header;