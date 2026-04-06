import { verifyWebhookSignature } from '../utils/signature.js';

export function validateWebhook(req, res, next) {
  const signature = req.headers['x-razorpay-signature'];
  const isValid = verifyWebhookSignature(req.rawBody, signature || '');
  if (!isValid) return res.status(400).json({ message: 'Invalid webhook signature' });
  next();
}
