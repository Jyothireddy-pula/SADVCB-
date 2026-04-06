import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    paymentId: { type: String, default: '' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['created', 'success', 'failed'], default: 'created' },
    mode: { type: String, enum: ['donation', 'one_time', 'subscription'], default: 'donation' },
    fraudFlag: { type: String, enum: ['Normal', 'High Risk'], default: 'Normal' },
    notes: { type: String, default: '' },
    customer: {
      name: String,
      email: String
    }
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
