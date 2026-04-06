import { connectDb } from '../src/config/db.js';
import Transaction from '../src/models/Transaction.js';

await connectDb();
await Transaction.deleteMany({});

const now = Date.now();
const sample = Array.from({ length: 30 }).map((_, i) => ({
  orderId: `order_demo_${i}`,
  paymentId: `pay_demo_${i}`,
  amount: Math.floor(Math.random() * 2000) + 99,
  status: i % 5 === 0 ? 'failed' : 'success',
  mode: i % 2 === 0 ? 'subscription' : 'donation',
  fraudFlag: i % 9 === 0 ? 'High Risk' : 'Normal',
  createdAt: new Date(now - i * 86400000),
  updatedAt: new Date(now - i * 86400000)
}));

await Transaction.insertMany(sample);
console.log('Seeded transactions');
process.exit(0);
