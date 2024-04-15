import mongoose from 'mongoose';
import { IUser, validateEmail } from '../utils';
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Hãy nhập tên cho tài khoản'],
      trim: true,
      maxLength: [20, 'Tên tài khoản giới hạn trong 20 ký tự'],
    },
    email: {
      type: String,
      required: [true, 'Hãy nhập email của bạn'],
      trim: true,
      unique: true,
      validate: [validateEmail, 'Hãy nhập đúng định dạng mail'],
    },
    password: {
      type: String,
      required: [true, 'Hãy nhập mật khẩu'],
      MaxLength: [20, 'Pass length require 6 to 20 char'],
    },
    gender: {
      type: String,
      required: [true, 'Hãy chọn giới tính'],
      unique: false,
    },
    phoneNumber: {
      type: String,
      require: [true, 'Hãy nhập số điện thoại'],
      MaxLength: [10, 'Phone Number limit to 10'],
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
    address: {
      type: String,
      required: [true, 'Hãy nhập địa chỉ'],
    },
    role: {
      type: String,
      default: 'user',
    },
    type: {
      type: String,
      default: 'register',
    },
    rf_token: { type: String, select: false },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('Users', userSchema);
