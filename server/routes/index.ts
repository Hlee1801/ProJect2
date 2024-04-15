import express from 'express';
import {
  UserController,
  RoomController,
  BookingController,
  ServiceController,
  CommentController,
  NotiController,
} from '../controller';
import { validRegister } from '../utils';
import { authenticate } from '../middleware';

const routes = express.Router();
export const initWebRoute = (app: any) => {
  //*User routes
  routes.post('/create-user', UserController.createUser);
  routes.get('/user', UserController.getAllUser);
  routes
    .route('/user/:id')
    .get(UserController.getUserById)
    .patch(UserController.updateUser)
    .delete(UserController.deleteUser);
  //*Auth routes
  routes.post('/login', UserController.login);
  routes.get('/logout', authenticate, UserController.logout);
  routes.post('/register', validRegister, UserController.createUser);
  routes.post('/active-account', UserController.activeAccount);
  routes.get('/rf-token', UserController.refreshToken);
  routes.post('/forgot-password', UserController.forgotPass);
  routes.put('/reset-password', UserController.resetPass);
  //*Hotel routes
  routes.route('/room').post(RoomController.createRoom).get(RoomController.getRoom);
  routes
    .route('/room/:id')
    .get(RoomController.getRoomById)
    .patch(RoomController.editRoom)
    .delete(RoomController.deleteRoom);
  //*Booking routes
  routes.post('/new-booking', BookingController.newBooking);
  routes.post('/active-booking', BookingController.activeBooking);
  routes.get('/get-all-booking', BookingController.getAllBooking);
  routes.get('/get-user-booking/:id', BookingController.getBookingByUser);
  routes.put('/change-booking-status/:id', BookingController.updateBookingStatus);
  routes.get('/get-room-booking/:id', BookingController.getBookingByRoom);
  routes.delete('/delete-booking/:id', BookingController.deleteBooking);
  routes.delete('/deleteAll-booking', BookingController.deleteAllBooking);
  routes.get('/valid-booking/:start_date&:end_date', BookingController.getBookingByDate);
  //*Service routes
  routes.route('/service').post(ServiceController.createService).get(ServiceController.getService);
  routes
    .route('/service/:id')
    .patch(ServiceController.editService)
    .delete(ServiceController.deleteService);
  //*Comment routes
  routes.post('/comment', authenticate, CommentController.createComment);
  routes.post('/reply', authenticate, CommentController.replyComment);
  routes
    .route('/comment/:id')
    .patch(authenticate, CommentController.updateComment)
    .delete(authenticate, CommentController.deleteComment)
    .get(CommentController.getComment);
  //*Notification route
  routes.route('/notification').post(NotiController.createNoti).get(NotiController.getNoti);
  routes.delete('/notification/:id', NotiController.deleteNoti);
  return app.use('/api', routes);
};
//validRegister,
