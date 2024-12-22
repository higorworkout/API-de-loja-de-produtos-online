import AppError from "@shared/errors/AppError";
import {isAfter, addHours} from 'date-fns';
import { hash } from 'bcryptjs';
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUserTokensRepository } from "../domain/repositories/IUserTokensRepository";

interface IRequest {
  token: string;
  password: string;
}




@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ){}

  public async execute({ token, password}: IRequest): Promise<void> {

      const userToken = await this.userTokensRepository.findByToken(token);

      if(!userToken) {
        throw new AppError('User token does not exists.');
      }


      const user = await this.usersRepository.findById(userToken.user_id);

      if(!user) {
        throw new AppError('User does not exists.');
      }


      const tokenCreateAt = userToken.create_at;
      const compareDate = addHours(tokenCreateAt, 2);

      if (isAfter(Date.now(), compareDate)) {
        throw new AppError('Token expired.');
      }


      user.password = await hash(password, 8);

      await this.usersRepository.save(user); 
  }
}


export default ResetPasswordService;
