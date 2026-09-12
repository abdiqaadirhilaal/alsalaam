import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import Seo from "../../components/ui/Seo";
import { ErrorState } from "../../components/ui/Common";
import { fetchNewsBySlug } from "../../services/newsService";

export default function NewsDetail() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchNewsBySlug(slug)
      .then(setNews)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="pt-40 pb-20 text-center text-navy-400">Loading article...</div>;
  }
  if (error || !news) {
    return (
      <div className="pt-40 pb-20">
        <ErrorState message="This article could not be found." />
      </div>
    );
  }

  return (
    <>
      <Seo title={news.title} description={news.excerpt} />
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="container-page max-w-3xl">
          <Link to="/news" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6">
            <ArrowLeft size={16} /> Back to News
          </Link>
          <span className="text-xs font-semibold text-gold-400 uppercase tracking-wide">{news.category}</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mt-3 mb-4">{news.title}</h1>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Calendar size={15} />
            {new Date(news.publishedAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          {news.coverImage && (
            <img src={news.coverImage} alt={news.title} className="w-full h-96 object-cover rounded-3xl shadow-lg mb-10" />
          )}
          <div className="prose prose-navy max-w-none text-navy-600 leading-relaxed whitespace-pre-line">
            {news.content}
          </div>
        </div>
      </section>
    </>
  );
}
