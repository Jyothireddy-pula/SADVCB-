import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import api from '../lib/api';

export default function SuccessPage() {
  const [params] = useSearchParams();
  const [tx, setTx] = useState(null);

  useEffect(() => {
    const id = params.get('tx');
    if (id) api.get(`/transactions/${id}`).then((res) => setTx(res.data));
  }, [params]);

  return (
    <div className="relative mx-auto max-w-2xl p-6 text-center">
      <Confetti recycle={false} numberOfPieces={220} />
      <div className="glass rounded-3xl p-8">
        <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-emerald-500 text-4xl">✓</div>
        <h2 className="text-3xl font-bold text-emerald-400">Payment Successful</h2>
        {tx && (
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>Payment ID: {tx.paymentId}</p>
            <p>Order ID: {tx.orderId}</p>
          </div>
        )}
        <a className="mt-6 inline-block rounded-xl bg-emerald-600 px-5 py-2 font-semibold" href={`${import.meta.env.VITE_API_URL}/transactions/${params.get('tx')}/receipt`}>
          Download Receipt
        </a>
      </div>
    </div>
  );
}
