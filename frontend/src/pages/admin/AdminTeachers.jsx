import { useEffect, useState } from "react";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, PublishBadge, AdminCardGrid, FormField, inputClass } from "../../components/admin/AdminUI";
import Modal from "../../components/admin/Modal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { EmptyState } from "../../components/ui/Common";
import {
  fetchTeachers, createTeacher, updateTeacher, deleteTeacher,
} from "../../services/teacherService";

const emptyForm = {
  name: "", position: "", subject: "", qualification: "", biography: "", displayOrder: 0, published: true,
};

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const load = () => fetchTeachers().then(setTeachers).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setFile(null); setModalOpen(true); };
  const openEdit = (t) => {
    setEditing(t);
    setForm({ name: t.name, position: t.position, subject: t.subject || "", qualification: t.qualification || "", biography: t.biography || "", displayOrder: t.displayOrder || 0, published: t.published });
    setFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("photo", file);

      if (editing) {
        await updateTeacher(editing._id, fd);
        toast.success("Teacher updated");
      } else {
        await createTeacher(fd);
        toast.success("Teacher added");
      }
      setModalOpen(false);
      load();
    } catch {
      toast.error("Failed to save teacher");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTeacher(confirmId);
      toast.success("Teacher deleted");
      setConfirmId(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const togglePublish = async (t) => {
    const fd = new FormData();
    fd.append("published", !t.published);
    await updateTeacher(t._id, fd);
    load();
  };

  return (
    <div>
      <PageHeader title="Teachers" subtitle="Manage teacher profiles shown on the public website." actionLabel="Add Teacher" onAction={openCreate} />

      {loading ? (
        <p className="text-navy-400">Loading...</p>
      ) : teachers.length === 0 ? (
        <EmptyState title="No teachers yet" subtitle="Click 'Add Teacher' to create the first profile." />
      ) : (
        <AdminCardGrid>
          {teachers.map((t) => (
            <div key={t._id} className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
              <div className="h-40 bg-navy-100">
                <img src={t.photo || "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=400"} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-navy-900">{t.name}</p>
                  <PublishBadge published={t.published} />
                </div>
                <p className="text-gold-600 text-sm">{t.position}</p>
                <div className="flex items-center gap-2 mt-4">
                  <button onClick={() => openEdit(t)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50">
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => togglePublish(t)} className="flex-1 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50">
                    {t.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => setConfirmId(t._id)} className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </AdminCardGrid>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Teacher" : "Add Teacher"} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Full Name" required>
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Position" required>
              <input className={inputClass} value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required />
            </FormField>
            <FormField label="Subject">
              <input className={inputClass} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            </FormField>
          </div>
          <FormField label="Qualification">
            <input className={inputClass} value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
          </FormField>
          <FormField label="Biography">
            <textarea rows={4} className={inputClass} value={form.biography} onChange={(e) => setForm({ ...form, biography: e.target.value })} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Display Order">
              <input type="number" className={inputClass} value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} />
            </FormField>
            <FormField label="Photo">
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm" />
            </FormField>
          </div>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published (visible on website)
          </label>
          <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
            {saving ? "Saving..." : editing ? "Update Teacher" : "Add Teacher"}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!confirmId}
        message="This teacher profile will be permanently removed."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  );
}
