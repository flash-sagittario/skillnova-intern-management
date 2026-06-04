// ══════════════════════════════════════════════
//  ADMIN — pages/Analytics.jsx
// ══════════════════════════════════════════════

import React from "react";
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  CartesianGrid, LineChart, Line
} from "recharts";
import { 
  TrendingUp, Users, FileText, Zap, 
  Target, Award, Activity, PieChart as PieIcon 
} from "lucide-react";
import { Card, StatCard, SectionHeader, Badge, Avatar } from "../../shared/components/UI";
import { ACTIVITY_DATA, MOCK_INTERNS } from "../../shared/utils/constants";

const COLORS_D = ["#f97316", "#00bea3", "#3b82f6", "#8b5cf6", "#f59e0b"];

const INTERN_PERF = MOCK_INTERNS.map(i => ({
  name:  i.name.split(" ")[0],
  score: i.rating,
  tasks: [12, 15, 9, 13][i.id - 1] ?? 10,
  attendance: [95, 88, 72, 91][i.id - 1] ?? 85,
}));

const DEPT_DATA = [
  { name: "AI/ML",        value: 35, color: "#f97316" },
  { name: "Web Dev",      value: 25, color: "#00bea3" },
  { name: "Data Science", value: 20, color: "#3b82f6" },
  { name: "Backend",      value: 20, color: "#8b5cf6" },
];

const ANALYTICS_CARDS = [
  { title: "Net Performance", value: "8.4", icon: Target, color: "#f97316", trend: "↑ 0.8" },
  { title: "Active Interns", value: "42", icon: Users, color: "#00bea3", trend: "+5 new" },
  { title: "Task Velocity", value: "128", icon: Zap, color: "#3b82f6", trend: "Fast" },
  { title: "Reports Filed", value: "312", icon: FileText, color: "#8b5cf6", trend: "100%" },
];

const Analytics = () => (
  <div className="space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

    <SectionHeader
      title="Intelligence Command"
      subtitle="Unified visualization of institutional performance and asset utilization"
    />

    {/* Primary Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {ANALYTICS_CARDS.map(c => (
         <StatCard key={c.title} {...c} />
      ))}
    </div>

    {/* Row 1: Core Performance & Distribution */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Performance Bar Chart */}
      <Card className="lg:col-span-2 p-8 overflow-hidden">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-xl font-black tracking-tight mb-1" style={{ color: 'var(--foreground)' }}>Performance Matrix</h3>
            <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Benchmark comparison of active contributors</p>
          </div>
          <Badge variant="purple">LIVE TELEMETRY</Badge>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={INTERN_PERF} barSize={32} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: "var(--muted)" }} 
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: "var(--muted)" }} 
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(249,115,22,0.03)' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', background: '#0f172a', color: '#fff' }}
              />
              <Bar dataKey="score" name="Rating" fill="#f97316" radius={[4, 4, 0, 0]} />
              <Bar dataKey="attendance" name="Attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-8 flex justify-center gap-8 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: '#f97316' }} />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Skill Rating</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: '#3b82f6' }} />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Attendance %</span>
           </div>
        </div>
      </Card>

      {/* Dept Pie Chart */}
      <Card className="p-8 flex flex-col justify-between overflow-hidden relative">
        <div>
          <h3 className="text-xl font-black tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>Resource Deployment</h3>
          <p className="text-sm font-medium mb-8" style={{ color: 'var(--muted)' }}>Asset distribution by department</p>
        </div>
        
        <div className="h-[260px] relative mt-4">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
             <span className="text-4xl font-black" style={{ color: 'var(--foreground)' }}>100%</span>
             <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Operational</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={DEPT_DATA} innerRadius={85} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                {DEPT_DATA.map((entry, index) => <Cell key={index} fill={entry.color} cornerRadius={4} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4 mt-8 pb-2">
          {DEPT_DATA.map(d => (
            <div key={d.name} className="flex items-center justify-between group cursor-default">
              <div className="flex items-center gap-3">
                 <div className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125" style={{ background: d.color }} />
                 <span className="text-xs font-black uppercase tracking-tight" style={{ color: 'var(--muted)' }}>{d.name}</span>
              </div>
              <span className="text-xs font-black" style={{ color: 'var(--foreground)' }}>{d.value}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* Row 2: Recent Activity & Top Performers */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       
       <Card className="p-8">
          <SectionHeader title="High-Efficiency Assets" subtitle="Consistent elite performance tracking" />
          <div className="space-y-4 mt-6">
             {MOCK_INTERNS.map((u, i) => (
                <div key={u.id} className="flex items-center gap-5 p-4 rounded-2xl transition-all hover:translate-x-2" 
                  style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                   <Avatar initials={u.name[0]} size="md" />
                   <div className="flex-1 min-w-0">
                      <p className="font-black tracking-tight truncate leading-tight" style={{ color: 'var(--foreground)' }}>{u.name}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-50" style={{ color: 'var(--muted)' }}>{u.department}</p>
                   </div>
                   <div className="text-right">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-black text-xs transition-all shadow-lg shadow-orange-500/10"
                        style={{ background: '#f9731615', color: '#f97316' }}>
                         <Award size={14} strokeWidth={3} /> {u.rating}
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </Card>

       <Card className="p-10 text-white relative overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid #334155' }}>
          <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none text-orange-500">
             <Activity size={300} strokeWidth={1} />
          </div>
          
          <div className="relative z-10">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                Real-time Pulse
             </div>
             <h3 className="text-2xl font-black tracking-tight mb-2">Institutional Velocity</h3>
             <p className="text-sm font-medium text-slate-400">Interaction heatmap across the platform ecosystem</p>
          </div>
          
          <div className="h-[260px] w-full mt-8 relative z-10">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ACTIVITY_DATA}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                   <XAxis 
                     dataKey="day" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fontSize: 9, fontVariant: 'small-caps', fontWeight: 900, fill: "rgba(255,255,255,0.3)" }} 
                     dy={15}
                   />
                   <Tooltip 
                     contentStyle={{ borderRadius: '16px', border: 'none', background: '#ffffff', color: '#000000', fontWeight: '900' }}
                   />
                   <Line 
                     type="monotone" 
                     dataKey="tasks" 
                     name="Activity"
                     stroke="#f97316" 
                     strokeWidth={4} 
                     dot={{ fill: '#f97316', strokeWidth: 3, r: 6, stroke: '#0f172a' }} 
                     activeDot={{ r: 8, strokeWidth: 0, fill: '#fff' }}
                   />
                </LineChart>
             </ResponsiveContainer>
          </div>
          
          <div className="mt-10 flex items-center gap-4 relative z-10">
             <div className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Critical Peak</p>
                <p className="text-xl font-black">Friday 21:00</p>
             </div>
             <div className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Engagement</p>
                <p className="text-xl font-black text-emerald-400">OPTIMAL</p>
             </div>
          </div>
       </Card>

    </div>
  </div>
);

export default Analytics;