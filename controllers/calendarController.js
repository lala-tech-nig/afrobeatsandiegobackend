// controllers/calendarController.js

const Calendar = require('../models/Calendar');

// Create calendar event
exports.createEvent = async (req, res) => {
  try {
    // Build event data from form fields
    const eventData = {
      name: req.body.name || "",
      email: req.body.email || "",
      eventTitle: req.body.eventTitle || "",
      eventDetails: req.body.eventDetails || "",
      eventDate: req.body.eventDate || "",
      phone: req.body.phone || "",
      location: req.body.location || "",
      image: null, // default value
      imageUrl: ""
    };

    // If image was uploaded, save its path and file info
    if (req.file) {
      eventData.image = req.file; // Store file info if needed
      eventData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const event = new Calendar(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Calendar.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle published status
exports.toggleEventStatus = async (req, res) => {
  try {
    const event = await Calendar.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.published = !event.published;
    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
