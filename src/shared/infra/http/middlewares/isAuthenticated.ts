import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth'

interface ITokenPayload {
  email: string;
  id: string;
  iat: number;
  exp: number;
}
export default async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<NextFunction | void >{
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = await verify(token, authConfig.jwt.secret);
    const { id, email } = decodeToken as ITokenPayload;

    request.user = {
      id,
      email
    }

    return next();
  } catch(e) {
    throw new AppError('Invalid token JWT.')
  }
}
