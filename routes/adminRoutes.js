import express from 'express';
import { 
  adminLogin,
  createPackage, 
  updatePackage, 
  deletePackage 
} from '../controllers/adminController.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Authentication middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

router.post('/login', adminLogin);
router.post('/packages', authenticateAdmin, createPackage);
router.put('/packages/:id', authenticateAdmin, updatePackage);
router.delete('/packages/:id', authenticateAdmin, deletePackage);

export default router;