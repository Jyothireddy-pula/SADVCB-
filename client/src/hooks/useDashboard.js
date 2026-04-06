import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function useDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/analytics/overview').then((res) => setData(res.data));
  }, []);

  return data;
}
