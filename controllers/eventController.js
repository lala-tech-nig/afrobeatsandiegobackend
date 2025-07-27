const Event = require('../models/Event');

// Submit (Create) a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, link, time, description, image, thumnail, date } = req.body;

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
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Get all events (sorted by date ascending)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json({ data: events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Toggle `isPosted` status of a single event
exports.toggleEventStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.isPosted = !event.isPosted;
    await event.save();

    res.json({ message: 'Event status toggled successfully', data: event });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event status', error: error.message });
  }
};
