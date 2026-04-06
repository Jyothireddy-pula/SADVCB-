import { Router } from 'express';
import { createOrder, paymentFailed, verifyPayment, webhookHandler } from '../controllers/paymentController.js';
import { validateWebhook } from '../middleware/verifyWebhook.js';

const router = Router();

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.post('/fail', paymentFailed);
router.post('/webhook', validateWebhook, webhookHandler);

export default router;
