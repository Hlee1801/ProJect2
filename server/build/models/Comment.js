"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    user_id: { type: mongoose_1.default.Types.ObjectId, ref: 'User' },
    room_id: { type: mongoose_1.default.Types.ObjectId, ref: 'Room' },
    content: { type: String, require: true },
    reply: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Comment' }],
    reply_user: { type: mongoose_1.default.Types.ObjectId, ref: 'User' },
    root: { type: mongoose_1.default.Types.ObjectId, ref: 'Comment' },
    rating: { type: Number, max: 5 }
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Comment', commentSchema);
