import { useEffect, useState } from "react";
import {
  Mail, MailOpen, Image, Video, Users, Newspaper, CalendarDays, Trophy, FileText,
} from "lucide-react";
import { fetchDashboardStats } from "../../services/dashboardService";

const cards = [
  { key: "totalMessages", label: "Total Messages", icon: Mail, color: "bg-blue-500" },
  { key: "unreadMessages", label: "Unread Messages", icon: MailOpen, color: "bg-red-500" },
  { key: "totalPhotos", label: "Total Photos", icon: Image, color: "bg-purple-500" },
  { key: "totalVideos", label: "Total Videos", icon: Video, color: "bg-pink-500" },
  { key: "totalTeachers", label: "Total Teachers", icon: Users, color: "bg-emerald-500" },
  { key: "publishedNews", label: "Published News", icon: Newspaper, color: "bg-amber-500" },
  { key: "upcomingEvents", label: "Upcoming Events", icon: CalendarDays, color: "bg-cyan-500" },
  { key: "totalAchievements", label: "Achievements", icon: Trophy, color: "bg-orange-500" },
  { key: "totalApplications", label: "Applications", icon: FileText, color: "bg-indigo-500" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats().then(setStats).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-navy-900 mb-1">Dashboard Overview</h1>
      <p className="text-navy-500 text-sm mb-8">Welcome back — here's what's happening on your website.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <div key={c.key} className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl ${c.color} flex items-center justify-center text-white shrink-0`}>
              <c.icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{loading ? "…" : stats[c.key] ?? 0}</p>
              <p className="text-navy-500 text-sm">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
