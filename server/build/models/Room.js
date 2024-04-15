"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roomSchema = new mongoose_1.default.Schema({
    room_name: {
        type: String,
        require: true,
    },
    room_type: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    photo: {
        type: [String],
    },
    room_price: {
        type: Number,
    },
    rating: {
        type: Number,
        min: 0,
        max: 6,
    },
    cheap: {
        type: String,
    },
    desc: {
        type: String,
    },
    featured: {
        type: [String],
        default: false,
    },
    room: { type: mongoose_1.default.Types.ObjectId, ref: 'Booking' },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Room', roomSchema);
