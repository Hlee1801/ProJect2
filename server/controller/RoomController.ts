import { Request, Response } from 'express';
import Room from '../models/Room';
import { IReqAuth } from '../utils';
import { Pagination } from '../middleware';
import Booking from '../models/Booking';
import mongoose from 'mongoose';
const RoomController = {
  createRoom: async (req: IReqAuth, res: Response) => {
    // if (!req.user) return res.status(400).send({ msg: 'Invalid' });
    // if (req.user.role !== 'admin') return res.status(400).send({ msg: 'no permision' });
    try {
      const { room_name, room_type, location, photo, room_price, rating, desc, featured } =
        req.body;
      const isExist = await Room.findOne({ room_name });
      if (isExist) return res.status(500).send({ msg: 'Room already exist' });
      const newRoom = await Room.create({
        ...req.body,
      });
      if (newRoom) {
        res.status(200).json({
          data: newRoom,
        });
      } else {
        res.status(400).send({ msg: 'error' });
      }
    } catch (error) {
      res.status(500).send({ msg: 'Server error' });
      console.log(error);
    }
  },
  getRoom: async (_req: Request, res: Response) => {
    try {
      const data = await Room.find().sort('-createdAt');
      if (!data) res.status(404).send({ msg: 'not found' });
      res.json({ data });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  getRoomById: async (req: Request, res: Response) => {
    try {
      const room = await Room.findById(req.params.id);
      if (!room) return res.status(404).send({ msg: 'Not found' });
      res.json({ room });
    } catch (error: any) {
      res.status(500).send({ msg: 'Internal server error' });
    }
  },
  editRoom: async (req: Request, res: Response) => {
    try {
      const { room_name, room_type, location, photo, room_price, rating, desc, featured } =
        req.body;
      const updateRoom = await Room.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...req.body,
        },
        { new: true },
      );
      res.json({ msg: 'update success', updateRoom });
    } catch (err: any) {
      return res.status(500).send({ msg: 'Sever error' });
    }
  },
  deleteRoom: async (req: Request, res: Response) => {
    try {
      const hotel = await Room.findByIdAndDelete(req.params.id);
      if (!hotel) return res.status(404).send({ msg: 'Not Found' });
      res.json({ msg: 'delete success' });
    } catch (error: any) {
      res.status(500).json({ msg: 'Server error' });
    }
  },
  // getRoomByBooking: async (req: Request, res: Response) => {
  //   try {
  //    const data=await Room.aggregate([{
  //     $facet:{
  //       result:[{
  //         $match:{
  //           booking:new mongoose.Types.ObjectId(req.params.id),
  //           start_date:
  //         }
  //       }]
  //     }
  //    }])
  //   } catch (e: any) {
  //     return res.json({ status: 500, msg: 'Internal Server Error' });
  //   }
  // },
};
export default RoomController;
