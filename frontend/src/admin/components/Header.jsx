// ══════════════════════════════════════════════
//  ADMIN — Header.jsx  (CSS Variable Driven)
// ══════════════════════════════════════════════

import React, { useState } from "react";
import { Bell, Search, Shield, Zap } from "lucide-react";
import { ThemeToggle, Avatar, Badge } from "../../shared/components/UI";

const NOTIFS = [
  { text: "New report submitted by Rahul Sharma",  time: "5m ago"  },
  { text: "3 reports pending review",              time: "2h ago"  },
  { text: "Platform maintenance tomorrow",         time: "1d ago"  },
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
      {/* Admin Context */}
      <div className="flex-1 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 shadow-inner">
          <Shield size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-sm font-black uppercase tracking-widest mb-0.5" style={{ color: 'var(--muted)' }}>Control Tower</h1>
          <p className="text-lg font-black tracking-tight leading-none" style={{ color: 'var(--foreground)' }}>{title}</p>
        </div>
      </div>

      {/* Admin Search Bar */}
      <div className="relative hidden lg:block group">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
        <input
          className="pl-12 pr-4 py-2.5 text-xs rounded-2xl w-72 border border-transparent focus:border-orange-500/30 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-black uppercase tracking-widest"
          style={{ background: 'var(--background)', color: 'var(--foreground)' }}
          placeholder="System Search..."
        />
      </div>

      {/* Admin Action Suite */}
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
              <div className="p-4 flex items-center justify-between mb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2">
                   <Zap size={14} className="text-orange-500" />
                   <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--foreground)' }}>Admin Logs</p>
                </div>
                <Badge variant="warning">{NOTIFS.length} New</Badge>
              </div>
              <div className="space-y-1">
                {NOTIFS.map((n, i) => (
                  <div key={i} className="p-3 rounded-xl transition-colors cursor-pointer flex gap-3"
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--background)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-orange-500" />
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

        {/* Admin Identity */}
        <div className="flex items-center gap-3 pl-4 ml-1" style={{ borderLeft: '1px solid var(--border)' }}>
          <div className="hidden md:block text-right">
            <p className="text-xs font-black leading-tight" style={{ color: 'var(--foreground)' }}>Super Admin</p>
            <div className="inline-flex items-center gap-1 mt-1">
               <div className="w-1 h-1 rounded-full bg-emerald-500" />
               <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Ready</p>
            </div>
          </div>
          <Avatar initials="AD" size="md" />
        </div>
      </div>
    </header>
  );
};

export default Header;