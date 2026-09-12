import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  const isAdmin = !!req.admin;
  const { status } = req.query;
  const filter = isAdmin ? {} : { published: true };
  if (status) filter.status = status;
  const events = await Event.find(filter).sort({ date: 1 });
  res.json(events);
};

export const createEvent = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.image = req.file.path;
    data.imagePublicId = req.file.filename;
  }
  const event = await Event.create(data);
  res.status(201).json(event);
};

export const updateEvent = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.image = req.file.path;
    data.imagePublicId = req.file.filename;
  }
  const event = await Event.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ message: "Event deleted" });
};
