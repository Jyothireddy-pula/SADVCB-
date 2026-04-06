export function detectFraud(amount) {
  if (amount > 50000) return 'High Risk';
  return 'Normal';
}
