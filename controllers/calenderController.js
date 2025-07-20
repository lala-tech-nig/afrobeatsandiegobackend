const Event = require('../models/Event');

// Get events for the calendar (optionally by month/year)
exports.getCalendarEvents = async (req, res) => {
  try {
    const { month, year } = req.query;

    let query = {};
    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      query.date = { $gte: start, $lte: end };
    }

    const events = await Event.find(query).sort({ date: 1 });

    res.json({ data: events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching calendar events', error: error.message });
  }
};
