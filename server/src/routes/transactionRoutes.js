import { Router } from 'express';
import { exportCsv, getTransaction, highRisk, listTransactions, receipt } from '../controllers/transactionController.js';

const router = Router();

router.get('/', listTransactions);
router.get('/high-risk', highRisk);
router.get('/export/csv', exportCsv);
router.get('/:id', getTransaction);
router.get('/:id/receipt', receipt);

export default router;
