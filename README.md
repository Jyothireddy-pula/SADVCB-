# PayFlow — Full Stack Razorpay Test Platform

A production-style payment platform with React + Tailwind frontend and Node + Express + MongoDB backend, integrated with Razorpay test mode.

## Features
- Razorpay order creation, checkout popup, HMAC SHA256 payment verification.
- Payment success/failure pages with retry flow.
- Downloadable receipt endpoint.
- Admin dashboard with revenue metrics, success/failure split, daily analytics, best day, and peak hour.
- Transactions page with search, status filters, high-risk flag, and CSV export.
- Webhook listener to auto-update payment status.
- Donation mode, one-time plans, and subscription mode.
- Fake fraud detection for amounts > ₹50,000.
- Dark/light theme toggle and responsive UI.

## Project Structure

```
client/
  src/components
  src/pages
  src/hooks
  src/context
  src/lib
server/
  src/routes
  src/controllers
  src/models
  src/utils
  src/config
```

## Setup

### 1) Install dependencies
```bash
npm install
npm run install:all
```

### 2) Configure environment variables
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Add Razorpay test credentials and Mongo URI.

### 3) Run app
```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:8080`

### 4) Optional seed data
```bash
npm run seed --prefix server
```

## Razorpay & Network Error Troubleshooting
If you get **"Network Error"** on clicking **Pay with Razorpay**:
1. Ensure backend is running on `http://localhost:8080`.
2. Ensure frontend is running on `http://localhost:5173`.
3. Set `VITE_RAZORPAY_KEY_ID` in `client/.env` (public test key only).
4. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `server/.env`.
5. Keep `VITE_API_URL` empty to use Vite proxy, or set it to `http://localhost:8080/api`.

## API Endpoints

### Payments
- `POST /api/payments/create-order`
- `POST /api/payments/verify`
- `POST /api/payments/fail`
- `POST /api/payments/webhook`

### Transactions
- `GET /api/transactions`
- `GET /api/transactions/:id`
- `GET /api/transactions/:id/receipt`
- `GET /api/transactions/high-risk`
- `GET /api/transactions/export/csv`

### Analytics
- `GET /api/analytics/overview`

## Security Notes
- Secrets only in `.env`.
- Signature verification runs on backend.
- Webhook signatures validated before updates.
