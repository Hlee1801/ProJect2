import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/User';
import { generateActiveToken, generateAccessToken, generateRefreshToken } from '../config/genToken';
import { IDecodedToken, IReqAuth, validateEmail } from '../utils';
import { handleUserLogin } from '../middleware';
import { sendConfirmMail } from '../config/sendEmail';
const UserController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { fullName, email, password, gender, phoneNumber, avatar, address, role } = req.body;
      const userExist = await Users.findOne({ email });
      if (userExist) return res.status(400).send({ msg: 'Email already in use' });
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await Users.create({
        fullName,
        email,
        password: passwordHash,
        gender,
        phoneNumber,
        avatar,
        address,
        role,
      });
      if (newUser) {
        res.status(200).json({
          code: 0,
          _id: newUser.id,
          name: newUser.fullName,
          // token: generateActiveToken(newUser._id),
        });
      } else {
        res.status(400).send({ msg: 'Error' });
      }
    } catch (e: any) {
      res.status(500).send({ msg: 'Internal Server Error' });
      console.log(e);
    }
  },
  getAllUser: async (_req: Request, res: Response) => {
    try {
      const user = await Users.find().select('-password').sort('-createdAt');
      if (!user) return res.status(404).send({ msg: 'User not found' });
      res.json({ user });
    } catch (e: any) {
      res.status(500).send({ msg: 'Internal Server Error' });
      console.log(e);
    }
  },
  getUserById: async (req: Request, res: Response) => {
    try {
      const user = await Users.findById(req.params.id).select('-password');
      if (!user) return res.status(404).send({ msg: 'User not found' });
      res.json({ user });
    } catch (e: any) {
      res.status(500).send({ msg: 'Internal Server Error' });
      console.log(e);
    }
  },
  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).send({ msg: 'Invalid' });
    try {
      const { fullName, avatar, phoneNumber, address } = req.body;
      const userUpdate = await Users.findOneAndUpdate(
        { _id: req.params.id },
        { fullName, avatar, phoneNumber, address },
        { new: true },
      );
      res.json({ msg: 'update success', userUpdate });
      console.log(userUpdate);
    } catch (e: any) {
      res.status(500).send({ msg: 'Internal Server Error' });
      console.log(e);
    }
  },
  deleteUser: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).send({ msg: 'Invalid' });
    try {
      const user = await Users.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).send({ msg: 'User not found' });
      res.json({ msg: 'delete success' });
    } catch (e: any) {
      res.status(500).send({ msg: 'Internal Server Error' });
      console.log(e);
    }
  },
  register: async (req: Request, res: Response) => {
    try {
      const { fullName, email, password, gender, phoneNumber, address } = req.body;
      const hasUser = await Users.findOne({ email });
      if (hasUser) return res.status(400).send({ msg: 'Email đã được đăng ký' });
      const passwordHash = await bcrypt.hash(password, 10);
      const newRegister = {
        fullName,
        email,
        password: passwordHash,
        gender,
        phoneNumber,
        address,
      };
      const active_token = generateActiveToken({ newRegister });
      const url = `${process.env.APP_URL}/active/${active_token}`;
      if (validateEmail(email)) {
        await sendConfirmMail(email, url, 'Xác thực tài khoản', fullName);
        return res.send({ msg: 'Success' });
      }
      res.json({
        status: 200,
        msg: 'Register success',
        data: newRegister,
        active_token,
      });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).send({ msg: 'Account not exist' });
      await handleUserLogin(user, password, res);
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  logout: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).send({ msg: 'Invalid' });
    try {
      res.clearCookie('refreshtoken', { path: '/api/rf-token' });
      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          rf_token: '',
        },
      );
      return res.send('Đăng Xuất!');
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).send({ msg: 'Hãy đăng nhập ngay!' });

      const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
      if (!decoded.id) return res.status(400).send({ msg: 'Hãy đăng nhập ngay!' });

      const user = await Users.findById(decoded.id).select('-password +rf_token');
      if (!user) return res.status(400).send({ msg: 'Tài khoản này không tồn tại' });
      if (rf_token !== user.rf_token) return res.status(400).send({ msg: 'Hãy đăng nhập ngay!' });

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      await Users.findOneAndUpdate(
        { _id: user._id },
        {
          rf_token: refresh_token,
        },
      );

      res.json({ access_token, user });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;
      const decoded = <IDecodedToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`);
      const { newRegister } = decoded;

      if (!newRegister) return res.status(400).send({ msg: 'Invalid ' });

      const user = await Users.findOne({ email: newRegister.email });
      if (user) return res.status(400).json({ msg: 'Tài khoản đã tồn tại' });
      const new_user = new Users(newRegister);

      await new_user.save();

      res.json({ msg: 'Kích hoạt tài khoản thành công' });
    } catch (error: any) {
      console.log(error);
      return res.status(500).send({ msg: error.message });
    }
  },
  forgotPass: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (Object.keys(req.body).length === 0) return res.status(400).send({ msg: 'Error' });
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).send({ msg: 'Tài khoản không tồn tại' });
      return res.status(200).json({
        msg: 'Thành công',
        id: user._id,
      });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  resetPass: async (req: IReqAuth, res: Response) => {
    try {
      const { password, id } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      if (!id) return res.status(400).send({ msg: 'Invalid' });
      await Users.findOneAndUpdate(
        { _id: id },
        {
          password: passwordHash,
        },
      );
      res.send({ msg: 'Success' });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
};

export default UserController;
