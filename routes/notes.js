const express = require('express');
const Note = require('../models/note');
const User = require('../models/user');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

router.use(limiter);

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes management
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 */

router.get('/', async (req, res) => {
  
  // Find notes that either belong to the current user or are shared with the current user
  const notes = await Note.find({
    $or: [
        { owner: req.session.userId },
        { shared_with: req.session.userId } 
    ]
  });
  
  res.send(notes);
});

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]      
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 */
router.post('/', async (req, res) => {
  // Extract the title and content from the request body
  const { title, content } = req.body;
  
  // Create a new note with the extracted title, content, and the current user's ID as the owner
  const note = new Note({
    owner: req.session.userId,
    title,
    content,
  });

  // Save the new note to the database
  await note.save();
  res.status(201).json(note);
});


/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get specific note based on id
 *     tags: [Notes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the note to find
 *     responses:
 *       200:
 *         description: List of notes
 */
router.get('/:id', async (req, res) => {
  // Find a note by its ID and the owner's user ID from the session
  const note = await Note.findOne({ _id: req.params.id, owner: req.session.userId });

  // If no note is found
  if (!note) return res.status(404).send('Note not found');

  // If a note is found
  res.json(note);
});

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update existing note
 *     tags: [Notes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the note to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 */
router.put('/:id', async (req, res) => {
  // Extract the title and content from the request body
  const { title, content } = req.body;

  // Find a note with id provided and update it
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, owner: req.session.userId },
    { title, content, updated_at: Date.now() },
    { new: true } // Return the updated document
  );

  // If no note is found
  if (!note) return res.status(404).send('Note not found');

  // If a note is found and updated
  res.json(note);
});

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete note
 *     tags: [Notes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the note to delete
 *     responses:
 *       204:
 *         description: Note deleted
 */
router.delete('/:id', async (req, res) => {
  // Find a note with id provided
  const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.session.userId });

  // If no note is found
  if (!note) return res.status(404).send('Note not found');

  // If a note is found and deleted
  res.status(204).send();
});

/**
 * @swagger
 * /api/notes/{id}/share:
 *   post:
 *     summary: Share a note with another user
 *     tags: [Notes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the note to share
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to share the note with
 *     responses:
 *       200:
 *         description: Note shared
 *       400:
 *         description: Bad request
 *       404:
 *         description: Note not found
 *       409:
 *         description: Note already shared
 */

router.post('/:id/share', async (req, res) => {
  // Extract the userId from the request body
  const { userId } = req.body;

  // Find the note with id provided
  const note = await Note.findById(req.params.id);

  // Check if the userId is not already in the shared_with array
  if (!note.shared_with.includes(userId)) {
    // Add the userId to the shared_with array
    note.shared_with.push(userId);    
    await note.save();    
    res.send('Note shared');
  } else {
    // If the userId is already in the shared_with array
    res.send('Note already shared');
  }
});


module.exports = router;