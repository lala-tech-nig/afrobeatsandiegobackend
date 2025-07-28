const BookCall = require('../models/BookCall');
const LetsConnect = require('../models/LetsConnect');

// Book a call
exports.createBookCall = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, message } = req.body;

    const newCall = new BookCall({ fullName, phoneNumber, email, message });
    await newCall.save();

    res.status(201).json({ message: 'Call booking submitted successfully', data: newCall });
  } catch (error) {
    res.status(500).json({ message: 'Error booking call', error: error.message });
  }
};

// View all booked calls
exports.getBookCalls = async (req, res) => {
  try {
    const calls = await BookCall.find().sort({ createdAt: -1 });
    res.json({ data: calls });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booked calls', error: error.message });
  }
};

// Toggle status for booked call
exports.toggleBookCallStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const call = await BookCall.findById(id);
    if (!call) return res.status(404).json({ message: 'Call not found' });

    call.status = !call.status;
    await call.save();

    res.json({ message: 'Call status updated', data: call });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling call status', error: error.message });
  }
};

// Submit “Let’s Connect” form
exports.createLetsConnect = async (req, res) => {
  try {
    const { name, email, message, status } = req.body;

    const newConnect = new LetsConnect({ name, email, message, status });
    await newConnect.save();

    res.status(201).json({ message: 'Let’s Connect form submitted', data: newConnect });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
};

// View all “Let’s Connect” submissions
exports.getLetsConnects = async (req, res) => {
  try {
    const forms = await LetsConnect.find().sort({ createdAt: -1 });
    res.json({ data: forms });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
};

// Toggle status for “Let’s Connect”
exports.toggleLetsConnectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await LetsConnect.findById(id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    form.status = !form.status;
    await form.save();

    res.json({ message: 'Form status updated', data: form });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling form status', error: error.message });
  }
};
