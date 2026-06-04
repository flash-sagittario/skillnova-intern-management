// ══════════════════════════════════════════════
//  ADMIN — pages/AdminPanel.jsx  
// ══════════════════════════════════════════════

import { useState } from "react";
import { 
  Search, Plus, Trash2, ShieldCheck, Users, 
  XCircle, Power, User, Mail, Briefcase, 
  Shield, Check, ArrowRight, ArrowLeft, X
} from "lucide-react";
import { Card, Badge, Avatar, SectionHeader } from "../../shared/components/UI";
import { MOCK_USERS } from "../../shared/utils/constants";

const ROLE_VARIANT   = { Admin: "purple", Intern: "default" };
const STATUS_VARIANT = { Active: "success", Inactive: "warning", Terminated: "danger" };

/* ── Project Wizard Modal ──────────────────────── */
const ProjectWizard = ({ isOpen, onClose, onAdd }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", email: "", role: "Intern", dept: "AI/ML", access: "Standard"
  });

  if (!isOpen) return null;

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const handleSubmit = () => {
    onAdd({
       id: Date.now(),
       ...formData,
       avatar: formData.name[0]?.toUpperCase() || "U",
       status: "Active",
       rating: 0
    });
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-xl shadow-2xl relative overflow-hidden p-0 border-0" 
        style={{ background: 'var(--card)' }}>
        
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
           {[1, 2, 3].map(i => (
              <div key={i} className="flex-1 transition-all duration-500" 
                style={{ background: step >= i ? '#f97316' : 'var(--border)' }} />
           ))}
        </div>

        <div className="p-8">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>Initialization Wizard</h3>
                 <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: 'var(--muted)' }}>STEP {step} OF 3</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl transition-all hover:bg-red-500/10 text-slate-400 hover:text-red-500">
                 <X size={20} />
              </button>
           </div>

           {/* Step 1: Identity */}
           {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                 <div className="flex flex-col items-center mb-4">
                    <div className="w-20 h-20 rounded-3xl mb-3 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-orange-500/20"
                      style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                       {formData.name[0]?.toUpperCase() || "?"}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#f97316]">Asset Signature</p>
                 </div>
                 <div className="space-y-4">
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest block mb-2" style={{ color: 'var(--muted)' }}>Full Name</label>
                       <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />
                          <input 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full pl-12 pr-4 py-3 rounded-2xl outline-none font-bold shadow-inner"
                            style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                            placeholder="Full Name"
                          />
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest block mb-2" style={{ color: 'var(--muted)' }}>System Email</label>
                       <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />
                          <input 
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full pl-12 pr-4 py-3 rounded-2xl outline-none font-bold shadow-inner"
                            style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                            placeholder="Email Address"
                          />
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {/* Step 2: Assignment */}
           {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest block mb-4" style={{ color: 'var(--muted)' }}>Designated Department</label>
                    <div className="grid grid-cols-2 gap-3">
                       {["AI/ML", "Web Dev", "Data Science", "Backend"].map(d => (
                          <button key={d} onClick={() => setFormData({...formData, dept: d})}
                            className="p-4 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all flex items-center justify-between"
                            style={{ 
                               background: formData.dept === d ? 'rgba(249,115,22,0.1)' : 'var(--background)',
                               borderColor: formData.dept === d ? '#f97316' : 'var(--border)',
                               color: formData.dept === d ? '#f97316' : 'var(--muted)' 
                            }}>
                             {d} {formData.dept === d && <Check size={14} />}
                          </button>
                       ))}
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest block mb-4" style={{ color: 'var(--muted)' }}>System Role</label>
                    <div className="flex gap-4">
                       {["Intern", "Admin"].map(r => (
                          <button key={r} onClick={() => setFormData({...formData, role: r})}
                            className="flex-1 p-4 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all"
                            style={{ 
                               background: formData.role === r ? (r === 'Admin' ? 'rgba(139,92,246,0.1)' : 'rgba(15,23,42,0.05)') : 'var(--background)',
                               borderColor: formData.role === r ? (r === 'Admin' ? '#8b5cf6' : 'var(--foreground)') : 'var(--border)',
                               color: formData.role === r ? (r === 'Admin' ? '#8b5cf6' : 'var(--foreground)') : 'var(--muted)' 
                            }}>
                             {r}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>
           )}

           {/* Step 3: Security */}
           {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 text-center">
                 <div className="py-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-4">
                       <Shield size={32} />
                    </div>
                    <h4 className="text-lg font-black" style={{ color: 'var(--foreground)' }}>Security Validation</h4>
                    <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Finalizing data access protocols and system credentials</p>
                 </div>
                 <div className="p-6 rounded-2xl" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Auto-generate credentials</span>
                       <div className="w-10 h-6 rounded-full bg-orange-500 p-1 flex justify-end">
                          <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
                       </div>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Enforce 2FA on first login</span>
                       <div className="w-10 h-6 rounded-full bg-slate-200 p-1 flex justify-start">
                          <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {/* Footer */}
           <div className="mt-10 flex gap-3">
              {step > 1 && (
                 <button onClick={prev} className="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all border group"
                    style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
                 </button>
              )}
              {step < 3 ? (
                 <button onClick={next} className="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all group shadow-xl shadow-orange-500/10"
                    style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)', color: '#fff' }}>
                    Next Phase <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              ) : (
                 <button onClick={handleSubmit} className="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-500/10"
                    style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', color: '#fff' }}>
                    Complete Onboarding
                 </button>
              )}
           </div>
        </div>
      </Card>
    </div>
  );
};

/* ── Main Component ────────────────────────────── */
const AdminPanel = () => {
  const [users,      setUsers]     = useState(MOCK_USERS);
  const [search,     setSearch]    = useState("");
  const [wizardOpen, setWizardOpen] = useState(false);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.dept.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRole    = id => setUsers(us => us.map(u => u.id === id ? { ...u, role:   u.role   === "Admin"  ? "Intern"   : "Admin"      } : u));
  const toggleStatus  = id => setUsers(us => us.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active"     } : u));
  const terminateUser = id => setUsers(us => us.map(u => u.id === id ? { ...u, status: "Terminated" } : u));
  const deleteUser    = id => {
    if (window.confirm("Delete this user? This cannot be undone.")) {
      setUsers(us => us.filter(u => u.id !== id));
    }
  };

  const addUser = (userData) => {
    setUsers([userData, ...users]);
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-700">
      <SectionHeader
        title="Institutional Hub"
        subtitle="Global operational oversight and asset management system"
        action={
          <button 
            onClick={() => setWizardOpen(true)}
            className="px-8 py-3.5 rounded-2xl text-white text-sm font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-orange-500/20 flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
            <Plus size={20} strokeWidth={3} /> Onboard Asset
          </button>
        }
      />

      <ProjectWizard 
        isOpen={wizardOpen} 
        onClose={() => setWizardOpen(false)} 
        onAdd={addUser} 
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Onboarded",  value: users.length,                                   color: "#f97316" },
          { label: "Active",     value: users.filter(u => u.status === "Active").length, color: "#10b981" },
          { label: "Suspended",  value: users.filter(u => u.status === "Inactive").length,color: "#f59e0b" },
          { label: "Offboarded", value: users.filter(u => u.status === "Terminated").length,color:"#ef4444" },
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

      {/* Search & Filter Bar */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center shadow-2xl shadow-black/5" style={{ background: 'var(--card)' }}>
        <div className="relative flex-1 w-full group">
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500 group-focus-within:scale-110 transition-transform" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search assets by identity, credential or department..."
            className="w-full pl-14 pr-4 py-4 rounded-2xl outline-none transition-all font-bold text-sm shadow-inner"
            style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button
             className="px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-orange-500 transition-all flex items-center gap-2"
             style={{ background: 'var(--background)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              Filtering Options
           </button>
           <button
             className="px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-orange-500 transition-all flex items-center gap-2"
             style={{ background: 'var(--background)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              Export Matrix
           </button>
        </div>
      </Card>

      {/* Management Table */}
      <Card className="overflow-hidden p-0 border-0 shadow-2xl shadow-black/5" style={{ background: 'var(--card)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                {["Identity", "Access", "Sector", "Efficiency", "Status", "Command"].map(h => (
                  <th
                    key={h}
                    className={`px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-60 ${h === "Command" ? "text-center" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {filtered.map(u => (
                <tr
                  key={u.id}
                  className="transition-colors group hover:bg-slate-50 dark:hover:bg-slate-900/40"
                >
                  {/* User Identity */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                         <Avatar initials={u.avatar} size="md" />
                         <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 ${u.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} style={{ borderColor: 'var(--card)' }} />
                      </div>
                      <div>
                        <p className="font-black tracking-tight leading-tight group-hover:text-orange-500 transition-colors" style={{ color: 'var(--foreground)' }}>{u.name}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-50" style={{ color: 'var(--muted)' }}>{u.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-5">
                    <Badge variant={ROLE_VARIANT[u.role]}>{u.role}</Badge>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{u.dept}</span>
                  </td>

                  {/* Performance */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                       <div className="flex-1 h-2 w-20 rounded-full overflow-hidden" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                          <div className="h-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,16,0.6)] rounded-full transition-all duration-1000" style={{ width: `${u.rating * 10}%` }} />
                       </div>
                       <span className="text-xs font-black" style={{ color: 'var(--foreground)' }}>{u.rating}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <Badge variant={STATUS_VARIANT[u.status] || "gray"}>{u.status}</Badge>
                  </td>

                  {/* Controls */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => toggleRole(u.id)} title="Update Authorization"
                        className="p-2.5 text-violet-500 hover:bg-violet-500/10 rounded-xl transition-all active:scale-90 border border-transparent hover:border-violet-500/20">
                        <ShieldCheck size={18} strokeWidth={2.5} />
                      </button>
                      <button onClick={() => toggleStatus(u.id)} title="Toggle Visibility"
                        className="p-2.5 text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all active:scale-90 border border-transparent hover:border-emerald-500/20">
                        <Power size={18} strokeWidth={2.5} />
                      </button>
                      <button onClick={() => terminateUser(u.id)} title="Terminate Contract"
                        className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-all active:scale-90 border border-transparent hover:border-red-500/20">
                        <XCircle size={18} strokeWidth={2.5} />
                      </button>
                      <button onClick={() => deleteUser(u.id)} title="Purge Asset"
                        className="p-2.5 text-slate-500 hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-950 rounded-xl transition-all active:scale-90 border border-transparent">
                        <Trash2 size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;