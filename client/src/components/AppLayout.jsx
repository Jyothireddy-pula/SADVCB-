import { NavLink, Outlet } from 'react-router-dom';
import { FiBarChart2, FiCreditCard, FiHome, FiSettings } from 'react-icons/fi';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/app/transactions', label: 'Transactions', icon: FiCreditCard },
  { to: '/app/analytics', label: 'Analytics', icon: FiBarChart2 },
  { to: '/app/settings', label: 'Settings', icon: FiSettings }
];

export default function AppLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="glass p-5 md:min-h-screen">
        <h1 className="mb-6 text-xl font-bold">PayFlow</h1>
        <nav className="space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-4 py-2 transition ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-700/40'}`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <motion.main
        className="p-4 md:p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
