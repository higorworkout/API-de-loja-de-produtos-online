import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../infra/typeorm/reposities/UsersRepository";
import User from "../infra/typeorm/entities/User";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}
  public async execute({ id }: IRequest): Promise<User | undefined> {
      const usersRepository = getCustomRepository(UserRepository);

      const user = await usersRepository.findById(id);

    if(!user) {
      throw new AppError('Product don\'t found.')
    }
      return user;
  }
}


export default ShowUserService

