import { useEffect, useState } from "react";
import { Camera, Video as VideoIcon, X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Seo from "../../components/ui/Seo";
import { FadeIn, SkeletonGrid, EmptyState, ErrorState } from "../../components/ui/Common";
import { fetchGallery } from "../../services/galleryService";
import { fetchVideos } from "../../services/videoService";

const photoCategories = ["all", "School Life", "Students", "Teachers", "Classrooms", "Events", "Sports", "Graduation", "Activities", "Celebrations"];
const videoCategories = ["all", "Events", "Celebrations", "Graduation", "Student Activities", "Sports", "Competitions", "Education", "School Life", "Other"];

function getEmbedUrl(video) {
  if (video.videoType === "youtube") {
    const idMatch = video.videoUrl.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
    const id = idMatch ? idMatch[1] : video.videoUrl;
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (video.videoType === "vimeo") {
    const idMatch = video.videoUrl.match(/vimeo\.com\/(\d+)/);
    const id = idMatch ? idMatch[1] : video.videoUrl;
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  return video.videoUrl;
}

export default function Gallery() {
  const [tab, setTab] = useState("photos");
  const [photoCategory, setPhotoCategory] = useState("all");
  const [videoCategory, setVideoCategory] = useState("all");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (tab === "photos") {
      fetchGallery({ category: photoCategory, limit: 60 })
        .then((res) => setPhotos(res.items))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    } else {
      fetchVideos({ category: videoCategory, limit: 60 })
        .then((res) => setVideos(res.items))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [tab, photoCategory, videoCategory]);

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => setLightboxIndex((i) => (i > 0 ? i - 1 : photos.length - 1));
  const showNext = () => setLightboxIndex((i) => (i < photos.length - 1 ? i + 1 : 0));

  return (
    <>
      <Seo title="School Gallery" description="Browse photos and videos from Alsalaam Primary & Secondary School." />

      <section className="bg-navy-900 pt-32 pb-16">
        <div className="container-page text-center">
          <span className="section-eyebrow !text-gold-400">Media</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">School Gallery</h1>
          <div className="inline-flex bg-white/10 rounded-full p-1.5">
            <button
              onClick={() => setTab("photos")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors ${tab === "photos" ? "bg-white text-navy-900" : "text-white/80"}`}
            >
              <Camera size={16} /> Photos
            </button>
            <button
              onClick={() => setTab("videos")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors ${tab === "videos" ? "bg-white text-navy-900" : "text-white/80"}`}
            >
              <VideoIcon size={16} /> Videos
            </button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {(tab === "photos" ? photoCategories : videoCategories).map((c) => (
              <button
                key={c}
                onClick={() => (tab === "photos" ? setPhotoCategory(c) : setVideoCategory(c))}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  (tab === "photos" ? photoCategory : videoCategory) === c
                    ? "bg-navy-800 text-white border-navy-800"
                    : "border-navy-200 text-navy-500 hover:border-navy-400"
                }`}
              >
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>

          {loading ? (
            <SkeletonGrid count={8} cols="md:grid-cols-4" />
          ) : error ? (
            <ErrorState />
          ) : tab === "photos" ? (
            photos.length === 0 ? (
              <EmptyState title="No photos in this category yet" />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((p, i) => (
                  <FadeIn key={p._id} delay={(i % 8) * 0.05}>
                    <button
                      onClick={() => setLightboxIndex(i)}
                      className="block w-full aspect-square rounded-2xl overflow-hidden group relative"
                    >
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/40 transition-colors flex items-end p-3 opacity-0 group-hover:opacity-100">
                        <p className="text-white text-xs font-medium truncate">{p.title}</p>
                      </div>
                    </button>
                  </FadeIn>
                ))}
              </div>
            )
          ) : videos.length === 0 ? (
            <EmptyState title="No videos in this category yet" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v, i) => (
                <FadeIn key={v._id} delay={(i % 6) * 0.07}>
                  <button onClick={() => setActiveVideo(v)} className="card overflow-hidden text-left w-full group">
                    <div className="relative h-48 bg-navy-100 overflow-hidden">
                      <img
                        src={v.thumbnail || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800"}
                        alt={v.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-navy-950/30 flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="text-navy-900 ml-1" size={22} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold text-gold-600 uppercase">{v.category}</span>
                      <h3 className="font-display font-semibold text-navy-900 mt-1 line-clamp-2">{v.title}</h3>
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 text-white" onClick={closeLightbox}><X size={32} /></button>
          <button className="absolute left-4 md:left-8 text-white" onClick={(e) => { e.stopPropagation(); showPrev(); }}><ChevronLeft size={40} /></button>
          <button className="absolute right-4 md:right-8 text-white" onClick={(e) => { e.stopPropagation(); showNext(); }}><ChevronRight size={40} /></button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl max-h-[85vh]">
            <img src={photos[lightboxIndex].imageUrl} alt={photos[lightboxIndex].title} className="max-h-[75vh] mx-auto rounded-lg" />
            <p className="text-white text-center mt-4">{photos[lightboxIndex].title}</p>
          </div>
        </div>
      )}

      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
          <button className="absolute top-6 right-6 text-white" onClick={() => setActiveVideo(null)}><X size={32} /></button>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl aspect-video">
            <iframe
              src={getEmbedUrl(activeVideo)}
              title={activeVideo.title}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
