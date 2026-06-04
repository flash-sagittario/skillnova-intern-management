// ══════════════════════════════════════════════
//  USER — pages/Settings.jsx
// ══════════════════════════════════════════════

import React, { useState } from "react";
import { Card, Toggle, SectionHeader } from "../../shared/components/UI";
import { useTheme } from "../../shared/utils/ThemeContext";
import { User, Shield, Bell, Globe, Trash2, Power } from "lucide-react";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [twoFactor, setTwoFactor] = useState(false);

  const SECTIONS = [
    {
      title: "Account Security",
      icon: <Shield size={18} className="text-blue-500" />,
      rows: [
        {
          label: "Two-Step Verification (2FA)",
          sub: "Add an extra layer of security to your account",
          ctrl: <Toggle checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
        },
      ],
    },
    {
      title: "Appearance",
      icon: <User size={18} className="text-orange-500" />,
      rows: [
        { label: "Dark Mode", sub: "Switch between light and dark themes", ctrl: <Toggle checked={theme === "dark"} onChange={toggleTheme} /> },
      ],
    },
    {
      title: "Notifications",
      icon: <Bell size={18} className="text-emerald-500" />,
      rows: [
        { label: "Push Notifications", sub: "Get real-time updates on tasks", ctrl: <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} /> },
      ],
    },
    {
      title: "Language & Region",
      icon: <Globe size={18} className="text-purple-500" />,
      rows: [
        {
          label: "Display Language",
          sub: "Choose your preferred interface language",
          ctrl: (
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg focus:outline-none cursor-pointer transition-all"
              style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
            >
              {["English", "Hindi", "Spanish", "German"].map(l => <option key={l}>{l}</option>)}
            </select>
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <SectionHeader title="Settings" subtitle="Manage your account preferences and security" />

      <div className="grid gap-6">
        {SECTIONS.map(section => (
          <Card key={section.title} className="p-6">
            <div className="flex items-center gap-3 mb-6">
              {section.icon}
              <h3 className="text-base font-black tracking-tight uppercase" style={{ color: 'var(--foreground)' }}>{section.title}</h3>
            </div>
            <div className="space-y-6">
              {section.rows.map(row => (
                <div key={row.label} className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-bold" style={{ color: 'var(--card-foreground)' }}>{row.label}</p>
                    <p className="text-xs mt-1 font-medium" style={{ color: 'var(--muted)' }}>{row.sub}</p>
                  </div>
                  {row.ctrl}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* Account Status Section */}
        <Card className="p-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
             <Trash2 size={80} />
          </div>

          <div className="flex items-center gap-3 mb-6 text-red-500">
            <Power size={18} />
            <h3 className="text-base font-black tracking-tight uppercase">Account Status</h3>
          </div>

          <p className="text-xs font-semibold mb-6 max-w-md" style={{ color: 'var(--muted)' }}>
            Manage your account visibility and data. Actions performed here may be permanent.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
              style={{ background: 'var(--border)', color: 'var(--foreground)' }}
            >
              Deactivate Account
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-95">
              <Trash2 size={16} /> Delete Account
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;