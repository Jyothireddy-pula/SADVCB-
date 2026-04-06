import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/payflow',
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
  razorpayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || 'webhook_secret',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
