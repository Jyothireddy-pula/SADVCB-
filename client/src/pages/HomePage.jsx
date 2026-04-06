import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/PlanCard';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-8 p-6 text-center">
      <h1 className="text-5xl font-bold">Modern Payments for Bold Startups</h1>
      <p className="max-w-xl text-slate-400">Accept one-time payments, donations, and subscriptions with a premium dashboard experience.</p>
      <button
        className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:scale-105"
        onClick={() => navigate('/pay')}
      >
        Pay Now
      </button>
      <div className="grid w-full gap-4 md:grid-cols-3">
        <PlanCard name="Starter" amount={99} onPick={(amt) => navigate(`/pay?amount=${amt}`)} />
        <PlanCard name="Growth" amount={299} onPick={(amt) => navigate(`/pay?amount=${amt}`)} />
        <PlanCard name="Custom Donation" amount={499} onPick={(amt) => navigate(`/pay?amount=${amt}`)} />
      </div>
    </div>
  );
}
