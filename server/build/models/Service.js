"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const serviceSchema = new mongoose_1.default.Schema({
    service_name: {
        type: String,
        require: true,
    },
    service_price: {
        type: Number,
        require: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Services', serviceSchema);
