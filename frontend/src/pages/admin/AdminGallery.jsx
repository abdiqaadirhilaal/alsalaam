import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, PublishBadge, FormField, inputClass } from "../../components/admin/AdminUI";
import Modal from "../../components/admin/Modal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { EmptyState } from "../../components/ui/Common";
import {
  fetchGallery, createGalleryItem, createGalleryBulk, updateGalleryItem, deleteGalleryItem,
} from "../../services/galleryService";

const categories = ["School Life", "Students", "Teachers", "Classrooms", "Events", "Sports", "Graduation", "Activities", "Celebrations"];
const emptyForm = { title: "", description: "", category: "School Life", date: "", published: true };

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [bulkFiles, setBulkFiles] = useState([]);
  const [bulkCategory, setBulkCategory] = useState("School Life");
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const load = () => fetchGallery({ limit: 100 }).then((r) => setItems(r.items)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setFile(null); setModalOpen(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description || "", category: item.category, date: item.date?.slice(0, 10) || "", published: item.published });
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
        await updateGalleryItem(editing._id, fd);
        toast.success("Image updated");
      } else {
        await createGalleryItem(fd);
        toast.success("Image added");
      }
      setModalOpen(false);
      load();
    } catch {
      toast.error("Failed to save image");
    } finally {
      setSaving(false);
    }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (bulkFiles.length === 0) return toast.error("Select at least one image");
    setSaving(true);
    try {
      const fd = new FormData();
      Array.from(bulkFiles).forEach((f) => fd.append("images", f));
      fd.append("category", bulkCategory);
      await createGalleryBulk(fd);
      toast.success(`${bulkFiles.length} images uploaded`);
      setBulkOpen(false);
      setBulkFiles([]);
      load();
    } catch {
      toast.error("Bulk upload failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteGalleryItem(confirmId);
      toast.success("Image deleted");
      setConfirmId(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const togglePublish = async (item) => {
    const fd = new FormData();
    fd.append("published", !item.published);
    await updateGalleryItem(item._id, fd);
    load();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Photo Gallery</h1>
          <p className="text-navy-500 text-sm mt-1">Manage images shown in the public gallery.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setBulkOpen(true)} className="btn-primary !bg-navy-600 !py-2.5">Bulk Upload</button>
          <button onClick={openCreate} className="btn-primary !py-2.5">Add Image</button>
        </div>
      </div>

      {loading ? (
        <p className="text-navy-400">Loading...</p>
      ) : items.length === 0 ? (
        <EmptyState title="No images yet" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
              <div className="h-32 bg-navy-100">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-navy-900 truncate">{item.title}</p>
                <p className="text-xs text-navy-400 mb-2">{item.category}</p>
                <div className="flex items-center justify-between">
                  <PublishBadge published={item.published} />
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg border border-navy-200 text-navy-500"><Pencil size={13} /></button>
                    <button onClick={() => setConfirmId(item._id)} className="p-1.5 rounded-lg border border-red-200 text-red-500"><Trash2 size={13} /></button>
                  </div>
                </div>
                <button onClick={() => togglePublish(item)} className="w-full mt-2 text-xs py-1.5 rounded-lg border border-navy-200 text-navy-500 hover:bg-navy-50">
                  {item.published ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Image" : "Add Image"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Title" required>
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </FormField>
          <FormField label="Description">
            <textarea rows={3} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </FormField>
          <FormField label="Category">
            <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Date">
            <input type="date" className={inputClass} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </FormField>
          <FormField label={editing ? "Replace Image" : "Image"} required={!editing}>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm" required={!editing} />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published
          </label>
          <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
            {saving ? "Saving..." : editing ? "Update Image" : "Add Image"}
          </button>
        </form>
      </Modal>

      <Modal open={bulkOpen} onClose={() => setBulkOpen(false)} title="Bulk Upload Images">
        <form onSubmit={handleBulkUpload} className="space-y-4">
          <FormField label="Category (applied to all)">
            <select className={inputClass} value={bulkCategory} onChange={(e) => setBulkCategory(e.target.value)}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Select Images" required>
            <input type="file" accept="image/*" multiple onChange={(e) => setBulkFiles(e.target.files)} className="text-sm" required />
          </FormField>
          <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
            {saving ? "Uploading..." : "Upload Images"}
          </button>
        </form>
      </Modal>

      <ConfirmDialog open={!!confirmId} message="This image will be permanently removed." onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />
    </div>
  );
}
