import Transaction from '../models/Transaction.js';
import { razorpay } from '../services/razorpay.js';
import { detectFraud } from '../utils/fraudCheck.js';
import { verifyPaymentSignature } from '../utils/signature.js';

export async function createOrder(req, res) {
  const { amount, mode, customer } = req.body;
  if (!amount || amount < 1) return res.status(400).json({ message: 'Invalid amount' });

  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: `rcpt_${Date.now()}`
  });

  await Transaction.create({
    orderId: order.id,
    amount,
    mode,
    customer,
    fraudFlag: detectFraud(amount),
    status: 'created'
  });

  return res.json({ order });
}

export async function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderMeta } = req.body;
  const valid = verifyPaymentSignature({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature
  });

  if (!valid) return res.status(400).json({ message: 'Signature mismatch' });

  const tx = await Transaction.findOneAndUpdate(
    { orderId: razorpay_order_id },
    {
      status: 'success',
      paymentId: razorpay_payment_id,
      mode: orderMeta.mode,
      fraudFlag: detectFraud(orderMeta.amount)
    },
    { new: true }
  );

  return res.json({ ok: true, transaction: tx });
}

export async function paymentFailed(req, res) {
  const { order_id, reason } = req.body;
  await Transaction.findOneAndUpdate({ orderId: order_id }, { status: 'failed', notes: reason });
  res.json({ ok: true });
}

export async function webhookHandler(req, res) {
  const event = req.body.event;
  const payload = req.body.payload?.payment?.entity;

  if (event === 'payment.captured') {
    await Transaction.findOneAndUpdate({ orderId: payload.order_id }, { status: 'success', paymentId: payload.id });
  }
  if (event === 'payment.failed') {
    await Transaction.findOneAndUpdate({ orderId: payload.order_id }, { status: 'failed', notes: payload.error_description || 'failed via webhook' });
  }
  res.json({ received: true });
}
