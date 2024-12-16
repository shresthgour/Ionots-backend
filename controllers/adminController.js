import Package from '../models/Package.js';
import jwt from 'jsonwebtoken';

export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME && 
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { username: process.env.ADMIN_USERNAME }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    return res.json({ token });
  }

  console.log('Admin Loggedin Successfully!')
  res.status(401).json({ message: 'Invalid credentials' });
};

export const createPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: 'Error creating package', error: error.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: 'Error updating package', error: error.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error: error.message });
  }
};