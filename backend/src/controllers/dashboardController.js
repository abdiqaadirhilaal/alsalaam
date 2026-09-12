import ContactMessage from "../models/ContactMessage.js";
import Gallery from "../models/Gallery.js";
import Video from "../models/Video.js";
import Teacher from "../models/Teacher.js";
import News from "../models/News.js";
import Event from "../models/Event.js";
import Achievement from "../models/Achievement.js";
import AdmissionApplication from "../models/AdmissionApplication.js";

export const getDashboardStats = async (req, res) => {
  const [
    totalMessages,
    unreadMessages,
    totalPhotos,
    totalVideos,
    totalTeachers,
    publishedNews,
    upcomingEvents,
    totalAchievements,
    totalApplications,
  ] = await Promise.all([
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ status: "unread" }),
    Gallery.countDocuments(),
    Video.countDocuments(),
    Teacher.countDocuments(),
    News.countDocuments({ published: true }),
    Event.countDocuments({ status: "upcoming" }),
    Achievement.countDocuments(),
    AdmissionApplication.countDocuments(),
  ]);

  res.json({
    totalMessages,
    unreadMessages,
    totalPhotos,
    totalVideos,
    totalTeachers,
    publishedNews,
    upcomingEvents,
    totalAchievements,
    totalApplications,
  });
};
