import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, PublishBadge, AdminCardGrid, FormField, inputClass } from "../../components/admin/AdminUI";
import Modal from "../../components/admin/Modal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { EmptyState } from "../../components/ui/Common";
import { fetchAchievements, createAchievement, updateAchievement, deleteAchievement } from "../../services/achievementService";

const emptyForm = { title: "", description: "", category: "Academic", date: "", published: true };

export default function AdminAchievements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const load = () => fetchAchievements().then(setItems).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setFile(null); setModalOpen(true); };
  const openEdit = (a) => {
    setEditing(a);
    setForm({ title: a.title, description: a.description || "", category: a.category, date: a.date?.slice(0, 10) || "", published: a.published });
    setFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("image", file);
      if (editing) {
        await updateAchievement(editing._id, fd);
        toast.success("Achievement updated");
      } else {
        await createAchievement(fd);
        toast.success("Achievement added");
      }
      setModalOpen(false);
      load();
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAchievement(confirmId);
      toast.success("Deleted");
      setConfirmId(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const togglePublish = async (a) => {
    const fd = new FormData();
    fd.append("published", !a.published);
    await updateAchievement(a._id, fd);
    load();
  };

  return (
    <div>
      <PageHeader title="Achievements" subtitle="Highlight academic, sports, and school awards." actionLabel="Add Achievement" onAction={openCreate} />

      {loading ? (
        <p className="text-navy-400">Loading...</p>
      ) : items.length === 0 ? (
        <EmptyState title="No achievements yet" />
      ) : (
        <AdminCardGrid>
          {items.map((a) => (
            <div key={a._id} className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
              {a.image && (
                <div className="h-36 bg-navy-100">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-navy-900">{a.title}</p>
                  <PublishBadge published={a.published} />
                </div>
                <p className="text-gold-600 text-xs mb-3">{a.category}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(a)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50">
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => togglePublish(a)} className="flex-1 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50">
                    {a.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => setConfirmId(a._id)} className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </AdminCardGrid>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Achievement" : "Add Achievement"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Title" required>
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </FormField>
          <FormField label="Description">
            <textarea rows={4} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category">
              <input className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </FormField>
            <FormField label="Date">
              <input type="date" className={inputClass} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </FormField>
          </div>
          <FormField label="Image">
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm" />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published
          </label>
          <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
            {saving ? "Saving..." : editing ? "Update Achievement" : "Add Achievement"}
          </button>
        </form>
      </Modal>

      <ConfirmDialog open={!!confirmId} message="This achievement will be permanently removed." onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />
    </div>
  );
}
