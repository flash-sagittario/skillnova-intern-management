// ══════════════════════════════════════════════
//  USER — pages/QA.jsx
// ══════════════════════════════════════════════

import { useState } from "react";
import { ThumbsUp, MessageCircle, Search, Plus, MessageSquare } from "lucide-react";
import { Card, Badge, SectionHeader } from "../../shared/components/UI";

const INITIAL_QUESTIONS = [
  { id: 1, title: "How do I submit my weekly internship report?",  category: "Reports",        votes: 14, answers: 4, author: "Rahul Sharma", time: "2h ago"  },
  { id: 2, title: "Where can I find project documentation?",        category: "Knowledge Base", votes: 9,  answers: 3, author: "Priya Patel",  time: "5h ago"  },
  { id: 3, title: "How do I schedule a meeting with my mentor?",    category: "Meetings",       votes: 6,  answers: 2, author: "Amit Verma",   time: "1d ago"  },
  { id: 4, title: "What format should my weekly report be in?",     category: "Reports",        votes: 4,  answers: 1, author: "Sneha Reddy",  time: "2d ago"  },
];

const CATEGORIES = ["All", "Projects", "Reports", "Meetings", "Knowledge Base", "Internship"];

const QA = () => {
  const [questions,         setQuestions]         = useState(INITIAL_QUESTIONS);
  const [newQuestion,       setNewQuestion]        = useState("");
  const [search,            setSearch]             = useState("");
  const [selectedCategory,  setSelectedCategory]   = useState("All");

  const handleAdd = () => {
    if (!newQuestion.trim()) return;
    setQuestions([{
      id:       Date.now(),
      title:    newQuestion,
      category: "Projects",
      votes:    0,
      answers:  0,
      author:   "You",
      time:     "Just now",
    }, ...questions]);
    setNewQuestion("");
  };

  const handleUpvote = id =>
    setQuestions(qs => qs.map(q => q.id === id ? { ...q, votes: q.votes + 1 } : q));

  const filtered = questions.filter(q =>
    (selectedCategory === "All" || q.category === selectedCategory) &&
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      <SectionHeader
        title="Intelligence Forum"
        subtitle="Peer-to-peer knowledge exchange and community support"
        action={
          <Badge variant="default">{questions.length} ACTIVE THREAD{questions.length !== 1 ? "S" : ""}</Badge>
        }
      />

      {/* Ask a Question */}
      <Card className="p-6 relative overflow-hidden" 
        style={{ background: 'var(--background)', border: '1px solid #f97316' }}>
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none text-orange-500">
           <MessageSquare size={120} />
        </div>
        
        <h3 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: '#f97316' }}>Initiate New Thread</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            placeholder="Ask anything about the platform, projects or requirements…"
            className="flex-1 px-5 py-4 text-base rounded-2xl outline-none font-medium placeholder:opacity-40 transition-all focus:ring-2 focus:ring-orange-500/20 shadow-inner shadow-black/5"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
          />
          <button
            onClick={handleAdd}
            className="px-8 py-4 rounded-2xl text-white text-sm font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3"
            style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
          >
            <Plus size={18} strokeWidth={3} /> Broadcast
          </button>
        </div>
      </Card>

      {/* Search + Filter */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative w-full max-w-md group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 group-focus-within:scale-110 transition-transform" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search discussions…"
            className="w-full pl-12 pr-6 py-3 rounded-xl outline-none text-sm font-bold shadow-sm"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:scale-110 active:scale-95 hover:shadow-orange-500/20`}
              style={{
                background: selectedCategory === c ? '#f97316' : 'var(--card)',
                color: selectedCategory === c ? '#fff' : 'var(--muted)',
                border: selectedCategory === c ? '1px solid #f97316' : '1px solid var(--border)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {filtered.map(q => (
          <Card key={q.id} hover className="p-6 group transition-all">
            <div className="flex items-start gap-6">

              {/* Vote */}
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => handleUpvote(q.id)}
                  className="p-3 rounded-2xl transition-all active:scale-75 shadow-lg shadow-black/5"
                  style={{ background: 'var(--background)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#f97316'; e.currentTarget.style.borderColor = '#f9731666'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <ThumbsUp size={18} strokeWidth={2.5} />
                </button>
                <span className="text-sm font-black" style={{ color: 'var(--foreground)' }}>{q.votes}</span>
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-black tracking-tight leading-snug mb-3 group-hover:text-orange-500 cursor-pointer transition-colors"
                  style={{ color: 'var(--foreground)' }}>
                  {q.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.1em]" style={{ color: 'var(--muted)' }}>
                  <Badge variant="gray">{q.category}</Badge>
                  <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> {q.author}</span>
                  <span className="opacity-40">{q.time}</span>
                  <span className="flex items-center gap-1.5 bg-orange-500/5 px-2 py-1 rounded-lg" style={{ color: '#f97316' }}>
                    <MessageCircle size={12} strokeWidth={3} /> {q.answers} RES{q.answers !== 1 ? "PONSES" : "PONSE"}
                  </span>
                </div>
              </div>

            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-24" style={{ color: 'var(--muted)' }}>
            <MessageSquare size={60} className="mx-auto mb-6 opacity-10" />
            <p className="text-xl font-black uppercase tracking-[0.3em] opacity-40">Zero Discussion Hits</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default QA;