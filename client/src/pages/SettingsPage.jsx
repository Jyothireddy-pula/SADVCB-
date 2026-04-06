import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import api from '../lib/api';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [health, setHealth] = useState('checking');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.get('/health').then(() => setHealth('online')).catch(() => setHealth('offline'));
    api.get('/transactions/high-risk').then((res) => setAlerts(res.data));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-semibold">Theme</h3>
        <button className="mt-3 rounded-xl bg-indigo-600 px-4 py-2" onClick={toggleTheme}>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</button>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-semibold">API Status</h3>
        <p className="text-sm text-slate-400">Server is {health}</p>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-semibold">Dummy Fraud Alerts</h3>
        {alerts.length === 0 ? <p className="text-sm text-slate-400">No suspicious transactions.</p> : alerts.map((a) => <p key={a._id}>⚠️ {a.paymentId} - ₹{a.amount}</p>)}
      </div>
    </div>
  );
}
