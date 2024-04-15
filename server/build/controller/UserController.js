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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const genToken_1 = require("../config/genToken");
const utils_1 = require("../utils");
const middleware_1 = require("../middleware");
const sendEmail_1 = require("../config/sendEmail");
const UserController = {
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fullName, email, password, gender, phoneNumber, avatar, address, role } = req.body;
            const userExist = yield User_1.default.findOne({ email });
            if (userExist)
                return res.status(400).send({ msg: 'Email already in use' });
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield User_1.default.create({
                fullName,
                email,
                password: passwordHash,
                gender,
                phoneNumber,
                avatar,
                address,
                role,
            });
            if (newUser) {
                res.status(200).json({
                    code: 0,
                    _id: newUser.id,
                    name: newUser.fullName,
                    // token: generateActiveToken(newUser._id),
                });
            }
            else {
                res.status(400).send({ msg: 'Error' });
            }
        }
        catch (e) {
            res.status(500).send({ msg: 'Internal Server Error' });
            console.log(e);
        }
    }),
    getAllUser: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.find().select('-password').sort('-createdAt');
            if (!user)
                return res.status(404).send({ msg: 'User not found' });
            res.json({ user });
        }
        catch (e) {
            res.status(500).send({ msg: 'Internal Server Error' });
            console.log(e);
        }
    }),
    getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.findById(req.params.id).select('-password');
            if (!user)
                return res.status(404).send({ msg: 'User not found' });
            res.json({ user });
        }
        catch (e) {
            res.status(500).send({ msg: 'Internal Server Error' });
            console.log(e);
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).send({ msg: 'Invalid' });
        try {
            const { fullName, avatar, phoneNumber, address } = req.body;
            const userUpdate = yield User_1.default.findOneAndUpdate({ _id: req.params.id }, { fullName, avatar, phoneNumber, address }, { new: true });
            res.json({ msg: 'update success', userUpdate });
            console.log(userUpdate);
        }
        catch (e) {
            res.status(500).send({ msg: 'Internal Server Error' });
            console.log(e);
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).send({ msg: 'Invalid' });
        try {
            const user = yield User_1.default.findByIdAndDelete(req.params.id);
            if (!user)
                return res.status(404).send({ msg: 'User not found' });
            res.json({ msg: 'delete success' });
        }
        catch (e) {
            res.status(500).send({ msg: 'Internal Server Error' });
            console.log(e);
        }
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fullName, email, password, gender, phoneNumber, address } = req.body;
            const hasUser = yield User_1.default.findOne({ email });
            if (hasUser)
                return res.status(400).send({ msg: 'Email đã được đăng ký' });
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            const newRegister = {
                fullName,
                email,
                password: passwordHash,
                gender,
                phoneNumber,
                address,
            };
            const active_token = (0, genToken_1.generateActiveToken)({ newRegister });
            const url = `${process.env.APP_URL}/active/${active_token}`;
            if ((0, utils_1.validateEmail)(email)) {
                yield (0, sendEmail_1.sendConfirmMail)(email, url, 'Xác thực tài khoản', fullName);
                return res.send({ msg: 'Success' });
            }
            res.json({
                status: 200,
                msg: 'Register success',
                data: newRegister,
                active_token,
            });
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield User_1.default.findOne({ email });
            if (!user)
                return res.status(400).send({ msg: 'Account not exist' });
            yield (0, middleware_1.handleUserLogin)(user, password, res);
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).send({ msg: 'Invalid' });
        try {
            res.clearCookie('refreshtoken', { path: '/api/rf-token' });
            yield User_1.default.findOneAndUpdate({ _id: req.user._id }, {
                rf_token: '',
            });
            return res.send('Đăng Xuất!');
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    }),
    refreshToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token)
                return res.status(400).send({ msg: 'Hãy đăng nhập ngay!' });
            const decoded = jsonwebtoken_1.default.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
            if (!decoded.id)
                return res.status(400).send({ msg: 'Hãy đăng nhập ngay!' });
            const user = yield User_1.default.findById(decoded.id).select('-password +rf_token');
            if (!user)
                return res.status(400).send({ msg: 'Tài khoản này không tồn tại' });
            if (rf_token !== user.rf_token)
                return res.status(400).send({ msg: 'Hãy đăng nhập ngay!' });
            const access_token = (0, genToken_1.generateAccessToken)({ id: user._id });
            const refresh_token = (0, genToken_1.generateRefreshToken)({ id: user._id }, res);
            yield User_1.default.findOneAndUpdate({ _id: user._id }, {
                rf_token: refresh_token,
            });
            res.json({ access_token, user });
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    }),
    activeAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { active_token } = req.body;
            const decoded = jsonwebtoken_1.default.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`);
            const { newRegister } = decoded;
            if (!newRegister)
                return res.status(400).send({ msg: 'Invalid ' });
            const user = yield User_1.default.findOne({ email: newRegister.email });
            if (user)
                return res.status(400).json({ msg: 'Tài khoản đã tồn tại' });
            const new_user = new User_1.default(newRegister);
            yield new_user.save();
            res.json({ msg: 'Kích hoạt tài khoản thành công' });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ msg: error.message });
        }
    }),
    forgotPass: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            if (Object.keys(req.body).length === 0)
                return res.status(400).send({ msg: 'Error' });
            const user = yield User_1.default.findOne({ email });
            if (!user)
                return res.status(400).send({ msg: 'Tài khoản không tồn tại' });
            return res.status(200).json({
                msg: 'Thành công',
                id: user._id,
            });
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    }),
    resetPass: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password, id } = req.body;
            const passwordHash = yield bcrypt_1.default.hash(password, 12);
            if (!id)
                return res.status(400).send({ msg: 'Invalid' });
            yield User_1.default.findOneAndUpdate({ _id: id }, {
                password: passwordHash,
            });
            res.send({ msg: 'Success' });
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    }),
};
exports.default = UserController;
