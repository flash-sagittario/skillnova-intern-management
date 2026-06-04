import React, { useState } from "react";
import UserApp from "./user/App";
import AdminApp from "./admin/App";
import { Card, PrimaryButton, Avatar } from "./shared/components/UI";
import { ShieldCheck, KeyRound, Lock, Mail, Fingerprint } from "lucide-react";

const AuthGate = () => {
  const [authData, setAuthData] = useState({ role: null, step: "login" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePortalSelect = (role) => {
    setAuthData({ role, step: "credentials" });
    setError("");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Talking to your FastAPI Backend
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'username': email,
          'password': password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userRole', authData.role);
        setAuthData(prev => ({ ...prev, step: "app" }));
      } else {
        setError(data.detail || "Invalid email or password");
      }
    } catch (err) {
      setError("Cannot connect to backend server. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthData({ role: null, step: "login" });
    setEmail("");
    setPassword("");
  };

  if (authData.step === "app") {
    return authData.role === "admin" 
      ? <AdminApp onLogout={handleLogout} /> 
      : <UserApp onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-md w-full">
        {authData.step === "login" ? (
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Select your portal to continue</p>
            <div className="space-y-4">
              <button onClick={() => handlePortalSelect("admin")} className="w-full p-4 rounded-2xl border-2 border-slate-100 hover:border-orange-500 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center"><Lock size={20} /></div>
                <div><p className="font-bold">Admin Portal</p></div>
              </button>
              <button onClick={() => handlePortalSelect("intern")} className="w-full p-4 rounded-2xl border-2 border-slate-100 hover:border-emerald-500 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center"><Avatar initials="UN" size="sm" /></div>
                <div><p className="font-bold">Intern Portal</p></div>
              </button>
            </div>
          </Card>
        ) : (
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black">{authData.role === "admin" ? "Admin Login" : "Intern Login"}</h2>
              <p className="text-sm text-slate-500">Enter your database credentials</p>
            </div>
            <div className="space-y-4">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border-2 rounded-xl outline-none focus:border-blue-500" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border-2 rounded-xl outline-none focus:border-blue-500" />
              {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
              <PrimaryButton onClick={handleLogin} className="w-full py-4" disabled={loading}>
                {loading ? "Verifying..." : "Login"}
              </PrimaryButton>
              <button onClick={() => setAuthData({ role: null, step: "login" })} className="w-full text-sm text-slate-400 mt-4">Back</button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuthGate;