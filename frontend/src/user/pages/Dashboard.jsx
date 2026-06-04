// ══════════════════════════════════════════════
//  USER — pages/Dashboard.jsx  (Adarsh Standard)
// ══════════════════════════════════════════════

import React from "react";
import {
  CheckCircle, ClipboardList, CalendarCheck, TrendingUp,
  MessageSquare, MessageCircle, HelpCircle, ArrowRight,
  TrendingDown, Star, Zap
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { Card, StatCard, Badge, Avatar } from "../../shared/components/UI";
import { ACTIVITY_DATA, SKILL_DATA } from "../../shared/utils/constants";

const CHART_C = ["#ff6d34", "#00bea3", "#2563EB", "#7C3AED", "#f59e0b"];

const TOP_QUESTIONS = [
  { id: 1, title: "How to setup the new ML development environment?", author: "Rahul Sharma", replies: 12, time: "2h ago" },
  { id: 2, title: "Best practices for weekly report submission?", author: "Priya Patel", replies: 8, time: "5h ago" },
  { id: 3, title: "Upcoming AI/ML workshop details?", author: "Amit Verma", replies: 5, time: "1d ago" },
];

const Dashboard = () => (
  <div className="space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

    {/* ── Welcome Section & Hero ─────────────────────────────── */}
    <div className="relative group">
       <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
       <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <Zap size={120} strokeWidth={0.5} className="text-orange-500 rotate-12" />
          </div>
          
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-black uppercase tracking-widest mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Session
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight" style={{ color: 'var(--foreground)' }}>
                Hey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">Rahul!</span> Ready to innovate?
              </h1>
              <p className="mt-4 font-medium text-lg max-w-xl" style={{ color: 'var(--muted)' }}>
                Your performance is up <span className="text-emerald-500 font-bold">15%</span> this month. Keep pushing the boundaries!
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95">
                  View Tasks
                </button>
                <button className="px-6 py-3 rounded-xl font-bold transition-all active:scale-95" style={{ background: 'var(--border)', color: 'var(--foreground)' }}>
                  Quick Report
                </button>
              </div>
            </div>

            <div className="hidden lg:flex gap-4">
              {[
                { label: "Tasks", val: "12", color: "#ff6d34" },
                { label: "Points", val: "850", color: "#00bea3" },
                { label: "Streak", val: "5d", color: "#2563EB" },
              ].map(stat => (
                <div key={stat.label} className="p-6 rounded-2xl min-w-[100px] text-center" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                  <p className="text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.val}</p>
                  <p className="text-[10px] uppercase font-black tracking-widest" style={{ color: 'var(--muted)' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
       </div>
    </div>

    {/* ── Key Metrics Grid ──────────────────────────────────── */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Tasks" value="24" icon={ClipboardList} color="#ff6d34" trend="12% vs last week" />
      <StatCard title="Completed" value="18" icon={CheckCircle} color="#00bea3" trend="92% accuracy" />
      <StatCard title="Attendance" value="98%" icon={CalendarCheck} color="#2563EB" subtitle="Active streak: 12 days" />
      <StatCard title="Skill Level" value="LV 8" icon={TrendingUp} color="#7C3AED" trend="Exp: 2,450 / 3,000" />
    </div>

    {/* ── Main Insights Row ─────────────────────────────────── */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Activity Chart */}
      <Card className="lg:col-span-2 p-8 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div>
             <h3 className="text-xl font-black tracking-tight mb-1" style={{ color: 'var(--foreground)' }}>Learning Momentum</h3>
             <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Weekly breakdown of hours invested</p>
          </div>
          <select className="border-none rounded-lg px-3 py-1.5 text-xs font-bold outline-none" style={{ background: 'var(--background)', color: 'var(--foreground)', boxShadow: '0 0 0 1px var(--border)' }}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ACTIVITY_DATA}>
              <defs>
                <linearGradient id="colorMom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6d34" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#ff6d34" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fontWeight: 600, fill: "var(--muted)" }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fontWeight: 600, fill: "var(--muted)" }} 
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  background: 'var(--card)',
                  color: 'var(--foreground)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="hours" 
                stroke="#ff6d34" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorMom)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Skills Distribution */}
      <Card className="p-8">
        <h3 className="text-xl font-black tracking-tight mb-8">Skill Blueprint</h3>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={SKILL_DATA} 
                dataKey="value" 
                nameKey="name" 
                innerRadius={60} 
                outerRadius={80} 
                paddingAngle={8}
                stroke="none"
              >
                {SKILL_DATA.map((_, i) => <Cell key={i} fill={CHART_C[i % CHART_C.length]} cornerRadius={4} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4 mt-8">
          {SKILL_DATA.map((s, i) => (
            <div key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ background: CHART_C[i % CHART_C.length] }} />
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{s.name}</span>
              </div>
              <span className="text-sm font-black">{s.value}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* ── Q&A Integration & Community Section ───────────────── */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Q&A Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
               <MessageSquare size={20} />
            </div>
            <h3 className="text-xl font-black tracking-tight">Active Q&A Forum</h3>
          </div>
          <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">
             View All
          </button>
        </div>

        <div className="space-y-4">
          {TOP_QUESTIONS.map(q => (
            <div key={q.id} className="p-4 rounded-xl hover:border-blue-500/30 transition-all cursor-pointer group"
              style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <h4 className="font-bold mb-2 group-hover:text-blue-500 transition-colors" style={{ color: 'var(--card-foreground)' }}>{q.title}</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar initials={q.author[0]} size="sm" />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{q.author}</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1 text-[10px] font-bold" style={{ color: 'var(--muted)' }}>
                      <MessageCircle size={10} /> {q.replies}
                   </div>
                   <span className="text-[10px] font-bold" style={{ color: 'var(--muted)' }}>{q.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-500 p-1 rounded-2xl">
           <div className="rounded-[14px] p-4 flex items-center gap-4" style={{ background: 'var(--card)' }}>
              <div className="flex-1">
                 <input 
                   type="text" 
                   placeholder="Have a question? Ask the community..." 
                   className="w-full bg-transparent border-none outline-none text-sm font-medium"
                   style={{ color: 'var(--foreground)' }}
                 />
              </div>
              <button className="p-2 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/20 active:scale-90 transition-all">
                 <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </Card>

      {/* Recent Achievements & Progress */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600">
               <Star size={20} />
            </div>
            <h3 className="text-xl font-black tracking-tight">Achievements</h3>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-5">
             <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Zap size={28} />
             </div>
             <div className="flex-1">
                <h4 className="font-black uppercase tracking-wider text-xs mb-1" style={{ color: 'var(--foreground)' }}>Fast Learner</h4>
                <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Completed 10 tasks in under 24 hours.</p>
                <div className="mt-2 h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                   <div className="h-full bg-orange-500 w-full" />
                </div>
             </div>
          </div>

          <div className="flex items-center gap-5 opacity-50">
             <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'var(--border)', color: 'var(--muted)' }}>
                <HelpCircle size={28} />
             </div>
             <div className="flex-1">
                <h4 className="font-black uppercase tracking-wider text-xs mb-1" style={{ color: 'var(--foreground)' }}>Community Pillar</h4>
                <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Provide 5 helpful answers in the forum.</p>
                <div className="mt-2 h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                   <div className="h-full bg-emerald-500 w-[60%]" />
                </div>
             </div>
          </div>
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-indigo-600 text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform">
              <TrendingUp size={80} />
           </div>
           <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Platform Goal</p>
           <h4 className="text-2xl font-black tracking-tight mb-4">Complete 50 Projects</h4>
           <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                 <div className="h-full bg-white w-3/4 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>
              <span className="font-black text-lg">75%</span>
           </div>
        </div>
      </Card>

    </div>
  </div>
);

export default Dashboard;