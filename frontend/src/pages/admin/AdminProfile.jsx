import { useState } from "react";
import toast from "react-hot-toast";
import { PageHeader, FormField, inputClass } from "../../components/admin/AdminUI";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../api/client";

export default function AdminProfile() {
  const { admin, setAdmin } = useAuth();
  const [form, setForm] = useState({ name: admin?.name || "", email: admin?.email || "", password: "" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name: form.name, email: form.email };
      if (form.password) payload.password = form.password;
      const res = await apiClient.put("/auth/profile", payload);
      setAdmin(res.data);
      setForm({ ...form, password: "" });
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Admin Profile" subtitle="Manage your account details." />
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 max-w-lg space-y-4">
        <FormField label="Full Name">
          <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </FormField>
        <FormField label="Email">
          <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </FormField>
        <FormField label="New Password (leave blank to keep current)">
          <input type="password" className={inputClass} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </FormField>
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
