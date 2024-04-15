"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../index");
const Comment_1 = __importDefault(require("../models/Comment"));
const CommentController = {
    createComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).send('No person');
        try {
            const { content, room_id, rating } = req.body;
            const newComment = new Comment_1.default(Object.assign({ user_id: req.user._id }, req.body));
            const data = Object.assign(Object.assign({}, newComment._doc), { user: req.user, createdAt: new Date().toISOString() });
            index_1.io.to(`${room_id}`).emit('createComment', data);
            yield newComment.save();
            return res.json({ status: 200, data: newComment });
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }),
    getComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield Comment_1.default.aggregate([
                {
                    $facet: {
                        totalData: [
                            {
                                $match: {
                                    room_id: new mongoose_1.default.Types.ObjectId(req.params.id),
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
                                    room_id: new mongoose_1.default.Types.ObjectId(req.params.id),
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
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    }),
    replyComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).send({ msg: 'invalid' });
        try {
            const { content, room_id, root, reply_user } = req.body;
            const newComment = new Comment_1.default({
                user: req.user._id,
                content,
                room_id,
                root,
                reply_user: reply_user._id,
            });
            yield Comment_1.default.findOneAndUpdate({ _id: root }, {
                $push: { reply: newComment._id },
            });
            const data = Object.assign(Object.assign({}, newComment._doc), { user: req.user, reply_user: reply_user, createdAt: new Date().toISOString() });
            index_1.io.to(`${room_id}`).emit('replyComment', data);
            yield newComment.save();
            return res.send({ newComment });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    updateComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).send({ msg: 'Invalid' });
        try {
            const { data } = req.body;
            const comment = yield Comment_1.default.findOneAndUpdate({
                _id: req.params.id,
                user: req.user.id,
            }, { content: data.content });
            if (!comment)
                return res.status(400).send({ msg: 'Comment error' });
            index_1.io.to(`${data.room_id}`).emit('updateComment', data);
            return res.json({ msg: 'Update OK' });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    deleteComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).send({ msg: 'Invalid' });
        try {
            const comment = yield Comment_1.default.findOneAndDelete({
                _id: req.params.id,
                $or: [{ user: req.user._id, room: req.body.room_id }],
            });
            if (!comment)
                return res.status(400).send({ msg: 'Comment error' });
            if (comment.root) {
                yield Comment_1.default.findOneAndUpdate({ _id: comment.root }, { $pull: { replyCM: comment._id } });
            }
            else {
                yield Comment_1.default.deleteMany({ _id: { $in: comment.reply } });
            }
            index_1.io.to(`${comment.room_id}`).emit('deleteComment', comment);
            return res.json({ msg: 'Delete OK' });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
};
exports.default = CommentController;
