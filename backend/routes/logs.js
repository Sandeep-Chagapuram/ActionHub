import express from 'express';
import { getLogs } from '../controllers/logController.js';

const router = express.Router();

// GET /logs - Fetch paginated audit logs
router.get('/', getLogs);

export default router;
