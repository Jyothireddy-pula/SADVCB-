import crypto from 'crypto';
import { env } from '../config/env.js';

export function verifyPaymentSignature({ orderId, paymentId, signature }) {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac('sha256', env.razorpayKeySecret).update(body).digest('hex');
  return expected === signature;
}

export function verifyWebhookSignature(rawBody, signature) {
  const expected = crypto
    .createHmac('sha256', env.razorpayWebhookSecret)
    .update(rawBody)
    .digest('hex');
  return expected === signature;
}
