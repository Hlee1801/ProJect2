import mongoose from 'mongoose';
import { IComment } from '../utils';
const commentSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    room_id: { type: mongoose.Types.ObjectId, ref: 'Room' },
    content: { type: String, require: true },
    reply: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    reply_user: { type: mongoose.Types.ObjectId, ref: 'User' },
    root: { type: mongoose.Types.ObjectId, ref: 'Comment' },
    rating:{type:Number,max:5}
  },
  {
    timestamps: true,
  },
);
export default mongoose.model<IComment>('Comment', commentSchema);
