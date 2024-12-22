import AppError from "@shared/errors/AppError";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUser } from "../domain/models/IUser";
import { ICreateUser } from "../domain/models/ICreateUser";
import { inject, injectable } from "tsyringe";
import { IHashProvider } from "../provider/HashProvider/models/IHashProvider";


@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({name, email, password}: ICreateUser): Promise<IUser> {

      const emailExists = await this.usersRepository.findByEmail(email);

      if (emailExists) {
        throw new AppError('Email address already used.');
      }

      const hashedPasswd = await this.hashProvider.generateHash(password);

      const user = await this.usersRepository.create({
        name,
        email,
        password: hashedPasswd,
      });

      await this.usersRepository.save(user);

      return user
  }
}


export default CreateUserService
