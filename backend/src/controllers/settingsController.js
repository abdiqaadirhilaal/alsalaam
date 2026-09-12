import WebsiteSettings from "../models/WebsiteSettings.js";

export const getSettings = async (req, res) => {
  let settings = await WebsiteSettings.findOne();
  if (!settings) settings = await WebsiteSettings.create({});
  res.json(settings);
};

export const updateSettings = async (req, res) => {
  let settings = await WebsiteSettings.findOne();
  if (!settings) settings = new WebsiteSettings();

  const data = { ...req.body };
  if (req.files?.logo?.[0]) data.logo = req.files.logo[0].path;
  if (req.files?.favicon?.[0]) data.favicon = req.files.favicon[0].path;

  Object.assign(settings, data);
  await settings.save();
  res.json(settings);
};
