import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/api';
import { QRCodeSVG } from 'qrcode.react';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [amount, setAmount] = useState(params.get('amount') || 99);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('donation');

  const qrValue = useMemo(() => `upi://pay?pa=dummy@upi&am=${amount}&cu=INR`, [amount]);

  const payNow = async () => {
    setLoading(true);
    try {
      const loaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!loaded) throw new Error('Unable to load Razorpay checkout');

      const { data } = await api.post('/payments/create-order', {
        amount: Number(amount),
        mode,
        customer: { name: 'Demo User', email: 'demo@payflow.dev' }
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'PayFlow',
        description: mode === 'subscription' ? 'Monthly subscription' : 'One-time payment',
        order_id: data.order.id,
        handler: async (response) => {
          const verify = await api.post('/payments/verify', {
            ...response,
            orderMeta: { amount: Number(amount), mode }
          });
          toast.success('Payment successful');
          navigate(`/payment/success?tx=${verify.data.transaction._id}`);
        },
        prefill: { name: 'Demo User', email: 'demo@payflow.dev' },
        theme: { color: '#4f46e5' },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
            navigate('/payment/failure');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', async (failure) => {
        await api.post('/payments/fail', {
          order_id: data.order.id,
          reason: failure.error.description,
          amount: Number(amount)
        });
        navigate('/payment/failure');
      });
      rzp.open();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="glass rounded-3xl p-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            Amount (₹)
            <input
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              min={1}
            />
          </label>
          <label className="text-sm">
            Mode
            <select className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-3" value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="donation">Donation</option>
              <option value="one_time">One-time plan</option>
              <option value="subscription">Subscription monthly</option>
            </select>
          </label>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:scale-105" onClick={payNow} disabled={loading}>
            {loading ? 'Processing...' : 'Pay with Razorpay'}
          </button>
          <div className="rounded-xl bg-white p-2">
            <QRCodeSVG value={qrValue} size={70} />
          </div>
          <p className="text-xs text-slate-400">QR demo simulation for instant payment UX.</p>
        </div>
      </div>
    </div>
  );
}
