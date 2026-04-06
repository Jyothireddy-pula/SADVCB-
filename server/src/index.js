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

const allowedOrigins = [env.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  express.json({
    verify: (req, _, buf) => {
      req.rawBody = buf.toString();
    }
  })
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true
  })
);
app.use(helmet());
app.use(morgan('dev'));

app.get('/api/health', (_, res) => res.json({ ok: true }));
app.get('/', (_, res) => res.send('PayFlow API is running'));
app.use('/api/payments', paymentRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use((err, _, res, __) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

connectDb()
  .then(() => {
    app.listen(env.port, () => console.log(`Server running on ${env.port}`));
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });
