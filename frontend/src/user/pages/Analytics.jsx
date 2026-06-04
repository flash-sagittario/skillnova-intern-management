// ══════════════════════════════════════════════
//  USER — pages/Analytics.jsx
// ══════════════════════════════════════════════

import React from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import {
  FileText, Clock, BookOpen, MessageSquare,
  TrendingUp, Target, Rocket, Eye
} from "lucide-react";
import { Card, StatCard, SectionHeader, Badge } from "../../shared/components/UI";

/* ── Mock Data ─────────────────────────────────── */
const WEEKLY_REPORTS = [
  { week: "Wk 1", reports: 2 },
  { week: "Wk 2", reports: 4 },
  { week: "Wk 3", reports: 3 },
  { week: "Wk 4", reports: 5 },
  { week: "Wk 5", reports: 4 },
  { week: "Wk 6", reports: 6 },
  { week: "Wk 7", reports: 7 },
];

const SKILL_DIST = [
  { name: "Frontend",     value: 35 },
  { name: "Backend",      value: 25 },
  { name: "AI/ML",        value: 20 },
  { name: "Data Science", value: 20 },
];

const TOP_ARTICLES = [
  { title: "Getting Started with UptoSkills",      views: 234, category: "Onboarding" },
  { title: "How to Submit Weekly Reports",         views: 189, category: "Reports"   },
  { title: "Machine Learning Best Practices",      views: 156, category: "Technical" },
  { title: "Project Documentation Template",       views: 120, category: "Templates" },
  { title: "Meeting Scheduling Process",           views: 98,  category: "Meetings"  },
];

const TASK_PROGRESS = [
  { task: "Research",      pct: 80, color: "#f97316" },
  { task: "Coding",        pct: 65, color: "#00bea3" },
  { task: "Documentation", pct: 40, color: "#2563eb" },
  { task: "Testing",       pct: 55, color: "#7c3aed" },
];

const PIE_COLORS = ["#f97316", "#00bea3", "#2563eb", "#7c3aed"];

/* ── Custom Tooltip ────────────────────────────── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-4 py-3 rounded-2xl text-sm font-bold shadow-2xl"
      style={{ background: '#0f172a', color: '#f8fafc', border: '1px solid #334155' }}>
      <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>{label}</p>
      <p style={{ color: '#f97316' }}>{payload[0].name}: <span className="text-white">{payload[0].value}</span></p>
    </div>
  );
};

/* ── Component ─────────────────────────────────── */
const Analytics = () => (
  <div className="space-y-8 pb-10">

    <SectionHeader
      title="My Analytics"
      subtitle="Track your reports, knowledge base activity and overall internship progress"
    />

    {/* ── Stat Cards ─────────────────────────────── */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Reports Submitted" value="18"  icon={FileText}      color="#f97316" trend="+3 this week"  />
      <StatCard title="Pending Reviews"   value="4"   icon={Clock}         color="#7c3aed" trend="2 due Friday"  />
      <StatCard title="KB Views"          value="312" icon={BookOpen}      color="#00bea3" trend="↑ 24 today"    />
      <StatCard title="Q&A Posts"         value="9"   icon={MessageSquare} color="#2563eb" trend="6 answered"    />
    </div>

    {/* ── Charts Row ─────────────────────────────── */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Weekly Reports Bar Chart */}
      <Card className="lg:col-span-2 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black tracking-tight mb-1" style={{ color: 'var(--foreground)' }}>
              Weekly Reports
            </h3>
            <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
              Reports submitted per week
            </p>
          </div>
          <Badge variant="warning">7 Weeks</Badge>
        </div>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_REPORTS} barCategoryGap="35%">
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#f97316" stopOpacity={1}   />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 700, fill: 'var(--muted)' }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 700, fill: 'var(--muted)' }}
                dx={-10}
                allowDecimals={false}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(249,115,22,0.06)', radius: 8 }} />
              <Bar dataKey="reports" name="Reports" fill="url(#barGrad)" radius={[8, 8, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Skill Distribution Pie */}
      <Card className="p-8">
        <h3 className="text-xl font-black tracking-tight mb-6" style={{ color: 'var(--foreground)' }}>
          Skill Distribution
        </h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={SKILL_DIST}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {SKILL_DIST.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} cornerRadius={6} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px', border: 'none', background: '#0f172a',
                  color: '#f8fafc', boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3 mt-4">
          {SKILL_DIST.map((s, i) => (
            <div key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="text-xs font-bold" style={{ color: 'var(--muted)' }}>{s.name}</span>
              </div>
              <span className="text-xs font-black" style={{ color: 'var(--foreground)' }}>{s.value}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* ── Task Progress + Top Articles ───────────── */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      {/* Task Progress */}
      <Card className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
            <Target size={20} />
          </div>
          <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
            Task Progress
          </h3>
        </div>
        <div className="space-y-7">
          {TASK_PROGRESS.map(tp => (
            <div key={tp.task}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                  {tp.task}
                </span>
                <span className="text-sm font-black" style={{ color: 'var(--foreground)' }}>
                  {tp.pct}%
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${tp.pct}%`,
                    background: tp.color,
                    boxShadow: `0 0 12px ${tp.color}66`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Articles by Views */}
      <Card className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
            Top Articles
          </h3>
        </div>
        <div className="space-y-4">
          {TOP_ARTICLES.map((a, i) => (
            <div
              key={a.title}
              className="flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer group"
              onMouseEnter={e => e.currentTarget.style.background = 'var(--background)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Rank */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0"
                style={{
                  background: i === 0 ? '#f97316' : i === 1 ? '#00bea3' : 'var(--border)',
                  color: i < 2 ? '#fff' : 'var(--muted)'
                }}
              >
                #{i + 1}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate group-hover:text-orange-500 transition-colors"
                  style={{ color: 'var(--card-foreground)' }}>
                  {a.title}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: 'var(--muted)' }}>
                  {a.category}
                </p>
              </div>
              {/* Views */}
              <div className="flex items-center gap-1 text-xs font-bold flex-shrink-0" style={{ color: 'var(--muted)' }}>
                <Eye size={12} />
                {a.views}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* ── Milestone Banner ───────────────────────── */}
    <div
      className="relative rounded-2xl overflow-hidden p-10 text-white"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        border: '1px solid #334155'
      }}
    >
      {/* Orange accent glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f97316, transparent 70%)' }}
      />
      <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
        <Rocket size={180} />
      </div>

      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-widest mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          Next Milestone
        </div>
        <h3 className="text-3xl font-black tracking-tight mb-4 text-white">
          Almost There!
        </h3>
        <p className="text-lg font-medium text-slate-300 mb-8 leading-relaxed">
          You're only <span className="font-black text-orange-400 underline underline-offset-4">4 completed tasks</span> away
          from earning the "Platform Specialist" badge. Keep your 8.2 score going!
        </p>
        <button
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all active:scale-95 hover:shadow-xl hover:shadow-orange-500/30"
          style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
        >
          <Rocket size={18} />
          Resume Current Task
        </button>
      </div>
    </div>

  </div>
);

export default Analytics;