// ══════════════════════════════════════════════
//  USER — pages/Meetings.jsx  (AI Assistant)
// ══════════════════════════════════════════════

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, Zap, CheckCircle, BrainCircuit, ChevronRight } from "lucide-react";
import { Card, Badge } from "../../shared/components/UI";

const SUGGESTIONS = [
  "Summarize this month's activity",
  "How do I submit a report?",
  "Generate a meeting notes template",
  "What are the internship guidelines?",
];

const CAPABILITIES = [
  "Summarize Knowledge Articles",
  "Generate Meeting Notes",
  "Suggest Related Documents",
  "Auto-Tag Content",
  "Answer Team Questions",
  "Draft Report Outlines",
];

const Meetings = () => {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello! 👋 I'm your AI Knowledge Assistant. I can help you find articles, summarize content, answer questions and more. What would you like to know?",
    },
  ]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const callClaude = async (userMessage) => {
    setLoading(true);
    // Simulate API delay for premium feel
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    return "I've analyzed the platform documentation. Based on your current progress, you should submit your Weekly Report by Friday 6:00 PM. Would you like me to draft a template for you?";
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages(m => [...m, { type: "user", text }]);
    const reply = await callClaude(text);
    setMessages(m => [...m, { type: "ai", text: reply }]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-1000" style={{ height: "calc(100vh - 12rem)" }}>

      {/* ── Chat Container ─────────────────────────── */}
      <div className="flex-1 flex flex-col rounded-3xl border shadow-2xl shadow-black/5 overflow-hidden transition-all"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>

        {/* Chat header */}
        <div className="px-8 py-6 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--background)', opacity: 0.95 }}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl shadow-lg shadow-orange-500/20"
              style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}>
              <Bot size={22} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-base font-black tracking-tight" style={{ color: 'var(--foreground)' }}>Intelligence Assistant</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)', opacity: 0.6 }}>Neural Engine Online</span>
              </div>
            </div>
          </div>
          <Badge variant="success">Claude 3.5 Sonnet</Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-end gap-3 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.type === "ai" && (
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 animate-in zoom-in duration-300 shadow-lg shadow-orange-500/10"
                  style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}>
                  <Sparkles size={18} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-6 py-4 rounded-3xl text-sm leading-relaxed font-medium shadow-sm transition-all duration-300 animate-in slide-in-from-bottom-2 ${
                  msg.type === "user"
                    ? "text-white rounded-br-none"
                    : "rounded-bl-none"
                }`}
                style={{ 
                  background: msg.type === "user" ? '#f97316' : 'var(--background)',
                  color: msg.type === "user" ? '#fff' : 'var(--foreground)',
                  border: msg.type === "ai" ? '1px solid var(--border)' : 'none'
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start items-end gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}>
                <BrainCircuit size={18} className="text-white animate-pulse" />
              </div>
              <div className="px-6 py-5 rounded-3xl rounded-bl-none shadow-sm"
                style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} className="h-4" />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t" style={{ borderColor: 'var(--border)', background: 'var(--background)' }}>
          <div className="flex gap-4 relative group">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Ask for an analysis, template or documentation search…"
              className="flex-1 px-6 py-4 text-base rounded-2xl outline-none font-medium transition-all focus:ring-2 focus:ring-orange-500/20 shadow-inner shadow-black/5"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-6 rounded-2xl text-white disabled:opacity-50 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-orange-500/20"
              style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}
            >
              <Send size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Sidebar Panels ─────────────────────────── */}
      <div className="w-full lg:w-80 flex flex-col gap-6">

        <Card className="p-6 border-t-4 border-t-orange-500">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-5 flex items-center gap-3" style={{ color: '#f97316' }}>
            <Zap size={16} fill="#f97316" /> Core Abilities
          </h3>
          <ul className="space-y-4">
            {CAPABILITIES.map(c => (
              <li key={c} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" strokeWidth={3} /> {c}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-5 flex items-center gap-3" style={{ color: 'var(--foreground)' }}>
             Suggested Queries
          </h3>
          <div className="space-y-3">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="w-full text-left text-xs p-4 rounded-xl font-bold transition-all border group relative overflow-hidden"
                style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#f9731644'; e.currentTarget.style.color = '#f97316'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
              >
                {s}
                <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Meetings;