import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";
import Seo from "../../components/ui/Seo";
import { FadeIn, SectionHeading, SkeletonGrid, EmptyState, ErrorState } from "../../components/ui/Common";
import { fetchNewsList } from "../../services/newsService";
import { fetchEvents } from "../../services/eventService";

export default function News() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    Promise.all([fetchNewsList({ page, limit: 9 }), fetchEvents()])
      .then(([n, e]) => {
        setNews(n.items);
        setPages(n.pages);
        setEvents(e);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      <Seo title="News & Events" description="Latest news, announcements, and upcoming events at Alsalaam Primary & Secondary School." />

      <section className="bg-navy-900 pt-32 pb-20">
        <div className="container-page text-center">
          <span className="section-eyebrow !text-gold-400">Stay Informed</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white">News & Events</h1>
        </div>
      </section>

      {events.length > 0 && (
        <section className="section-padding !pb-10 bg-white">
          <div className="container-page">
            <SectionHeading eyebrow="Calendar" title="Events" center={false} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.slice(0, 6).map((e, i) => (
                <FadeIn key={e._id} delay={i * 0.08}>
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
          </div>
        </section>
      )}

      <section className="section-padding bg-navy-50">
        <div className="container-page">
          <SectionHeading eyebrow="Latest Stories" title="School News" center={false} />
          {loading ? (
            <SkeletonGrid count={9} />
          ) : error ? (
            <ErrorState />
          ) : news.length === 0 ? (
            <EmptyState title="No news articles yet" />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((n, i) => (
                  <FadeIn key={n._id} delay={(i % 9) * 0.05}>
                    <Link to={`/news/${n.slug}`} className="card overflow-hidden block group h-full flex flex-col">
                      <div className="h-48 overflow-hidden bg-navy-100">
                        <img
                          src={n.coverImage || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800"}
                          alt={n.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <span className="text-xs font-semibold text-gold-600 uppercase tracking-wide">{n.category}</span>
                        <h3 className="font-display font-semibold text-navy-900 mt-2 mb-2 line-clamp-2">{n.title}</h3>
                        <p className="text-navy-500 text-sm line-clamp-2 mb-3">{n.excerpt}</p>
                        <p className="text-navy-400 text-xs mt-auto">
                          {new Date(n.publishedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: pages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-10 w-10 rounded-full text-sm font-semibold ${page === i + 1 ? "bg-navy-800 text-white" : "bg-white border border-navy-200 text-navy-500"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
