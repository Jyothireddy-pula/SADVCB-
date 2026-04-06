import { motion } from 'framer-motion';

export default function PlanCard({ name, amount, onPick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass w-full rounded-2xl p-6 text-left"
      onClick={() => onPick(amount)}
      type="button"
    >
      <p className="text-sm text-slate-400">{name}</p>
      <h3 className="text-3xl font-bold">₹{amount}</h3>
    </motion.button>
  );
}
