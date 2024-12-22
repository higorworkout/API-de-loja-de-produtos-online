import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUserAuthenticated } from "../domain/models/IUserAuthenticated";
import { ICreateSession } from "../domain/models/ICreateSession";
import { IHashProvider } from "../provider/HashProvider/models/IHashProvider";


@injectable()
class CreateSessionsService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: ICreateSession): Promise<IUserAuthenticated> {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        throw new AppError('Incorrect email/password combination.', 401);
      }

      const passwdConfirmed = await this.hashProvider.compareHash(password, user.password);

      if(!passwdConfirmed) {
        throw new AppError('Incorrect email/password combination.', 401);
      }

      const token = sign({email: user.email, id: user.id}, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.expiresIn
      })

      return {
        user,
        token
      }
  }
}


export default CreateSessionsService
