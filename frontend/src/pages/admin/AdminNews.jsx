import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, PublishBadge, FormField, inputClass } from "../../components/admin/AdminUI";
import Modal from "../../components/admin/Modal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { EmptyState } from "../../components/ui/Common";
import { fetchNewsList, createNews, updateNews, deleteNews } from "../../services/newsService";

const emptyForm = { title: "", excerpt: "", content: "", category: "General", published: true, publishedAt: "" };

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const load = () => fetchNewsList({ limit: 100 }).then((r) => setNews(r.items)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setFile(null); setModalOpen(true); };
  const openEdit = (n) => {
    setEditing(n);
    setForm({ title: n.title, excerpt: n.excerpt || "", content: n.content, category: n.category, published: n.published, publishedAt: n.publishedAt?.slice(0, 10) || "" });
    setFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("coverImage", file);
      if (editing) {
        await updateNews(editing._id, fd);
        toast.success("News updated");
      } else {
        await createNews(fd);
        toast.success("News created");
      }
      setModalOpen(false);
      load();
    } catch {
      toast.error("Failed to save news");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNews(confirmId);
      toast.success("News deleted");
      setConfirmId(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const togglePublish = async (n) => {
    const fd = new FormData();
    fd.append("published", !n.published);
    await updateNews(n._id, fd);
    load();
  };

  return (
    <div>
      <PageHeader title="News" subtitle="Create and manage news articles." actionLabel="New Article" onAction={openCreate} />

      {loading ? (
        <p className="text-navy-400">Loading...</p>
      ) : news.length === 0 ? (
        <EmptyState title="No news articles yet" />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-50 text-navy-500 text-left">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map((n) => (
                <tr key={n._id} className="border-t border-navy-100">
                  <td className="p-4 font-medium text-navy-900 max-w-xs truncate">{n.title}</td>
                  <td className="p-4 text-navy-500">{n.category}</td>
                  <td className="p-4 text-navy-500">{new Date(n.publishedAt).toLocaleDateString()}</td>
                  <td className="p-4"><PublishBadge published={n.published} /></td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => togglePublish(n)} className="px-3 py-1.5 rounded-lg border border-navy-200 text-navy-500 text-xs hover:bg-navy-50">
                        {n.published ? "Unpublish" : "Publish"}
                      </button>
                      <button onClick={() => openEdit(n)} className="p-1.5 rounded-lg border border-navy-200 text-navy-500"><Pencil size={14} /></button>
                      <button onClick={() => setConfirmId(n._id)} className="p-1.5 rounded-lg border border-red-200 text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Article" : "New Article"} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Title" required>
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </FormField>
          <FormField label="Excerpt (short summary)">
            <input className={inputClass} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </FormField>
          <FormField label="Full Content" required>
            <textarea rows={7} className={inputClass} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category">
              <input className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </FormField>
            <FormField label="Publish Date">
              <input type="date" className={inputClass} value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} />
            </FormField>
          </div>
          <FormField label="Cover Image">
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm" />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published
          </label>
          <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
            {saving ? "Saving..." : editing ? "Update Article" : "Publish Article"}
          </button>
        </form>
      </Modal>

      <ConfirmDialog open={!!confirmId} message="This article will be permanently removed." onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />
    </div>
  );
}
