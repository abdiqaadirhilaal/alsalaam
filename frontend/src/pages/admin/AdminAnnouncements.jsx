import { useEffect, useState } from "react";
import { Trash2, Pencil, Megaphone } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, PublishBadge, FormField, inputClass } from "../../components/admin/AdminUI";
import Modal from "../../components/admin/Modal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { EmptyState } from "../../components/ui/Common";
import { fetchAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from "../../services/announcementService";

const emptyForm = { title: "", content: "", published: true };

export default function AdminAnnouncements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const load = () => fetchAnnouncements().then(setItems).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (a) => { setEditing(a); setForm({ title: a.title, content: a.content, published: a.published }); setModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateAnnouncement(editing._id, form);
        toast.success("Announcement updated");
      } else {
        await createAnnouncement(form);
        toast.success("Announcement created");
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
      await deleteAnnouncement(confirmId);
      toast.success("Deleted");
      setConfirmId(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const togglePublish = async (a) => {
    await updateAnnouncement(a._id, { published: !a.published });
    load();
  };

  return (
    <div>
      <PageHeader title="Announcements" subtitle="Post admission, holiday, and school notices." actionLabel="New Announcement" onAction={openCreate} />

      {loading ? (
        <p className="text-navy-400">Loading...</p>
      ) : items.length === 0 ? (
        <EmptyState title="No announcements yet" />
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <div key={a._id} className="bg-white rounded-2xl shadow-sm border border-navy-100 p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-gold-500/20 flex items-center justify-center shrink-0">
                <Megaphone className="text-gold-600" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-navy-900">{a.title}</p>
                  <PublishBadge published={a.published} />
                </div>
                <p className="text-navy-500 text-sm mt-1 line-clamp-2">{a.content}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => togglePublish(a)} className="px-3 py-1.5 rounded-lg border border-navy-200 text-navy-500 text-xs hover:bg-navy-50">
                  {a.published ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => openEdit(a)} className="p-1.5 rounded-lg border border-navy-200 text-navy-500"><Pencil size={14} /></button>
                <button onClick={() => setConfirmId(a._id)} className="p-1.5 rounded-lg border border-red-200 text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Announcement" : "New Announcement"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Title" required>
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </FormField>
          <FormField label="Content" required>
            <textarea rows={5} className={inputClass} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published (shown on website)
          </label>
          <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
            {saving ? "Saving..." : editing ? "Update" : "Publish Announcement"}
          </button>
        </form>
      </Modal>

      <ConfirmDialog open={!!confirmId} message="This announcement will be permanently removed." onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />
    </div>
  );
}
