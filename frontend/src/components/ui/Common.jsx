import { motion } from "framer-motion";
import { Inbox, AlertTriangle } from "lucide-react";

export const SectionHeading = ({ eyebrow, title, subtitle, center = true }) => (
  <div className={`mb-12 ${center ? "text-center max-w-2xl mx-auto" : ""}`}>
    {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
    <h2 className="section-title">{title}</h2>
    {subtitle && <p className="text-navy-500 mt-4 leading-relaxed">{subtitle}</p>}
  </div>
);

export const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const CardSkeleton = () => (
  <div className="card p-4 animate-pulse">
    <div className="bg-navy-100 h-44 rounded-xl mb-4" />
    <div className="h-4 bg-navy-100 rounded w-3/4 mb-2" />
    <div className="h-3 bg-navy-100 rounded w-1/2" />
  </div>
);

export const SkeletonGrid = ({ count = 6, cols = "md:grid-cols-3" }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-6`}>
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const EmptyState = ({ title = "Nothing here yet", subtitle = "Please check back soon." }) => (
  <div className="text-center py-16 text-navy-400">
    <Inbox className="mx-auto mb-4" size={40} />
    <p className="font-semibold text-navy-600">{title}</p>
    <p className="text-sm mt-1">{subtitle}</p>
  </div>
);

export const ErrorState = ({ message = "Something went wrong. Please try again." }) => (
  <div className="text-center py-16 text-red-400">
    <AlertTriangle className="mx-auto mb-4" size={40} />
    <p className="font-semibold text-red-500">{message}</p>
  </div>
);
