import Transaction from '../models/Transaction.js';

export async function overview(req, res) {
  const all = await Transaction.find().sort({ createdAt: 1 });
  const totalRevenue = all.filter((x) => x.status === 'success').reduce((sum, x) => sum + x.amount, 0);
  const totalTransactions = all.length;
  const successCount = all.filter((x) => x.status === 'success').length;
  const failedCount = all.filter((x) => x.status === 'failed').length;
  const successRate = totalTransactions ? ((successCount / totalTransactions) * 100).toFixed(2) : 0;

  const dayMap = new Map();
  const hourMap = new Map();
  for (const tx of all) {
    const day = tx.createdAt.toISOString().slice(0, 10);
    const hour = new Date(tx.createdAt).getHours();
    if (!dayMap.has(day)) dayMap.set(day, 0);
    if (tx.status === 'success') dayMap.set(day, dayMap.get(day) + tx.amount);
    hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
  }

  const dailyRevenue = [...dayMap.entries()].map(([day, revenue]) => ({ day, revenue }));
  const bestDay = dailyRevenue.sort((a, b) => b.revenue - a.revenue)[0] || null;
  const peakHour = [...hourMap.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  res.json({
    totalRevenue,
    totalTransactions,
    successRate,
    breakdown: [
      { label: 'Success', value: successCount, color: '#10b981' },
      { label: 'Failed', value: failedCount, color: '#ef4444' }
    ],
    dailyRevenue,
    bestDay,
    peakHour
  });
}
