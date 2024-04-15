import mongoose from 'mongoose';
type ServiceType = {
  service_name: string;
  service_price: number;
};
const serviceSchema = new mongoose.Schema(
  {
    service_name: {
      type: String,
      require: true,
    },
    service_price: {
      type: Number,
      require: false,
    },
  },
  { timestamps: true },
);
export default mongoose.model<ServiceType>('Services', serviceSchema);
