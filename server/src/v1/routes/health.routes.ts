import { Router } from 'express';
import { getHealth, getHealthDetailed } from '../controllers/health.controller';

const router = Router();

/**
 * @route   GET /api/v1/health
 * @desc    Basic health check
 * @access  Public
 */
router.get('/', getHealth);

/**
 * @route   GET /api/v1/health/detailed
 * @desc    Detailed health check with database and system info
 * @access  Public
 */
router.get('/detailed', getHealthDetailed);

export default router;
