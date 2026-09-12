import { BookOpen, Users, Lightbulb, Target, CheckCircle2 } from "lucide-react";
import Seo from "../../components/ui/Seo";
import { FadeIn, SectionHeading } from "../../components/ui/Common";

const primary = [
  "A nurturing, child-centered learning environment",
  "Strong foundation in literacy, numeracy, and science",
  "Development of social skills and good habits",
  "Interactive, activity-based teaching methodology",
];

const secondary = [
  "Comprehensive academic subjects across sciences and humanities",
  "Skill-focused learning approach preparing students for higher education",
  "Guidance for student preparation toward future goals",
  "Continuous educational development and mentorship",
];

export default function Academics() {
  return (
    <>
      <Seo title="Academics" description="Explore Alsalaam School's Primary and Secondary education programs." />

      <section className="bg-navy-900 pt-32 pb-20">
        <div className="container-page text-center">
          <span className="section-eyebrow !text-gold-400">Academics</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Our Academic Programs</h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Primary Level" title="Primary Education" subtitle="Building strong foundations for lifelong learning." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200"
                alt="Primary education"
                className="rounded-3xl shadow-xl w-full h-96 object-cover"
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-4">
                {primary.map((p) => (
                  <div key={p} className="flex items-start gap-3 card p-4">
                    <CheckCircle2 className="text-gold-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-navy-600">{p}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-50">
        <div className="container-page">
          <SectionHeading eyebrow="Secondary Level" title="Secondary Education" subtitle="Preparing students for higher education and future success." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200"
                alt="Secondary education"
                className="rounded-3xl shadow-xl w-full h-96 object-cover"
              />
            </FadeIn>
            <FadeIn delay={0.1} className="lg:order-1">
              <div className="space-y-4">
                {secondary.map((p) => (
                  <div key={p} className="flex items-start gap-3 card p-4">
                    <CheckCircle2 className="text-gold-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-navy-600">{p}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Our Approach" title="Teaching Methodology" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Structured Curriculum", desc: "A clear, progressive academic path for every grade level." },
              { icon: Users, title: "Student-Centered", desc: "Learning tailored to each student's pace and needs." },
              { icon: Lightbulb, title: "Critical Thinking", desc: "Encouraging curiosity, problem-solving, and creativity." },
              { icon: Target, title: "Goal-Oriented", desc: "Preparing students for academic and personal success." },
            ].map((m, i) => (
              <FadeIn key={m.title} delay={i * 0.08}>
                <div className="card p-7 h-full text-center">
                  <div className="h-14 w-14 rounded-2xl bg-navy-800 flex items-center justify-center mx-auto mb-5">
                    <m.icon className="text-gold-400" size={26} />
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 mb-2">{m.title}</h3>
                  <p className="text-navy-500 text-sm">{m.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
