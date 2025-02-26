import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import { pagination } from 'typeorm-pagination';
import rateLimiter from './middlewares/rateLimiter';


const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

// Pagination
app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

// Routes
app.use(routes);

// Errors celebrate
app.use(errors());

// Global Erros middleware
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(error)
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333! ');
})
