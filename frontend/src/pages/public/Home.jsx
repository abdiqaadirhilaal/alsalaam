import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight, ShieldCheck, BookOpen, Users, Award, Heart, TrendingUp,
  GraduationCap, Calendar, MapPin, Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, SectionHeading, SkeletonGrid, EmptyState } from "../../components/ui/Common";
import Seo from "../../components/ui/Seo";
import { fetchTeachers } from "../../services/teacherService";
import { fetchNewsList } from "../../services/newsService";
import { fetchEvents } from "../../services/eventService";
import { fetchAnnouncements } from "../../services/announcementService";

const whyCards = [
  { icon: GraduationCap, title: "Qualified Teachers", desc: "Experienced, dedicated educators committed to every student's growth." },
  { icon: BookOpen, title: "Quality Education", desc: "A rigorous, well-rounded curriculum from primary through secondary." },
  { icon: ShieldCheck, title: "Safe Environment", desc: "A secure, caring campus where students can focus and thrive." },
  { icon: TrendingUp, title: "Student Development", desc: "Programs that build character, confidence, and leadership." },
  { icon: Heart, title: "Discipline & Character", desc: "Strong values instilled alongside academic excellence." },
  { icon: Award, title: "Academic Excellence", desc: "A proud track record of achievement and success." },
];

function useCountUp(target, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

function StatCard({ value, label }) {
  const count = useCountUp(value);
  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-display font-bold text-white">{count}+</p>
      <p className="text-white/70 mt-2 text-sm md:text-base">{label}</p>
    </div>
  );
}

export default function Home() {
  const { settings } = useOutletContext() || {};
  const [teachers, setTeachers] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchTeachers().catch(() => []),
      fetchNewsList({ limit: 3 }).catch(() => ({ items: [] })),
      fetchEvents({ status: "upcoming" }).catch(() => []),
      fetchAnnouncements().catch(() => []),
    ]).then(([t, n, e, a]) => {
      setTeachers(t.slice(0, 4));
      setNews(n.items || []);
      setEvents((e || []).slice(0, 3));
      setAnnouncements((a || []).slice(0, 3));
      setLoading(false);
    });
  }, []);

  const stats = settings?.stats || { yearsOfExcellence: 20, teachers: 30, students: 500, achievements: 50 };

  return (
    <>
      <Seo
        title="Home"
        description="Alsalaam Primary & Secondary School — nurturing excellence, discipline and growth for every student."
      />

      {announcements.length > 0 && (
        <div className="bg-gold-500 text-navy-900 text-sm font-medium py-2 overflow-hidden">
          <div className="container-page flex items-center gap-2">
            <span className="font-bold shrink-0">Announcement:</span>
            <span className="truncate">{announcements[0].title}</span>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-navy-900">
        <div className="absolute inset-0">
          <img
            src={settings?.heroContent?.backgroundImage || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000"}
            alt="Alsalaam School campus"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/70 to-navy-950" />
        </div>

        <div className="container-page relative z-10 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="section-eyebrow !text-gold-400">Welcome to</span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-tight mb-6">
              {settings?.heroContent?.title || "Alsalaam Primary & Secondary School"}
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-10 leading-relaxed max-w-2xl">
              {settings?.heroContent?.subtitle ||
                "Shaping confident, disciplined, and knowledgeable learners — building the leaders of tomorrow through excellence in education today."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="btn-secondary">Learn More <ArrowRight size={18} /></Link>
              <Link to="/admissions" className="btn-primary">Admissions</Link>
              <Link to="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-navy-800 py-14">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value={stats.yearsOfExcellence} label="Years of Excellence" />
          <StatCard value={stats.teachers} label="Qualified Teachers" />
          <StatCard value={stats.students} label="Happy Students" />
          <StatCard value={stats.achievements} label="Achievements" />
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200"
                alt="Students learning"
                className="rounded-3xl shadow-2xl w-full h-[420px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 hidden md:block border border-navy-100">
                <p className="text-3xl font-display font-bold text-navy-800">{stats.yearsOfExcellence}+</p>
                <p className="text-sm text-navy-500">Years of Trust</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <span className="section-eyebrow">About Alsalaam</span>
            <h2 className="section-title mb-6">A Legacy of Learning, A Future of Excellence</h2>
            <p className="text-navy-500 leading-relaxed mb-4">
              {settings?.description ||
                "Alsalaam Primary & Secondary School has been a trusted center of learning, committed to nurturing well-rounded students grounded in knowledge, discipline, and character."}
            </p>
            <p className="text-navy-500 leading-relaxed mb-8">
              Our mission is to provide accessible, high-quality education that prepares students for lifelong success, while our vision is to be a leading institution recognized for academic excellence and strong values.
            </p>
            <Link to="/about" className="btn-primary">Learn More About Us <ArrowRight size={18} /></Link>
          </FadeIn>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section-padding bg-navy-50">
        <div className="container-page">
          <SectionHeading eyebrow="Why Choose Us" title="Why Choose Alsalaam School" subtitle="We provide an environment where every student can grow academically, socially, and personally." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCards.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.07}>
                <div className="card p-7 h-full">
                  <div className="h-14 w-14 rounded-2xl bg-navy-800 flex items-center justify-center mb-5">
                    <c.icon className="text-gold-400" size={26} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">{c.title}</h3>
                  <p className="text-navy-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS PREVIEW */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Our Educators" title="Meet Our Teachers" subtitle="Dedicated professionals guiding every student toward success." />
          {loading ? (
            <SkeletonGrid count={4} cols="md:grid-cols-4" />
          ) : teachers.length === 0 ? (
            <EmptyState title="Teacher profiles coming soon" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachers.map((t, i) => (
                <FadeIn key={t._id} delay={i * 0.08}>
                  <div className="card overflow-hidden group">
                    <div className="h-56 overflow-hidden bg-navy-100">
                      <img
                        src={t.photo || "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=600"}
                        alt={t.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-semibold text-navy-900">{t.name}</h3>
                      <p className="text-gold-600 text-sm font-medium">{t.position}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/teachers" className="btn-primary">View All Teachers <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="section-padding bg-navy-50">
        <div className="container-page">
          <SectionHeading eyebrow="What's Happening" title="Upcoming Events" subtitle="Stay connected with school activities and important dates." />
          {events.length === 0 ? (
            <EmptyState title="No upcoming events" subtitle="Check back soon for new events." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((e, i) => (
                <FadeIn key={e._id} delay={i * 0.1}>
                  <div className="card p-6">
                    <div className="flex items-center gap-2 text-gold-600 text-sm font-semibold mb-3">
                      <Calendar size={16} />
                      {new Date(e.date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">{e.title}</h3>
                    <p className="text-navy-500 text-sm mb-4 line-clamp-2">{e.description}</p>
                    <div className="flex flex-col gap-1 text-xs text-navy-400">
                      {e.time && <span className="flex items-center gap-1"><Clock size={13} /> {e.time}</span>}
                      {e.location && <span className="flex items-center gap-1"><MapPin size={13} /> {e.location}</span>}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEWS PREVIEW */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Stay Informed" title="Latest News" subtitle="The latest stories and updates from Alsalaam School." />
          {news.length === 0 ? (
            <EmptyState title="No news yet" subtitle="Our latest stories will appear here soon." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((n, i) => (
                <FadeIn key={n._id} delay={i * 0.1}>
                  <Link to={`/news/${n.slug}`} className="card overflow-hidden block group">
                    <div className="h-48 overflow-hidden bg-navy-100">
                      <img
                        src={n.coverImage || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800"}
                        alt={n.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold text-gold-600 uppercase tracking-wide">{n.category}</span>
                      <h3 className="font-display font-semibold text-navy-900 mt-2 mb-1 line-clamp-2">{n.title}</h3>
                      <p className="text-navy-400 text-xs">
                        {new Date(n.publishedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/news" className="btn-primary">View All News <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 relative overflow-hidden">
        <div className="container-page py-20 text-center relative z-10">
          <Users className="mx-auto text-gold-400 mb-6" size={44} />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to Join Our School Family?</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">
            Give your child the foundation for lifelong success. Applications are open now.
          </p>
          <Link to="/admissions" className="btn-secondary">Apply Now <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
