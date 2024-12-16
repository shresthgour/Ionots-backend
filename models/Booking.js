import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  numberOfTravelers: {
    type: Number,
    required: true,
    min: 1
  },
  specialRequests: {
    type: String,
    trim: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  }
});

export default mongoose.model('Booking', bookingSchema);