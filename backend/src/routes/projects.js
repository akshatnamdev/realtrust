const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const upload = require('../middleware/upload');
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
});

// POST create project
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    
    let imagePath = null;
    
    // If image is uploaded, process it with sharp (crop to 450x350)
    if (req.file) {
      const processedFilename = `processed-${Date.now()}.jpg`;
      const processedPath = path.join('uploads', processedFilename);
      
      await sharp(req.file.path)
        .resize(450, 350, { fit: 'cover' })
        .jpeg({ quality: 90 })
        .toFile(processedPath);
      
      // Delete original file
      await fs.unlink(req.file.path);
      
      imagePath = processedFilename;
    }
    
    const project = new Project({
      name,
      description,
      image: imagePath,
    });
    
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
});

// PUT update project
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    project.name = name || project.name;
    project.description = description || project.description;
    
    // If new image is uploaded
    if (req.file) {
      // Delete old image if exists
      if (project.image) {
        const oldPath = path.join('uploads', project.image);
        try {
          await fs.unlink(oldPath);
        } catch (err) {
          console.log('Old image not found');
        }
      }
      
      // Process new image
      const processedFilename = `processed-${Date.now()}.jpg`;
      const processedPath = path.join('uploads', processedFilename);
      
      await sharp(req.file.path)
        .resize(450, 350, { fit: 'cover' })
        .jpeg({ quality: 90 })
        .toFile(processedPath);
      
      await fs.unlink(req.file.path);
      project.image = processedFilename;
    }
    
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error updating project', error: error.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Delete image file if exists
    if (project.image) {
      const imagePath = path.join('uploads', project.image);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.log('Image file not found');
      }
    }
    
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

module.exports = router;