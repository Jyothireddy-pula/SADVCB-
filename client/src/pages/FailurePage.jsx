import { useNavigate } from 'react-router-dom';

export default function FailurePage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-xl p-6 text-center">
      <div className="glass rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-rose-400">Payment Failed</h2>
        <p className="mt-3 text-slate-400">Something went wrong while processing your payment.</p>
        <button onClick={() => navigate('/pay')} className="mt-6 rounded-xl bg-rose-600 px-5 py-2 font-semibold">
          Retry Payment
        </button>
      </div>
    </div>
  );
}
