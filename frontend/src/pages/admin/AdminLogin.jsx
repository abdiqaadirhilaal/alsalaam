import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GraduationCap, Loader2, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      const dest = location.state?.from?.pathname || "/admin/dashboard";
      navigate(dest, { replace: true });
    } catch {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-full bg-navy-800 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="text-gold-400" size={32} />
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Alsalaam Admin</h1>
          <p className="text-white/50 text-sm mt-1">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-navy-700 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" size={18} />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-navy-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500"
                placeholder="admin@alsalaamschool.edu"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" size={18} />
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-navy-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
