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
    trim: true,
    validate: {
      validator: function(v) {
        // Regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Regex to ensure exactly 10 digits
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
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