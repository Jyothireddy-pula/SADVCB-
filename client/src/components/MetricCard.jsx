const toneMap = {
  indigo: 'text-indigo-400',
  emerald: 'text-emerald-400',
  rose: 'text-rose-400'
};

export default function MetricCard({ title, value, subtitle, tone = 'indigo' }) {
  return (
    <div className="glass rounded-2xl p-5 shadow-xl">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className={`text-2xl font-semibold ${toneMap[tone] || toneMap.indigo}`}>{value}</h3>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}
