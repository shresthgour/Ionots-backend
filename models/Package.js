import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  availableDates: {
    type: [Date],
    validate: {
      validator: function(v) {
        // Optional: ensure at least one date if array is provided
        return !v || v.length === 0 || v.every(date => date instanceof Date);
      },
      message: 'Please provide valid dates'
    },
    default: [] // Default to an empty array
  },
  imageUrl: {
    type: String,
    required: true
  },
  maxTravelers: {
    type: Number,
    default: 50
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Package', packageSchema);