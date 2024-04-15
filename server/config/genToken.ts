import jwt from 'jsonwebtoken';
import { Response } from 'express';
export const generateActiveToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
    expiresIn: '5m',
  });
};

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: '15m',
  });
};
//antwort === answer
export const generateRefreshToken = (payload: object, antwort: Response) => {
  const refresh_token = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: '30d',
  });
  antwort.cookie('refreshtoken', refresh_token, {
    httpOnly: true,
    path: `/api/rf_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return refresh_token;
};
