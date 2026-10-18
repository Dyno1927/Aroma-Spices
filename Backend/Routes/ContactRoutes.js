/**
 * Contact Routes
 * API endpoint for contact form submissions
 */

import { submitContact } from '../Controllers/ContactController.js';
import express from 'express';

const router = express.Router();
router.post('/', submitContact);

export default router;
