import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function RevenueCharts({ dailyRevenue = [], breakdown = [] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass rounded-2xl p-4">
        <h4 className="mb-3 font-semibold">Daily Revenue</h4>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyRevenue}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass rounded-2xl p-4">
        <h4 className="mb-3 font-semibold">Payment Outcomes</h4>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={breakdown} dataKey="value" nameKey="label" outerRadius={90}>
                {breakdown.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
