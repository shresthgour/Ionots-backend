import express from 'express';
import { 
  getAllPackages, 
  getPackageById 
} from '../controllers/packageController.js';

const router = express.Router();

router.get('/', getAllPackages);
router.get('/:id', getPackageById);

export default router;