const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { title, link, time, description, date } = req.body;

    const image = req.files?.image?.[0]?.filename || '';
    const thumnail = req.files?.thumnail?.[0]?.filename || '';

    const event = new Event({
      title,
      link,
      time,
      description,
      image,
      thumnail,
      date
    });

    await event.save();
    res.status(201).json({ message: 'Event created successfully', data: event });
  } catch (error) {
    res.status(504).json({ message: 'Error creating event', error: error.message });
  }
};

// ✅ Add this missing function
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ message: 'Events fetched successfully', data: events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

exports.toggleEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    event.isFree = !event.isFree;
    await event.save();
    res.status(200).json({ message: 'Event status toggled', data: event });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling event status', error: error.message });
  }
};