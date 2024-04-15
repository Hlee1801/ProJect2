import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { io } from '../index';
import Comment from '../models/Comment';
import { IReqAuth } from '../utils';
import { Pagination } from '../middleware';
const CommentController = {
  createComment: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).send('No person');
    try {
      const { content, room_id, rating } = req.body;
      const newComment = new Comment({ user_id: req.user._id, ...req.body });
      const data = {
        ...newComment._doc,
        user: req.user,
        createdAt: new Date().toISOString(),
      };
      io.to(`${room_id}`).emit('createComment', data);
      await newComment.save();
      return res.json({ status: 200, data: newComment });
    } catch (error: any) {
      return res.status(500).send(error);
    }
  },
  getComment: async (req: Request, res: Response) => {
    try {
      const data = await Comment.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  room_id: new mongoose.Types.ObjectId(req.params.id),
                  root: { $exists: false },
                  reply_user: { $exists: false },
                },
              },
              {
                $lookup: {
                  from: 'users',
                  let: { user_id: '$user_id' },
                  pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                    { $project: { fullName: 1, avatar: 1 } },
                  ],
                  as: 'user',
                },
              },
              { $unwind: '$user' },
              {
                $lookup: {
                  from: 'comments',
                  let: { cm_id: '$reply' },
                  pipeline: [
                    { $match: { $expr: { $in: ['$_id', '$$cm_id'] } } },
                    {
                      $lookup: {
                        from: 'users',
                        let: { user_id: '$user_id' },
                        pipeline: [
                          { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                          { $project: { fullName: 1, avatar: 1 } },
                        ],
                        as: 'user',
                      },
                    },
                    { $unwind: '$user' },
                    {
                      $lookup: {
                        from: 'users',
                        let: { user_id: '$reply_user' },
                        pipeline: [
                          { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                          { $project: { name: 1, avatar: 1 } },
                        ],
                        as: 'reply_user',
                      },
                    },
                    { $unwind: '$reply_user' },
                  ],
                  as: 'replyCM',
                },
              },
              { $sort: { createdAt: -1 } },
            ],
            totalCount: [
              {
                $match: {
                  room_id: new mongoose.Types.ObjectId(req.params.id),
                  root: { $exists: false },
                  reply_user: { $exists: false },
                },
              },
              { $count: 'count' },
            ],
          },
        },
        {
          $project: {
            count: { $arrayElemAt: ['$totalCount.count', 0] },
            totalData: 1,
          },
        },
      ]);
      const comments = data[0].totalData;

      return res.json({ comments });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  replyComment: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).send({ msg: 'invalid' });
    try {
      const { content, room_id, root, reply_user } = req.body;
      const newComment = new Comment({
        user: req.user._id,
        content,
        room_id,
        root,
        reply_user: reply_user._id,
      });
      await Comment.findOneAndUpdate(
        { _id: root },
        {
          $push: { reply: newComment._id },
        },
      );
      const data = {
        ...newComment._doc,
        user: req.user,
        reply_user: reply_user,
        createdAt: new Date().toISOString(),
      };
      io.to(`${room_id}`).emit('replyComment', data);

      await newComment.save();
      return res.send({ newComment });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateComment: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).send({ msg: 'Invalid' });
    try {
      const { data } = req.body;
      const comment = await Comment.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.id,
        },
        { content: data.content },
      );
      if (!comment) return res.status(400).send({ msg: 'Comment error' });
      io.to(`${data.room_id}`).emit('updateComment', data);
      return res.json({ msg: 'Update OK' });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteComment: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).send({ msg: 'Invalid' });
    try {
      const comment = await Comment.findOneAndDelete({
        _id: req.params.id,
        $or: [{ user: req.user._id, room: req.body.room_id }],
      });
      if (!comment) return res.status(400).send({ msg: 'Comment error' });
      if (comment.root) {
        await Comment.findOneAndUpdate({ _id: comment.root }, { $pull: { replyCM: comment._id } });
      } else {
        await Comment.deleteMany({ _id: { $in: comment.reply } });
      }
      io.to(`${comment.room_id}`).emit('deleteComment', comment);
      return res.json({ msg: 'Delete OK' });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
export default CommentController;
