import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import Seo from "../../components/ui/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-20">
        <GraduationCap className="text-navy-300 mb-6" size={64} />
        <h1 className="text-6xl font-display font-bold text-navy-800 mb-4">404</h1>
        <p className="text-navy-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </>
  );
}
