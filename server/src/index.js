import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { env } from './config/env.js';
import { connectDb } from './config/db.js';
import paymentRoutes from './routes/paymentRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const app = express();

app.use(
  express.json({
    verify: (req, _, buf) => {
      req.rawBody = buf.toString();
    }
  })
);
app.use(cors({ origin: env.clientUrl }));
app.use(helmet());
app.use(morgan('dev'));

app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api/payments', paymentRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/analytics', analyticsRoutes);

connectDb().then(() => {
  app.listen(env.port, () => console.log(`Server running on ${env.port}`));
});
