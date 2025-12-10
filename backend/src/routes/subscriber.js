const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// ============================
// GET all subscribers
// ============================
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching subscribers',
      error: error.message
    });
  }
});

// ============================
// GET single subscriber by ID
// ============================
router.get('/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    res.json(subscriber);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching subscriber',
      error: error.message
    });
  }
});

// ============================
// POST subscribe (add new email)
// ============================
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if already exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({
      message: 'Successfully subscribed to newsletter',
      subscriber
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error subscribing',
      error: error.message
    });
  }
});

// ============================
// DELETE subscriber by ID
// ============================
router.delete('/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    await Subscriber.findByIdAndDelete(req.params.id);

    res.json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting subscriber',
      error: error.message
    });
  }
});

module.exports = router;
