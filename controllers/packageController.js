import Package from '../models/Package.js';

export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error: error.message });
  }
};

export const getPackageById = async (req, res) => {
  try {
    const packageMain = await Package.findById(req.params.id);
    if (!packageMain) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(packageMain);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching package', error: error.message });
  }
};