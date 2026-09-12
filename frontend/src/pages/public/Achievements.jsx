import { useEffect, useState } from "react";
import { Trophy, Calendar } from "lucide-react";
import Seo from "../../components/ui/Seo";
import { FadeIn, SkeletonGrid, EmptyState, ErrorState } from "../../components/ui/Common";
import { fetchAchievements } from "../../services/achievementService";

export default function Achievements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchAchievements()
      .then(setItems)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Seo title="Achievements" description="Celebrating the academic, sports, and extracurricular achievements of Alsalaam School students." />

      <section className="bg-navy-900 pt-32 pb-20">
        <div className="container-page text-center">
          <span className="section-eyebrow !text-gold-400">Celebrating Success</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Our Achievements</h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          {loading ? (
            <SkeletonGrid count={6} />
          ) : error ? (
            <ErrorState />
          ) : items.length === 0 ? (
            <EmptyState title="Achievements coming soon" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((a, i) => (
                <FadeIn key={a._id} delay={(i % 6) * 0.07}>
                  <div className="card overflow-hidden h-full flex flex-col">
                    {a.image && (
                      <div className="h-48 overflow-hidden bg-navy-100">
                        <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className="text-gold-500" size={18} />
                        <span className="text-xs font-semibold text-gold-600 uppercase">{a.category}</span>
                      </div>
                      <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">{a.title}</h3>
                      <p className="text-navy-500 text-sm leading-relaxed mb-4 flex-1">{a.description}</p>
                      <div className="flex items-center gap-2 text-navy-400 text-xs mt-auto">
                        <Calendar size={13} />
                        {new Date(a.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                      </div>
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
