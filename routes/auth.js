const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */


router.post('/signup', async (req, res) => {
  // Extract the email and password from the request body
  const { email, password } = req.body;

  try {
    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided email and hashed password
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    // If an error occurs
    res.status(500).json({ message: 'Error creating user', error: err });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in to an existing user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', async (req, res) => {
  // Extract the email and password from the request body
  const { email, password } = req.body;
  
  try {
    // Find a user by the provided email
    const user = await User.findOne({ email });
    
    // If no user is found
    if (!user) {      
      return res.status(401).json({ message: 'Invalid email or password' });
    } 

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    
    // If the passwords do not match
    if (!isMatch) {      
      return res.status(401).json({ message: 'Invalid email or password' });
    }
   
    // Save the user's ID in the session
    req.session.userId = user._id;
    
    // Respond with a success message
    res.json({ message: 'Logged in successfully' });
  } catch (err) {
    // If an error occurs
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out of the current user account
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    // If an error occurs while destroying the session
    if (err) return res.status(500).json({ message: 'Error logging out' });

    // Clear the session cookie
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});


module.exports = router;
