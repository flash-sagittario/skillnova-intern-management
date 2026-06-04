// ══════════════════════════════════════════════
//  USER — pages/Reports.jsx
// ══════════════════════════════════════════════

import { useState } from "react";
import { Search, Upload, FileText, Download, TrendingUp } from "lucide-react";
import { Card, Badge, SectionHeader } from "../../shared/components/UI";
import { MOCK_REPORTS } from "../../shared/utils/constants";

const Reports = () => {
  const [search, setSearch] = useState("");

  const filtered = MOCK_REPORTS.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.intern.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      <SectionHeader
        title="Intelligence Reports"
        subtitle="Operational ledger of progress and performance certifications"
        action={
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
            style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
            <Upload size={16} strokeWidth={3} /> Upload Submission
          </button>
        }
      />

      {/* Search Console */}
      <div className="relative group max-w-xl">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 group-focus-within:scale-110 transition-transform" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filter submission history…"
          className="w-full pl-12 pr-6 py-3 rounded-xl outline-none text-sm font-bold shadow-sm transition-all focus:ring-2 focus:ring-orange-500/10"
          style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
        />
      </div>

      {/* Report Inventory */}
      <div className="space-y-4">
        {filtered.map(report => (
          <Card key={report.id} hover className="p-6 transition-all group overflow-hidden relative">
            <div className="flex items-center gap-6 relative z-10">

              <div className="p-4 rounded-2xl transition-all group-hover:scale-110 shadow-lg shadow-orange-500/5 flex-shrink-0"
                style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                <FileText size={22} className="text-orange-500" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-black tracking-tight truncate mb-1 group-hover:text-orange-500 transition-colors"
                  style={{ color: 'var(--foreground)' }}>
                  {report.title}
                </h3>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                   <span>By {report.intern}</span>
                   <span className="opacity-30">/</span>
                   <span>{report.date}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
                <Badge variant={report.status === "Reviewed" ? "success" : "warning"}>
                  {report.status.toUpperCase()}
                </Badge>
                {report.score && (
                  <div className="flex flex-col items-end">
                     <p className="text-[8px] font-black uppercase tracking-widest mb-0.5 opacity-60" style={{ color: 'var(--muted)' }}>Efficiency Score</p>
                     <span className="text-base font-black flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                        <TrendingUp size={14} className="text-emerald-500" /> {report.score}.0<span className="text-[10px] font-bold opacity-30">/10</span>
                     </span>
                  </div>
                )}
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 group-hover:bg-orange-500/5 group-hover:border-orange-500/20"
                  style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
                  <Download size={15} strokeWidth={2.5} /> Download PDF
                </button>
              </div>

            </div>
            
            {/* Hover Backdrop Decor */}
            <div className="absolute bottom-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] transition-opacity translate-x-4 translate-y-4 pointer-events-none">
                <FileText size={100} />
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-24" style={{ color: 'var(--muted)' }}>
            <FileText size={60} className="mx-auto mb-6 opacity-10" />
            <p className="text-xl font-black uppercase tracking-[0.3em] opacity-40">Zero Submission Records</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Reports;