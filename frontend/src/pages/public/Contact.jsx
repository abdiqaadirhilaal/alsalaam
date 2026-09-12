import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Phone, Mail, MapPin, Send, Loader2, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../../components/ui/Seo";
import { FadeIn } from "../../components/ui/Common";
import { submitContactMessage } from "../../services/contactService";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const { settings } = useOutletContext() || {};
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      await submitContactMessage(form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm(initialForm);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo title="Contact Us" description="Get in touch with Alsalaam Primary & Secondary School." />

      <section className="bg-navy-900 pt-32 pb-20">
        <div className="container-page text-center">
          <span className="section-eyebrow !text-gold-400">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Contact Us</h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-5 gap-10">
          <FadeIn className="lg:col-span-2 space-y-6">
            <div className="card p-6 flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
                <Phone className="text-gold-400" size={20} />
              </div>
              <div>
                <p className="font-semibold text-navy-900">Phone</p>
                <p className="text-navy-500 text-sm">{settings?.phone || "+252 XX XXX XXXX"}</p>
              </div>
            </div>
            <div className="card p-6 flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
                <Mail className="text-gold-400" size={20} />
              </div>
              <div>
                <p className="font-semibold text-navy-900">Email</p>
                <p className="text-navy-500 text-sm">{settings?.email || "info@alsalaamschool.edu"}</p>
              </div>
            </div>
            <div className="card p-6 flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
                <MapPin className="text-gold-400" size={20} />
              </div>
              <div>
                <p className="font-semibold text-navy-900">Address</p>
                <p className="text-navy-500 text-sm">{settings?.address || "Mogadishu, Somalia"}</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg h-64">
              <iframe
                title="School location"
                className="w-full h-full"
                loading="lazy"
                src="https://www.google.com/maps?q=Mogadishu,Somalia&output=embed"
              />
            </div>

            <div className="flex gap-3">
              {settings?.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer" className="h-11 w-11 rounded-full bg-navy-800 hover:bg-gold-500 hover:text-navy-900 text-white flex items-center justify-center transition-colors">
                  <Facebook size={18} />
                </a>
              )}
              {settings?.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" className="h-11 w-11 rounded-full bg-navy-800 hover:bg-gold-500 hover:text-navy-900 text-white flex items-center justify-center transition-colors">
                  <Instagram size={18} />
                </a>
              )}
              {settings?.socialLinks?.youtube && (
                <a href={settings.socialLinks.youtube} target="_blank" rel="noreferrer" className="h-11 w-11 rounded-full bg-navy-800 hover:bg-gold-500 hover:text-navy-900 text-white flex items-center justify-center transition-colors">
                  <Youtube size={18} />
                </a>
              )}
              {settings?.socialLinks?.whatsapp && (
                <a href={`https://wa.me/${settings.socialLinks.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="h-11 w-11 rounded-full bg-navy-800 hover:bg-green-500 text-white flex items-center justify-center transition-colors">
                  <MessageCircle size={18} />
                </a>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-3">
            <div className="card p-8">
              <h3 className="font-display font-bold text-2xl text-navy-900 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-navy-700 mb-1 block">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full border border-navy-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy-700 mb-1 block">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-navy-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-navy-700 mb-1 block">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-navy-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy-700 mb-1 block">Subject</label>
                    <input name="subject" value={form.subject} onChange={handleChange} className="w-full border border-navy-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Message *</label>
                  <textarea name="message" rows={6} value={form.message} onChange={handleChange} className="w-full border border-navy-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500" required />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto justify-center">
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
