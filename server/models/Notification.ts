import mongoose from 'mongoose';
type Noti = {
  content: string;
};
const notificationSchema = new mongoose.Schema({
  // user: { type: mongoose.Types.ObjectId, ref: 'User' },
  content: {
    type: String,
    default: 'Bạn không có thông báo nào !',
  },
  // state: {
  //   type: Boolean,
  // },
});
export default mongoose.model<Noti>('Notification', notificationSchema);
