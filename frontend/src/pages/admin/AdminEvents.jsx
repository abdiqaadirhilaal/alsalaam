import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, PublishBadge, AdminCardGrid, FormField, inputClass } from "../../components/admin/AdminUI";
import Modal from "../../components/admin/Modal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { EmptyState } from "../../components/ui/Common";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../../services/eventService";

const emptyForm = { title: "", description: "", date: "", time: "", location: "", status: "upcoming", published: true };

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const load = () => fetchEvents().then(setEvents).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setFile(null); setModalOpen(true); };
  const openEdit = (e) => {
    setEditing(e);
    setForm({ title: e.title, description: e.description || "", date: e.date?.slice(0, 10) || "", time: e.time || "", location: e.location || "", status: e.status, published: e.published });
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
        await updateEvent(editing._id, fd);
        toast.success("Event updated");
      } else {
        await createEvent(fd);
        toast.success("Event created");
      }
      setModalOpen(false);
      load();
    } catch {
      toast.error("Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(confirmId);
      toast.success("Event deleted");
      setConfirmId(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const togglePublish = async (ev) => {
    const fd = new FormData();
    fd.append("published", !ev.published);
    await updateEvent(ev._id, fd);
    load();
  };

  return (
    <div>
      <PageHeader title="Events" subtitle="Manage upcoming and past school events." actionLabel="Add Event" onAction={openCreate} />

      {loading ? (
        <p className="text-navy-400">Loading...</p>
      ) : events.length === 0 ? (
        <EmptyState title="No events yet" />
      ) : (
        <AdminCardGrid>
          {events.map((ev) => (
            <div key={ev._id} className="bg-white rounded-2xl shadow-sm border border-navy-100 p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-semibold text-navy-900">{ev.title}</p>
                <PublishBadge published={ev.published} />
              </div>
              <p className="text-navy-500 text-sm mb-1">{new Date(ev.date).toLocaleDateString()} {ev.time && `· ${ev.time}`}</p>
              <p className="text-navy-400 text-xs mb-4">{ev.location}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(ev)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => togglePublish(ev)} className="flex-1 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50">
                  {ev.published ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => setConfirmId(ev._id)} className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </AdminCardGrid>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Event" : "Add Event"} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Event Title" required>
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </FormField>
          <FormField label="Description">
            <textarea rows={3} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </FormField>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="Date" required>
              <input type="date" className={inputClass} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            </FormField>
            <FormField label="Time">
              <input className={inputClass} placeholder="10:00 AM" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </FormField>
            <FormField label="Status">
              <select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </FormField>
          </div>
          <FormField label="Location">
            <input className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </FormField>
          <FormField label="Image">
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm" />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published
          </label>
          <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
            {saving ? "Saving..." : editing ? "Update Event" : "Add Event"}
          </button>
        </form>
      </Modal>

      <ConfirmDialog open={!!confirmId} message="This event will be permanently removed." onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />
    </div>
  );
}
