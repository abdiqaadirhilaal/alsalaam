import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ open, title = "Are you sure?", message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <AlertTriangle className="mx-auto text-red-500 mb-4" size={36} />
        <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">{title}</h3>
        {message && <p className="text-navy-500 text-sm mb-6">{message}</p>}
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-navy-200 text-navy-600 font-medium hover:bg-navy-50">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
