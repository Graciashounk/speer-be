const express = require('express');
const router = express.Router();
const Note = require('../models/note');

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search Notes
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search notes
 *     description: Search for notes using a query parameter and the owner's user ID from the session.
 *     tags: [Search]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: q="string"
 *         required: true
 *         description: The search query.
 *         schema:
 *           type: string      
 *     responses:
 *       200:
 *         description: A list of notes matching the search query.
 *         
 *       400:
 *         description: Query parameter q is required.
 */



router.get('/', async (req, res) => {
    // Extract the 'q' query parameter from the request
    const { q } = req.query;

    // If the 'q' parameter is missing, respond with a 400 Bad Request status
    if (!q) {
        return res.status(400).send('Query parameter q is required');
    }

    // Search for notes that match the query and belong to the current user
    const notes = await Note.find({ 
        $text: { $search: q }, 
        owner: req.session.userId 
    });

    // Send the found notes as the response
    res.send(notes);
});

module.exports = router;
