import { useEffect, useMemo, useState } from 'react';
import api from '../lib/api';

export default function TransactionsPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    api.get('/transactions', { params: { status, q } }).then((res) => setItems(res.data));
  }, [q, status]);

  const rows = useMemo(() => items, [items]);

  const exportCsv = () => {
    window.open(`${import.meta.env.VITE_API_URL}/transactions/export/csv`, '_blank');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <div className="flex flex-wrap gap-3">
        <input className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2" placeholder="Search payment ID" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="high_risk">High Risk</option>
        </select>
        <button className="rounded-xl bg-indigo-600 px-4 py-2" onClick={exportCsv}>Export CSV</button>
      </div>
      <div className="glass overflow-auto rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/60">
            <tr>
              <th className="p-3">Payment ID</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((tx) => (
              <tr key={tx._id} className="border-t border-slate-800">
                <td className="p-3">{tx.paymentId || '-'}</td>
                <td className="p-3">₹{tx.amount}</td>
                <td className="p-3">{tx.fraudFlag === 'High Risk' ? '⚠️ High Risk' : tx.status}</td>
                <td className="p-3">{new Date(tx.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
