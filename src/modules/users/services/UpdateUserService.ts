import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../infra/typeorm/reposities/UsersRepository";
import User from "../infra/typeorm/entities/User";
import { injectable } from "tsyringe";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class UpdateProductService {
  public async execute({ name, email, password }: IRequest) {
      const userRepository = getCustomRepository(UserRepository);

      const user = await userRepository.findByEmail(email);

    if(!user) {
      throw new AppError('User don\'t found.')
    }


      user.name = name;
      user.email = email;
      user.password = password;

      await userRepository.save(user);

      return {
        name: user.name,
        email: user.email,
        message: "Usuario atualizado com sucesso"
      };
  }
}


export default UpdateProductService
