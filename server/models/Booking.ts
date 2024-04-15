import mongoose, { Schema } from 'mongoose';
import { IBooking } from '../utils';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    room: { type: mongoose.Types.ObjectId, ref: 'Room' },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    email: { type: String, require: true },
    billing: { type: Number },
    status: { type: String, default: 'pending' },
    adult_quantity: { type: Number, min: 0, max: 4 },
    children_quantity: { type: Number, min: 0, max: 3 },
    customer_name: { type: String },
    room_name: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IBooking>('Booking', bookingSchema);
