import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, PublishBadge, AdminCardGrid, FormField, inputClass } from "../../components/admin/AdminUI";
import Modal from "../../components/admin/Modal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { EmptyState } from "../../components/ui/Common";
import { fetchVideos, createVideo, updateVideo, deleteVideo } from "../../services/videoService";

const categories = ["Events", "Celebrations", "Graduation", "Student Activities", "Sports", "Competitions", "Education", "School Life", "Other"];
const emptyForm = { title: "", description: "", videoUrl: "", videoType: "youtube", category: "Events", date: "", published: true };

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const load = () => fetchVideos({ limit: 100 }).then((r) => setVideos(r.items)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setFile(null); setModalOpen(true); };
  const openEdit = (v) => {
    setEditing(v);
    setForm({ title: v.title, description: v.description || "", videoUrl: v.videoUrl, videoType: v.videoType, category: v.category, date: v.date?.slice(0, 10) || "", published: v.published });
    setFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("thumbnail", file);
      if (editing) {
        await updateVideo(editing._id, fd);
        toast.success("Video updated");
      } else {
        await createVideo(fd);
        toast.success("Video added");
      }
      setModalOpen(false);
      load();
    } catch {
      toast.error("Failed to save video");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVideo(confirmId);
      toast.success("Video deleted");
      setConfirmId(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const togglePublish = async (v) => {
    const fd = new FormData();
    fd.append("published", !v.published);
    await updateVideo(v._id, fd);
    load();
  };

  return (
    <div>
      <PageHeader title="Videos" subtitle="Manage school videos and celebrations." actionLabel="Add Video" onAction={openCreate} />

      {loading ? (
        <p className="text-navy-400">Loading...</p>
      ) : videos.length === 0 ? (
        <EmptyState title="No videos yet" />
      ) : (
        <AdminCardGrid>
          {videos.map((v) => (
            <div key={v._id} className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
              <div className="h-40 bg-navy-100">
                <img src={v.thumbnail || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400"} alt={v.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-navy-900 line-clamp-1">{v.title}</p>
                  <PublishBadge published={v.published} />
                </div>
                <p className="text-gold-600 text-xs mb-3">{v.category} · {v.videoType}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(v)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50">
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => togglePublish(v)} className="flex-1 py-2 rounded-lg border border-navy-200 text-navy-600 text-sm hover:bg-navy-50">
                    {v.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => setConfirmId(v._id)} className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </AdminCardGrid>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Video" : "Add Video"} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Title" required>
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </FormField>
          <FormField label="Description">
            <textarea rows={3} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Video Type">
              <select className={inputClass} value={form.videoType} onChange={(e) => setForm({ ...form, videoType: e.target.value })}>
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="external">External URL</option>
              </select>
            </FormField>
            <FormField label="Category">
              <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Video URL" required>
            <input className={inputClass} placeholder="https://youtube.com/watch?v=..." value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} required />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Date">
              <input type="date" className={inputClass} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </FormField>
            <FormField label="Thumbnail">
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm" />
            </FormField>
          </div>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published
          </label>
          <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
            {saving ? "Saving..." : editing ? "Update Video" : "Add Video"}
          </button>
        </form>
      </Modal>

      <ConfirmDialog open={!!confirmId} message="This video will be permanently removed." onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />
    </div>
  );
}
