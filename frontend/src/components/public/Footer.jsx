import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, GraduationCap } from "lucide-react";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/teachers", label: "Teachers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="container-page section-padding !py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-11 w-11 rounded-full bg-navy-800 flex items-center justify-center">
              <GraduationCap className="text-gold-400" size={22} />
            </div>
            <p className="font-display font-bold text-white">Alsalaam School</p>
          </div>
          <p className="text-sm leading-relaxed">
            {settings?.description ||
              "Nurturing excellence, discipline and growth for every student, from primary through secondary education."}
          </p>
          <div className="flex gap-3 mt-5">
            {settings?.socialLinks?.facebook && (
              <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer" className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-900 flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
            )}
            {settings?.socialLinks?.instagram && (
              <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-900 flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
            )}
            {settings?.socialLinks?.youtube && (
              <a href={settings.socialLinks.youtube} target="_blank" rel="noreferrer" className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-900 flex items-center justify-center transition-colors">
                <Youtube size={16} />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="font-display font-semibold text-white mb-4">Quick Links</p>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-gold-400 transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display font-semibold text-white mb-4">Contact</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 text-gold-400 shrink-0" /> {settings?.phone || "+252 XX XXX XXXX"}</li>
            <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 text-gold-400 shrink-0" /> {settings?.email || "info@alsalaamschool.edu"}</li>
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-gold-400 shrink-0" /> {settings?.address || "Mogadishu, Somalia"}</li>
          </ul>
        </div>

        <div>
          <p className="font-display font-semibold text-white mb-4">Visit Us</p>
          <div className="rounded-xl overflow-hidden border border-white/10 h-32">
            <iframe
              title="School location"
              className="w-full h-full grayscale contrast-125"
              loading="lazy"
              src="https://www.google.com/maps?q=Mogadishu,Somalia&output=embed"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="text-center text-xs text-white/50">
          {settings?.footerContent || `© ${year} Alsalaam Primary & Secondary School. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
