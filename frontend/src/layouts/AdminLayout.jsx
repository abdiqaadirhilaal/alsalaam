import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard, Mail, Image, Video, Users, Newspaper, CalendarDays,
  Megaphone, Trophy, FileText, Settings, UserCog, LogOut, Menu, X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import schoolLogo from "../assets/school-logo.png";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
  { to: "/admin/videos", label: "Videos", icon: Video },
  { to: "/admin/teachers", label: "Teachers", icon: Users },
  { to: "/admin/news", label: "News", icon: Newspaper },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { to: "/admin/achievements", label: "Achievements", icon: Trophy },
  { to: "/admin/admissions", label: "Admissions", icon: FileText },
  { to: "/admin/settings", label: "Website Settings", icon: Settings },
  { to: "/admin/profile", label: "Admin Profile", icon: UserCog },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-navy-50 flex">
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed lg:sticky top-0 h-screen w-72 bg-navy-950 text-white/90 z-40 transition-transform duration-300 flex flex-col
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <img src={schoolLogo} alt="Alsalaam School logo" className="h-10 w-10 rounded-full object-cover ring-2 ring-gold-400" />
          <div>
            <p className="font-display font-bold text-sm text-white">Alsalaam Admin</p>
            <p className="text-xs text-white/50">Content Management</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? "bg-gold-500 text-navy-900" : "hover:bg-white/10 text-white/80"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/50 mb-2 px-2">Signed in as</p>
          <p className="text-sm font-medium px-2 mb-3 truncate">{admin?.name}</p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/10 hover:bg-red-500/80 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setOpen(true)}><Menu size={24} /></button>
          <p className="font-display font-bold text-navy-900">Admin</p>
          <div className="w-6" />
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
