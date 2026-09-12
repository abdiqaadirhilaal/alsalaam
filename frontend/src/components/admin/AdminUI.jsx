import { Plus } from "lucide-react";

export const PageHeader = ({ title, subtitle, actionLabel, onAction }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-display font-bold text-navy-900">{title}</h1>
      {subtitle && <p className="text-navy-500 text-sm mt-1">{subtitle}</p>}
    </div>
    {actionLabel && (
      <button onClick={onAction} className="btn-primary !py-2.5">
        <Plus size={18} /> {actionLabel}
      </button>
    )}
  </div>
);

export const PublishBadge = ({ published }) => (
  <span
    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
      published ? "bg-green-100 text-green-700" : "bg-navy-100 text-navy-500"
    }`}
  >
    {published ? "Published" : "Unpublished"}
  </span>
);

export const AdminCardGrid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{children}</div>
);

export const FormField = ({ label, children, required }) => (
  <div>
    <label className="text-sm font-medium text-navy-700 mb-1.5 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

export const inputClass = "w-full border border-navy-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm";
