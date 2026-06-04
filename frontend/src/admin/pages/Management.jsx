// ══════════════════════════════════════════════
//  ADMIN — pages/Management.jsx  (Intern Management)
// ══════════════════════════════════════════════

import { useState } from "react";
import { Search, CheckCircle, XCircle, ClipboardList, Users, UserPlus, Star } from "lucide-react";
import { Card, Badge, SectionHeader } from "../../shared/components/UI";
import { MOCK_INTERNS } from "../../shared/utils/constants";

const Management = () => {
  const [interns, setInterns] = useState(MOCK_INTERNS);
  const [search,  setSearch]  = useState("");

  const toggleAttendance = id =>
    setInterns(is => is.map(i => i.id === id
      ? { ...i, attendance: i.attendance === "Present" ? "Absent" : "Present" }
      : i
    ));

  const toggleStatus = id =>
    setInterns(is => is.map(i => i.id === id
      ? { ...i, status: i.status === "Active" ? "Inactive" : "Active" }
      : i
    ));

  const filtered = interns.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">

      <SectionHeader
        title="Asset Registry"
        subtitle="Operational oversight of human capital and task allocation"
        action={
           <button className="px-6 py-3 rounded-2xl text-white text-sm font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-orange-500/20 flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
              <UserPlus size={18} strokeWidth={3} /> Register Asset
           </button>
        }
      />

      {/* High-Fidelity Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Deployments",   value: interns.length,                                            color: "#3b82f6" },
          { label: "Active Pulse",  value: interns.filter(i => i.attendance === "Present").length,    color: "#10b981" },
          { label: "Offline Status", value: interns.filter(i => i.attendance === "Absent").length,     color: "#ef4444" },
          { label: "Sync Ready",    value: interns.filter(i => i.status === "Active").length,         color: "#8b5cf6" },
        ].map(s => (
          <Card key={s.label} className="p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform pointer-events-none">
               <Users size={60} />
            </div>
            <p className="text-3xl font-black tracking-tighter" style={{ color: 'var(--foreground)' }}>{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 flex items-center gap-2" style={{ color: 'var(--muted)' }}>
               <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} /> {s.label}
            </p>
          </Card>
        ))}
      </div>

      {/* Intelligence Filter */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center shadow-2xl shadow-black/5" style={{ background: 'var(--card)' }}>
        <div className="relative flex-1 w-full group">
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500 group-focus-within:scale-110 transition-transform" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Scan asset database by identity or sector..."
            className="w-full pl-14 pr-4 py-4 rounded-2xl outline-none transition-all font-bold text-sm shadow-inner"
            style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
          />
        </div>
      </Card>

      {/* Asset Matrix Table */}
      <Card className="overflow-hidden p-0 border-0 shadow-2xl shadow-black/5" style={{ background: 'var(--card)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                {["Identity", "Sector", "Telemetry", "Current Protocol", "Efficiency", "Status", "Authorization"].map(h => (
                  <th
                    key={h}
                    className={`px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-60 ${h === "Authorization" ? "text-center" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {filtered.map(intern => (
                <tr key={intern.id} className="transition-colors group hover:bg-slate-50 dark:hover:bg-slate-900/40">

                  {/* Identity */}
                  <td className="px-6 py-5 font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
                    {intern.name}
                  </td>

                  {/* Sector */}
                  <td className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: 'var(--muted)' }}>
                    {intern.department}
                  </td>

                  {/* Telemetry (Attendance) */}
                  <td className="px-6 py-5">
                    <Badge variant={intern.attendance === "Present" ? "success" : "danger"}>
                      {intern.attendance.toUpperCase()}
                    </Badge>
                  </td>

                  {/* Current Protocol (Task) */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold truncate max-w-[150px]" style={{ color: 'var(--foreground)' }}>
                      <ClipboardList size={14} className="text-orange-500 flex-shrink-0" />
                      {intern.task}
                    </div>
                  </td>

                  {/* Efficiency (Rating) */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <Star size={12} className="text-orange-500" fill="#f97316" />
                       <span className="text-xs font-black" style={{ color: 'var(--foreground)' }}>{intern.rating}</span>
                       <span className="text-[10px] font-bold opacity-30" style={{ color: 'var(--muted)' }}>/ 10</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <Badge variant={intern.status === "Active" ? "purple" : "gray"}>
                      {intern.status.toUpperCase()}
                    </Badge>
                  </td>

                  {/* Authorization (Actions) */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => toggleAttendance(intern.id)}
                        className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all active:scale-90 border border-transparent hover:border-emerald-500/20"
                      >
                        <CheckCircle size={18} strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={() => toggleStatus(intern.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all active:scale-90 border border-transparent hover:border-red-500/20"
                      >
                        <XCircle size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center font-bold italic tracking-wide" style={{ color: 'var(--muted)' }}>
                    No assets detected in current telemetry.
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

export default Management;