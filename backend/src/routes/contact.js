const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contact submissions
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// GET single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
});

// POST create contact submission
router.post('/', async (req, res) => {
  try {
    const { fullname, email, mobile, city } = req.body;
    
    const contact = new Contact({
      fullname,
      email,
      mobile,
      city,
    });
    
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully', contact });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting contact form', error: error.message });
  }
});

// DELETE contact submission
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

module.exports = router;