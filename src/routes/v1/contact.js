const express = require('express');
const router = express.Router();
const Contact = require('../../models/Contact');

/**
 * @swagger
 * /api/v1/get/contact:
 *   get:
 *     summary: Get latest contact message
 *     tags: [Contact]
 */
router.get('/get/contact', async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ createdAt: -1 });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/v1/get/contact/all:
 *   get:
 *     summary: Get all contact messages
 *     tags: [Contact]
 */
router.get('/get/contact/all', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/v1/send/contact:
 *   post:
 *     summary: Send a new contact message
 *     tags: [Contact]
 */
router.post('/send/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;