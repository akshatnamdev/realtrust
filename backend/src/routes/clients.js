const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const upload = require('../middleware/upload');
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// GET all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error: error.message });
  }
});


// CREATE CLIENT
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, designation } = req.body;

    const newClient = new Client({
      name,
      description,
      designation,
      image: req.file ? req.file.filename : null, // <-- THE IMPORTANT LINE
    });

    await newClient.save();

    res.status(201).json({ message: 'Client created successfully', client: newClient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating client', error: err.message });
  }
});


// GET single client
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client', error: error.message });
  }
});

// POST create client
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    
    let imagePath = null;
    
    if (req.file) {
      const processedFilename = `processed-${Date.now()}.jpg`;
      const processedPath = path.join('uploads', processedFilename);
      
      await sharp(req.file.path)
        .resize(450, 350, { fit: 'cover' })
        .jpeg({ quality: 90 })
        .toFile(processedPath);
      
      await fs.unlink(req.file.path);
      imagePath = processedFilename;
    }
    
    const client = new Client({
      name,
      description,
      designation,
      image: imagePath,
    });
    
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ message: 'Error creating client', error: error.message });
  }
});

// PUT update client
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    client.name = name || client.name;
    client.description = description || client.description;
    client.designation = designation || client.designation;
    
    if (req.file) {
      if (client.image) {
        const oldPath = path.join('uploads', client.image);
        try {
          await fs.unlink(oldPath);
        } catch (err) {
          console.log('Old image not found');
        }
      }
      
      const processedFilename = `processed-${Date.now()}.jpg`;
      const processedPath = path.join('uploads', processedFilename);
      
      await sharp(req.file.path)
        .resize(450, 350, { fit: 'cover' })
        .jpeg({ quality: 90 })
        .toFile(processedPath);
      
      await fs.unlink(req.file.path);
      client.image = processedFilename;
    }
    
    await client.save();
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: 'Error updating client', error: error.message });
  }
});

// DELETE client
router.delete('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    if (client.image) {
      const imagePath = path.join('uploads', client.image);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.log('Image file not found');
      }
    }
    
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error: error.message });
  }
});

module.exports = router;