import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PageHeader, FormField, inputClass } from "../../components/admin/AdminUI";
import { fetchSettings, updateSettings } from "../../services/settingsService";

export default function AdminSettings() {
  const [form, setForm] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings().then(setForm);
  }, []);

  if (!form) return <p className="text-navy-400">Loading settings...</p>;

  const update = (path, value) => {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("schoolName", form.schoolName || "");
      fd.append("description", form.description || "");
      fd.append("phone", form.phone || "");
      fd.append("email", form.email || "");
      fd.append("address", form.address || "");
      fd.append("footerContent", form.footerContent || "");
      fd.append("socialLinks", JSON.stringify(form.socialLinks || {}));
      fd.append("heroContent", JSON.stringify(form.heroContent || {}));
      fd.append("stats", JSON.stringify(form.stats || {}));
      if (logoFile) fd.append("logo", logoFile);
      if (faviconFile) fd.append("favicon", faviconFile);

      const updated = await updateSettings(fd);
      setForm(updated);
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Website Settings" subtitle="Control site-wide content and branding." />

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 space-y-4">
          <h3 className="font-semibold text-navy-900">General</h3>
          <FormField label="School Name">
            <input className={inputClass} value={form.schoolName || ""} onChange={(e) => update("schoolName", e.target.value)} />
          </FormField>
          <FormField label="Description">
            <textarea rows={3} className={inputClass} value={form.description || ""} onChange={(e) => update("description", e.target.value)} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Logo"><input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} className="text-sm" /></FormField>
            <FormField label="Favicon"><input type="file" accept="image/*" onChange={(e) => setFaviconFile(e.target.files[0])} className="text-sm" /></FormField>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 space-y-4">
          <h3 className="font-semibold text-navy-900">Contact Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone"><input className={inputClass} value={form.phone || ""} onChange={(e) => update("phone", e.target.value)} /></FormField>
            <FormField label="Email"><input className={inputClass} value={form.email || ""} onChange={(e) => update("email", e.target.value)} /></FormField>
          </div>
          <FormField label="Address"><input className={inputClass} value={form.address || ""} onChange={(e) => update("address", e.target.value)} /></FormField>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 space-y-4">
          <h3 className="font-semibold text-navy-900">Social Links</h3>
          <FormField label="Facebook"><input className={inputClass} value={form.socialLinks?.facebook || ""} onChange={(e) => update("socialLinks.facebook", e.target.value)} /></FormField>
          <FormField label="Instagram"><input className={inputClass} value={form.socialLinks?.instagram || ""} onChange={(e) => update("socialLinks.instagram", e.target.value)} /></FormField>
          <FormField label="YouTube"><input className={inputClass} value={form.socialLinks?.youtube || ""} onChange={(e) => update("socialLinks.youtube", e.target.value)} /></FormField>
          <FormField label="WhatsApp Number"><input className={inputClass} placeholder="+252XXXXXXXXX" value={form.socialLinks?.whatsapp || ""} onChange={(e) => update("socialLinks.whatsapp", e.target.value)} /></FormField>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 space-y-4">
          <h3 className="font-semibold text-navy-900">Hero Section</h3>
          <FormField label="Hero Title"><input className={inputClass} value={form.heroContent?.title || ""} onChange={(e) => update("heroContent.title", e.target.value)} /></FormField>
          <FormField label="Hero Subtitle"><textarea rows={2} className={inputClass} value={form.heroContent?.subtitle || ""} onChange={(e) => update("heroContent.subtitle", e.target.value)} /></FormField>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 space-y-4">
          <h3 className="font-semibold text-navy-900">School Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Years of Excellence"><input type="number" className={inputClass} value={form.stats?.yearsOfExcellence || 0} onChange={(e) => update("stats.yearsOfExcellence", Number(e.target.value))} /></FormField>
            <FormField label="Teachers"><input type="number" className={inputClass} value={form.stats?.teachers || 0} onChange={(e) => update("stats.teachers", Number(e.target.value))} /></FormField>
            <FormField label="Students"><input type="number" className={inputClass} value={form.stats?.students || 0} onChange={(e) => update("stats.students", Number(e.target.value))} /></FormField>
            <FormField label="Achievements"><input type="number" className={inputClass} value={form.stats?.achievements || 0} onChange={(e) => update("stats.achievements", Number(e.target.value))} /></FormField>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 space-y-4">
          <h3 className="font-semibold text-navy-900">Footer</h3>
          <FormField label="Footer Text"><input className={inputClass} value={form.footerContent || ""} onChange={(e) => update("footerContent", e.target.value)} /></FormField>
        </div>

        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
