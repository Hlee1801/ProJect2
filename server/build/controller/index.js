"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotiController = exports.CommentController = exports.ServiceController = exports.RoomController = exports.BookingController = exports.UserController = void 0;
const BookingController_1 = __importDefault(require("./BookingController"));
exports.BookingController = BookingController_1.default;
const RoomController_1 = __importDefault(require("./RoomController"));
exports.RoomController = RoomController_1.default;
const UserController_1 = __importDefault(require("./UserController"));
exports.UserController = UserController_1.default;
const ServiceController_1 = __importDefault(require("./ServiceController"));
exports.ServiceController = ServiceController_1.default;
const CommentController_1 = __importDefault(require("./CommentController"));
exports.CommentController = CommentController_1.default;
const NotiController_1 = __importDefault(require("./NotiController"));
exports.NotiController = NotiController_1.default;
