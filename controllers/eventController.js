const Event = require('../models/Event');

// Submit a new event
exports.submitEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue, coverImage, additionalImages } = req.body;

    const event = new Event({
      title,
      description,
      date,
      time,
      venue,
      coverImage,
      additionalImages,
    });

    await event.save();

    res.status(201).json({ message: 'Event submitted successfully', data: event });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting event', error: error.message });
  }
};

// Get all submitted events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sorted by upcoming date
    res.json({ data: events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};