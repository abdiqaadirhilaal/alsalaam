import { useOutletContext } from "react-router-dom";
import { Target, Eye, Heart, BookOpen } from "lucide-react";
import Seo from "../../components/ui/Seo";
import { FadeIn, SectionHeading } from "../../components/ui/Common";

const values = [
  { icon: BookOpen, title: "Excellence", desc: "Pursuing the highest standards in everything we do." },
  { icon: Heart, title: "Integrity", desc: "Building character grounded in honesty and respect." },
  { icon: Target, title: "Discipline", desc: "Instilling structure and responsibility in every student." },
  { icon: Eye, title: "Growth", desc: "Encouraging curiosity, resilience, and lifelong learning." },
];

export default function About() {
  const { settings } = useOutletContext() || {};
  return (
    <>
      <Seo title="About Us" description="Learn about Alsalaam Primary & Secondary School's history, mission, vision, and core values." />

      <section className="bg-navy-900 pt-32 pb-20">
        <div className="container-page text-center">
          <span className="section-eyebrow !text-gold-400">About Us</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Our Story</h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200"
              alt="School history"
              className="rounded-3xl shadow-xl w-full h-[380px] object-cover"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <span className="section-eyebrow">Our History</span>
            <h2 className="section-title mb-6">A Journey of Dedication to Education</h2>
            <p className="text-navy-500 leading-relaxed mb-4">
              {settings?.description ||
                "Alsalaam Primary & Secondary School was founded with a vision to provide quality education rooted in strong values, discipline, and academic excellence. Over the years, we have grown into a trusted institution serving our community."}
            </p>
            <p className="text-navy-500 leading-relaxed">
              From humble beginnings, our school has continually invested in dedicated teachers, modern learning approaches, and a nurturing environment — helping generations of students build the foundation for a successful future.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-navy-50">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="card p-8 h-full">
              <Target className="text-gold-500 mb-4" size={36} />
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">Our Mission</h3>
              <p className="text-navy-500 leading-relaxed">
                To deliver accessible, high-quality education that develops knowledgeable, disciplined, and confident students prepared for lifelong success.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="card p-8 h-full">
              <Eye className="text-gold-500 mb-4" size={36} />
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">Our Vision</h3>
              <p className="text-navy-500 leading-relaxed">
                To be a leading educational institution recognized for excellence, integrity, and the holistic development of every student.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="What We Stand For" title="Our Core Values" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="card p-7 text-center h-full">
                  <div className="h-14 w-14 rounded-2xl bg-navy-800 flex items-center justify-center mx-auto mb-5">
                    <v.icon className="text-gold-400" size={26} />
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 mb-2">{v.title}</h3>
                  <p className="text-navy-500 text-sm">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
