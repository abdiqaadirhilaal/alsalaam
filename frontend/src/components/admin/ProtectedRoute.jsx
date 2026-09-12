import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-900">
        <Loader2 className="animate-spin text-gold-400" size={36} />
      </div>
    );
  }

  if (!admin) return <Navigate to="/admin/login" replace />;

  return children;
}
