import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import UserRepository from "../infra/typeorm/reposities/UsersRepository";
import { injectable } from "tsyringe";


interface IRequest {
  user_id: string
}

@injectable()
class ShowProfileService {

  public async execute({ user_id } : IRequest): Promise<User> {
      const userRepository = getCustomRepository(UserRepository);

      const User = await userRepository.findById(user_id);

      if(!User) {
        throw new AppError('User not found');
      }

      return User;
  }
}


export default ShowProfileService

