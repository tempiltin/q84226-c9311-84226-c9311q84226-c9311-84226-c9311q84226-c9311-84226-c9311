const express = require('express');
const router = express.Router();
const Technology = require('../../models/Technology');

/**
 * @swagger
 * /api/v1/techno-get:
 *   get:
 *     summary: Get all technologies
 *     tags: [Technology]
 */
router.get('/techno-get', async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.json(technologies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/v1/techno-post:
 *   post:
 *     summary: Create a new technology
 *     tags: [Technology]
 */
router.post('/techno-post', async (req, res) => {
  try {
    const technology = new Technology(req.body);
    const newTechnology = await technology.save();
    res.status(201).json(newTechnology);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/v1/techno-put/{id}:
 *   put:
 *     summary: Update a technology
 *     tags: [Technology]
 */
router.put('/techno-put/:id', async (req, res) => {
  try {
    const technology = await Technology.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!technology) return res.status(404).json({ message: 'Technology not found' });
    res.json(technology);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;