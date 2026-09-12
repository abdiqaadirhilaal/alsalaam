import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader } from "../../components/admin/AdminUI";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { EmptyState } from "../../components/ui/Common";
import { fetchApplications, updateApplicationStatus, deleteApplication } from "../../services/admissionService";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  reviewed: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

export default function AdminAdmissions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);

  const load = () => fetchApplications({ limit: 100 }).then((r) => setItems(r.items)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, status) => {
    await updateApplicationStatus(id, status);
    toast.success("Status updated");
    load();
  };

  const handleDelete = async () => {
    try {
      await deleteApplication(confirmId);
      toast.success("Application deleted");
      setConfirmId(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <PageHeader title="Admission Applications" subtitle="Review and manage submitted applications." />

      {loading ? (
        <p className="text-navy-400">Loading...</p>
      ) : items.length === 0 ? (
        <EmptyState title="No applications yet" />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-50 text-navy-500 text-left">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Parent/Guardian</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a._id} className="border-t border-navy-100 align-top">
                  <td className="p-4 font-medium text-navy-900">{a.studentName}</td>
                  <td className="p-4 text-navy-600">{a.parentName}</td>
                  <td className="p-4 text-navy-500 text-xs">{a.phone}<br />{a.email}</td>
                  <td className="p-4 text-navy-600">{a.grade}</td>
                  <td className="p-4 text-navy-500">{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <select
                      value={a.status}
                      onChange={(e) => handleStatusChange(a._id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 ${statusStyles[a.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => setConfirmId(a._id)} className="p-1.5 rounded-lg border border-red-200 text-red-500"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog open={!!confirmId} message="This application will be permanently removed." onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />
    </div>
  );
}
