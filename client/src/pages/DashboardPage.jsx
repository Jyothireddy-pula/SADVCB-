import MetricCard from '../components/MetricCard';
import RevenueCharts from '../components/RevenueCharts';
import useDashboard from '../hooks/useDashboard';

export default function DashboardPage() {
  const data = useDashboard();
  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Total Revenue" value={`₹${data.totalRevenue}`} subtitle="All time" tone="indigo" />
        <MetricCard title="Transactions" value={data.totalTransactions} subtitle="Processed payments" tone="emerald" />
        <MetricCard title="Success Rate" value={`${data.successRate}%`} subtitle="Gateway success" tone="rose" />
      </div>
      <RevenueCharts dailyRevenue={data.dailyRevenue} breakdown={data.breakdown} />
      <div className="glass rounded-2xl p-5">
        <h3 className="font-semibold">Smart Insights</h3>
        <p className="text-sm text-slate-400">Best day revenue: ₹{data.bestDay?.revenue || 0} on {data.bestDay?.day || '-'}</p>
        <p className="text-sm text-slate-400">Peak transaction hour: {data.peakHour || 'N/A'}:00</p>
      </div>
    </div>
  );
}
