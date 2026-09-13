import WebsiteSettings from "../models/WebsiteSettings.js";

export const getSettings = async (req, res) => {
  let settings = await WebsiteSettings.findOne();
  if (!settings) settings = await WebsiteSettings.create({});
  res.json(settings);
};

export const updateSettings = async (req, res) => {
  let settings = await WebsiteSettings.findOne();
  if (!settings) settings = new WebsiteSettings();

  const parseJSON = (value) => {
    if (typeof value !== "string") return value;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const data = {};
  for (const key of [
    "schoolName", "description", "phone", "email", "address",
    "footerContent", "logo", "favicon",
  ]) {
    if (req.body[key] != null) data[key] = req.body[key];
  }
  for (const key of ["socialLinks", "heroContent", "stats"]) {
    if (req.body[key] != null) data[key] = parseJSON(req.body[key]);
  }
  if (req.files?.logo?.[0]) data.logo = req.files.logo[0].path;
  if (req.files?.favicon?.[0]) data.favicon = req.files.favicon[0].path;

  settings.set(data);
  await settings.save();
  res.json(settings);
};
