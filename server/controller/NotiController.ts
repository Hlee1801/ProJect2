import { Request, Response } from 'express';
import Notification from '../models/Notification';
const NotiController = {
  createNoti: async (req: Request, res: Response) => {
    try {
      const newNoti = await Notification.create({
        content: req.body.content,
      });
      if (newNoti) {
        res.status(200).json({
          code: 0,
          data: newNoti,
        });
      } else {
        res.status(400).send({ msg: 'error' });
      }
    } catch (error) {
      res.status(500).send({ msg: 'Server error' });
    }
  },
  getNoti: async (_req: Request, res: Response) => {
    try {
      const data = await Notification.find().sort('-createdAt');
      if (!data) res.status(404).send({ msg: 'not found' });
      res.json({ data });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },

  deleteNoti: async (req: Request, res: Response) => {
    try {
      const noti = await Notification.findByIdAndDelete(req.params.id);
      if (!noti) return res.status(404).send({ msg: 'Service not found' });
      res.json({ msg: 'delete success' });
    } catch (error: any) {
      res.status(500).json({ msg: 'Server error' });
    }
  },
};
export default NotiController;
