import Booking from '../models/Booking.js';
import Package from '../models/Package.js';
import { generateInvoicePDF } from '../utils/invoiceGenerator.js';

export const createBooking = async (req, res) => {
  try {
    const { 
      packageId, 
      customerName, 
      email, 
      phoneNumber, 
      numberOfTravelers, 
      specialRequests 
    } = req.body;

    // Find the package to calculate total price
    const packageMain = await Package.findById(packageId);
    if (!packageMain) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const totalPrice = packageMain.price * numberOfTravelers;

    // Create booking
    const booking = new Booking({
      package: packageId,
      customerName,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequests,
      totalPrice
    });

    await booking.save();

    // Generate invoice
    const invoicePdf = await generateInvoicePDF(booking, packageMain);

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
      invoiceUrl: invoicePdf
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('package');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};