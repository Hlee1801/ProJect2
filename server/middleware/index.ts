// entry point here
import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/User';
import { IDecodedToken, IReqAuth, IUser, IUserParams } from '../utils';
import { generateAccessToken, generateRefreshToken } from '../config/genToken';
export const authenticate = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(400).send({ msg: 'Invalid' });
    const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decoded) return res.status(400).send({ msg: 'Invalid' });
    const user = await Users.findOne({ _id: decoded.id }).select('-password');
    if (!user) return res.status(400).json({ msg: 'User does not exist.' });
    req.user = user;
    next();
  } catch (error: any) {
    return res.status(500).send({ msg: error.message });
  }
};
export const handleUserLogin = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    let msgError = 'Sai mật khẩu,vui lòng nhập lại.';
    return res.status(400).json({ msg: msgError });
  }

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);
  await Users.findOneAndUpdate(
    { _id: user._id },
    {
      rf_token: refresh_token,
    },
  );

  res.cookie('refreshtoken', refresh_token, {
    httpOnly: true,
    path: `/api/rf-token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });

  res.json({
    msg: 'Đăng nhập thành công!',
    access_token,
    user: { ...user._doc, password: '' },
  });
};
export function Pagination(req: Request) {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 4;
  let skip = (page - 1) * limit;
  return { page, limit, skip };
}
