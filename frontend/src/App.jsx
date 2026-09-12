import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Academics from "./pages/public/Academics";
import Teachers from "./pages/public/Teachers";
import Gallery from "./pages/public/Gallery";
import News from "./pages/public/News";
import NewsDetail from "./pages/public/NewsDetail";
import Achievements from "./pages/public/Achievements";
import Admissions from "./pages/public/Admissions";
import Contact from "./pages/public/Contact";
import NotFound from "./pages/public/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminVideos from "./pages/admin/AdminVideos";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminNews from "./pages/admin/AdminNews";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminAchievements from "./pages/admin/AdminAchievements";
import AdminAdmissions from "./pages/admin/AdminAdmissions";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminProfile from "./pages/admin/AdminProfile";

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/videos" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin dashboard (protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="videos" element={<AdminVideos />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="achievements" element={<AdminAchievements />} />
          <Route path="admissions" element={<AdminAdmissions />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
