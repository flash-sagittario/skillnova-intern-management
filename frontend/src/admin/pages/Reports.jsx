// ══════════════════════════════════════════════
//  ADMIN — pages/Reports.jsx
// ══════════════════════════════════════════════

import { useState } from "react";
import { Search, FileText, Download, CheckCircle, Clock, Star, TrendingUp } from "lucide-react";
import { Card, Badge, SectionHeader } from "../../shared/components/UI";
import { MOCK_REPORTS } from "../../shared/utils/constants";

const FILTERS = ["All", "Pending", "Reviewed"];

const Reports = () => {
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("All");

  const approveReport = id =>
    setReports(rs => rs.map(r => r.id === id ? { ...r, status: "Reviewed", score: r.score ?? 7.5 } : r));

  const filtered = reports.filter(r =>
    (filter === "All" || r.status === filter) &&
    (r.title.toLowerCase().includes(search.toLowerCase()) ||
     r.intern.toLowerCase().includes(search.toLowerCase()))
  );

  const pending  = reports.filter(r => r.status === "Pending").length;
  const reviewed = reports.filter(r => r.status === "Reviewed").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      <SectionHeader
        title="Intelligence Reports"
        subtitle="Operational audit and performance validation system"
      />

      {/* Summary Chips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-orange-500">
           <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                 <FileText size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Total Submissions</p>
                 <h4 className="text-2xl font-black">{reports.length}</h4>
              </div>
           </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-amber-500">
           <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                 <Clock size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Pending Audit</p>
                 <h4 className="text-2xl font-black">{pending}</h4>
              </div>
           </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-emerald-500">
           <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <CheckCircle size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Verified Clean</p>
                 <h4 className="text-2xl font-black">{reviewed}</h4>
              </div>
           </div>
        </Card>
      </div>

      {/* Search + Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative w-full max-w-md group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 group-focus-within:scale-110 transition-transform" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Audit by title or intern identity…"
            className="w-full pl-12 pr-6 py-3 rounded-xl outline-none text-sm font-bold shadow-sm"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:scale-110 active:scale-95 hover:shadow-orange-500/20`}
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
      </div>

      {/* Report Cards */}
      <div className="space-y-4">
        {filtered.map(report => (
          <Card key={report.id} hover className="p-6 transition-all group overflow-hidden relative">
            <div className="flex items-center gap-6 relative z-10">

              {/* Icon */}
              <div className={`p-4 rounded-2xl transition-all group-hover:scale-110 shadow-lg shadow-black/5 flex-shrink-0`}
                style={{ 
                   background: 'var(--background)', 
                   border: `1px solid ${report.status === "Reviewed" ? '#10b981' : '#f59e0b'}33` 
                }}>
                <FileText
                  size={22}
                  className={report.status === "Reviewed" ? "text-emerald-500" : "text-amber-500"}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-black tracking-tight truncate mb-1 group-hover:text-orange-500 transition-colors"
                  style={{ color: 'var(--foreground)' }}>
                  {report.title}
                </h3>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                  <span>By <span style={{ color: 'var(--foreground)' }}>{report.intern}</span></span>
                  <span className="opacity-30">/</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {report.date}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
                <Badge variant={report.status === "Reviewed" ? "success" : "warning"}>
                  {report.status.toUpperCase()}
                </Badge>

                {report.score ? (
                  <div className="flex flex-col items-end px-4 border-r border-l" style={{ borderColor: 'var(--border)' }}>
                     <p className="text-[8px] font-black uppercase tracking-widest mb-0.5 opacity-60" style={{ color: 'var(--muted)' }}>Quality Index</p>
                     <span className="text-sm font-black flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                        <Star size={14} className="text-amber-500 fill-amber-500" /> {report.score}.0<span className="text-[8px] font-bold opacity-30">/10</span>
                     </span>
                  </div>
                ) : (
                  <button
                    onClick={() => approveReport(report.id)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/10 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}
                  >
                    <CheckCircle size={16} strokeWidth={3} /> Approve Submission
                  </button>
                )}

                <button className="p-2.5 rounded-xl transition-all active:scale-90 border border-transparent shadow-sm group-hover:bg-orange-500/5 group-hover:border-orange-500/20"
                  style={{ background: 'var(--background)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                  title="Download File"
                >
                  <Download size={18} strokeWidth={2.5} />
                </button>
              </div>

            </div>
            
            {/* Hover Decor */}
            <div className="absolute bottom-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] transition-opacity translate-x-4 translate-y-4 pointer-events-none">
                <FileText size={100} />
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-24" style={{ color: 'var(--muted)' }}>
            <FileText size={60} className="mx-auto mb-6 opacity-10" />
            <p className="text-xl font-black uppercase tracking-[0.3em] opacity-40">Zero Submission Matches</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Reports;