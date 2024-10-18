import express from 'express';
import { registerUser } from '../../controllers/auth/auth-controller.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser); // Change to POST

export default router; // Use export default
