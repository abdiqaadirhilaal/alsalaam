import { useState } from "react";
import { CheckCircle2, Calendar, FileText, Phone, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../../components/ui/Seo";
import { FadeIn, SectionHeading } from "../../components/ui/Common";
import { submitApplication } from "../../services/admissionService";

const requirements = [
  "Completed application form",
  "Copy of student's birth certificate",
  "Previous school records (if applicable)",
  "Passport-size photographs",
  "Parent/Guardian identification",
];

const steps = [
  { title: "Submit Application", desc: "Complete and submit the online or in-person application form." },
  { title: "Document Review", desc: "Our admissions team reviews submitted documents and information." },
  { title: "Interview / Assessment", desc: "A short meeting or assessment may be scheduled with the student and family." },
  { title: "Confirmation", desc: "Successful applicants receive confirmation and enrollment details." },
];

const initialForm = { studentName: "", parentName: "", phone: "", email: "", grade: "", message: "" };

export default function Admissions() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentName || !form.parentName || !form.phone || !form.grade) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await submitApplication(form);
      setSubmitted(true);
      setForm(initialForm);
      toast.success("Application submitted successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo title="Admissions" description="Apply for admission at Alsalaam Primary & Secondary School." />

      <section className="bg-navy-900 pt-32 pb-20">
        <div className="container-page text-center">
          <span className="section-eyebrow !text-gold-400">Join Our School</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Admissions</h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-14">
          <FadeIn>
            <SectionHeading eyebrow="Requirements" title="Admission Requirements" center={false} />
            <div className="space-y-3 mb-10">
              {requirements.map((r) => (
                <div key={r} className="flex items-start gap-3">
                  <CheckCircle2 className="text-gold-500 shrink-0 mt-0.5" size={20} />
                  <p className="text-navy-600">{r}</p>
                </div>
              ))}
            </div>

            <SectionHeading eyebrow="Process" title="Application Process" center={false} />
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div key={s.title} className="flex gap-4">
                  <div className="h-9 w-9 rounded-full bg-navy-800 text-gold-400 font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{s.title}</p>
                    <p className="text-navy-500 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 card p-6 flex items-start gap-4">
              <Phone className="text-gold-500 shrink-0" size={22} />
              <div>
                <p className="font-semibold text-navy-900">Need help with your application?</p>
                <p className="text-navy-500 text-sm">Contact our admissions office — we're happy to guide you through every step.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="card p-8">
              <h3 className="font-display font-bold text-2xl text-navy-900 mb-2">Apply Now</h3>
              <p className="text-navy-500 text-sm mb-6">Fill out the form below and our admissions team will contact you.</p>

              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
                  <p className="font-semibold text-navy-900 mb-1">Application Received!</p>
                  <p className="text-navy-500 text-sm">We'll be in touch with you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary mt-6">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-navy-700 mb-1 block">Student Name *</label>
                    <input name="studentName" value={form.studentName} onChange={handleChange} className="w-full border border-navy-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy-700 mb-1 block">Parent/Guardian Name *</label>
                    <input name="parentName" value={form.parentName} onChange={handleChange} className="w-full border border-navy-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-navy-700 mb-1 block">Phone *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-navy-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-navy-700 mb-1 block">Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-navy-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy-700 mb-1 block">Grade/Class Applying For *</label>
                    <input name="grade" value={form.grade} onChange={handleChange} className="w-full border border-navy-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy-700 mb-1 block">Message</label>
                    <textarea name="message" rows={4} value={form.message} onChange={handleChange} className="w-full border border-navy-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy-500" />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
                    {submitting ? <Loader2 className="animate-spin" size={18} /> : <FileText size={18} />}
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
