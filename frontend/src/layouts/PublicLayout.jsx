import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";
import { fetchSettings } from "../services/settingsService";
import { MessageCircle } from "lucide-react";

export default function PublicLayout() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />
      <main className="flex-1">
        <Outlet context={{ settings }} />
      </main>
      <Footer settings={settings} />
      {settings?.socialLinks?.whatsapp && (
        <a
          href={`https://wa.me/${settings.socialLinks.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-xl flex items-center justify-center text-white z-40 transition-transform hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={26} />
        </a>
      )}
    </div>
  );
}
