"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const utils_1 = require("../utils");
const middleware_1 = require("../middleware");
const routes = express_1.default.Router();
const initWebRoute = (app) => {
    //*User routes
    routes.post('/create-user', controller_1.UserController.createUser);
    routes.get('/user', controller_1.UserController.getAllUser);
    routes
        .route('/user/:id')
        .get(controller_1.UserController.getUserById)
        .patch(controller_1.UserController.updateUser)
        .delete(controller_1.UserController.deleteUser);
    //*Auth routes
    routes.post('/login', controller_1.UserController.login);
    routes.get('/logout', middleware_1.authenticate, controller_1.UserController.logout);
    routes.post('/register', utils_1.validRegister, controller_1.UserController.createUser);
    routes.post('/active-account', controller_1.UserController.activeAccount);
    routes.get('/rf-token', controller_1.UserController.refreshToken);
    routes.post('/forgot-password', controller_1.UserController.forgotPass);
    routes.put('/reset-password', controller_1.UserController.resetPass);
    //*Hotel routes
    routes.route('/room').post(controller_1.RoomController.createRoom).get(controller_1.RoomController.getRoom);
    routes
        .route('/room/:id')
        .get(controller_1.RoomController.getRoomById)
        .patch(controller_1.RoomController.editRoom)
        .delete(controller_1.RoomController.deleteRoom);
    //*Booking routes
    routes.post('/new-booking', controller_1.BookingController.newBooking);
    routes.post('/active-booking', controller_1.BookingController.activeBooking);
    routes.get('/get-all-booking', controller_1.BookingController.getAllBooking);
    routes.get('/get-user-booking/:id', controller_1.BookingController.getBookingByUser);
    routes.put('/change-booking-status/:id', controller_1.BookingController.updateBookingStatus);
    routes.get('/get-room-booking/:id', controller_1.BookingController.getBookingByRoom);
    routes.delete('/delete-booking/:id', controller_1.BookingController.deleteBooking);
    routes.delete('/deleteAll-booking', controller_1.BookingController.deleteAllBooking);
    routes.get('/valid-booking/:start_date&:end_date', controller_1.BookingController.getBookingByDate);
    //*Service routes
    routes.route('/service').post(controller_1.ServiceController.createService).get(controller_1.ServiceController.getService);
    routes
        .route('/service/:id')
        .patch(controller_1.ServiceController.editService)
        .delete(controller_1.ServiceController.deleteService);
    //*Comment routes
    routes.post('/comment', middleware_1.authenticate, controller_1.CommentController.createComment);
    routes.post('/reply', middleware_1.authenticate, controller_1.CommentController.replyComment);
    routes
        .route('/comment/:id')
        .patch(middleware_1.authenticate, controller_1.CommentController.updateComment)
        .delete(middleware_1.authenticate, controller_1.CommentController.deleteComment)
        .get(controller_1.CommentController.getComment);
    //*Notification route
    routes.route('/notification').post(controller_1.NotiController.createNoti).get(controller_1.NotiController.getNoti);
    routes.delete('/notification/:id', controller_1.NotiController.deleteNoti);
    return app.use('/api', routes);
};
exports.initWebRoute = initWebRoute;
//validRegister,
