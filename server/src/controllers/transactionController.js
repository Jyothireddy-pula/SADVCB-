import { Parser } from 'json2csv';
import Transaction from '../models/Transaction.js';

export async function listTransactions(req, res) {
  const { status, q } = req.query;
  const query = {};
  if (status && status !== 'all') {
    if (status === 'high_risk') query.fraudFlag = 'High Risk';
    else query.status = status;
  }
  if (q) query.paymentId = { $regex: q, $options: 'i' };
  const rows = await Transaction.find(query).sort({ createdAt: -1 }).limit(200);
  res.json(rows);
}

export async function getTransaction(req, res) {
  const row = await Transaction.findById(req.params.id);
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.json(row);
}

export async function receipt(req, res) {
  const tx = await Transaction.findById(req.params.id);
  if (!tx) return res.status(404).json({ message: 'Not found' });
  const content = `Receipt\nOrder: ${tx.orderId}\nPayment: ${tx.paymentId}\nAmount: ₹${tx.amount}\nStatus: ${tx.status}\nDate: ${tx.createdAt.toISOString()}\n`;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=receipt-${tx._id}.pdf`);
  res.send(Buffer.from(content));
}

export async function highRisk(req, res) {
  const rows = await Transaction.find({ fraudFlag: 'High Risk' }).sort({ createdAt: -1 }).limit(20);
  res.json(rows);
}

export async function exportCsv(req, res) {
  const rows = await Transaction.find().sort({ createdAt: -1 });
  const parser = new Parser({ fields: ['orderId', 'paymentId', 'amount', 'status', 'mode', 'fraudFlag', 'createdAt'] });
  const csv = parser.parse(rows.map((d) => d.toObject()));
  res.header('Content-Type', 'text/csv');
  res.attachment('transactions.csv');
  res.send(csv);
}
