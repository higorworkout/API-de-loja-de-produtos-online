import { Router } from 'express';
import {celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../../controllers/UsersController';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersAvatarController from '../../controllers/UsersAvatarController ';

const usersRouter = Router();

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.get("/", isAuthenticated,usersController.Index);
usersRouter.post("/", celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), usersController.create);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update);


export default usersRouter
