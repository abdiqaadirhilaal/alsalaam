import { useEffect, useState } from "react";
import Seo from "../../components/ui/Seo";
import { FadeIn, SectionHeading, SkeletonGrid, EmptyState, ErrorState } from "../../components/ui/Common";
import { fetchTeachers } from "../../services/teacherService";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTeachers()
      .then(setTeachers)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Seo title="Teachers" description="Meet the dedicated teaching staff at Alsalaam Primary & Secondary School." />

      <section className="bg-navy-900 pt-32 pb-20">
        <div className="container-page text-center">
          <span className="section-eyebrow !text-gold-400">Our Educators</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Meet Our Teachers</h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          {loading ? (
            <SkeletonGrid count={8} cols="md:grid-cols-4" />
          ) : error ? (
            <ErrorState />
          ) : teachers.length === 0 ? (
            <EmptyState title="Teacher profiles coming soon" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachers.map((t, i) => (
                <FadeIn key={t._id} delay={(i % 8) * 0.06}>
                  <div className="card overflow-hidden group h-full flex flex-col">
                    <div className="h-60 overflow-hidden bg-navy-100">
                      <img
                        src={t.photo || "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=600"}
                        alt={t.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-semibold text-navy-900">{t.name}</h3>
                      <p className="text-gold-600 text-sm font-medium mb-1">{t.position}</p>
                      {t.subject && <p className="text-navy-400 text-xs mb-2">{t.subject}</p>}
                      {t.qualification && <p className="text-navy-400 text-xs mb-3">{t.qualification}</p>}
                      {t.biography && <p className="text-navy-500 text-sm leading-relaxed line-clamp-3 mt-auto">{t.biography}</p>}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
