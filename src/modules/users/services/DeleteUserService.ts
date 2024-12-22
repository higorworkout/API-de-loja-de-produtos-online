import AppError from "@shared/errors/AppError";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  public async execute({ id }: IRequest): Promise<void> {

      const product = await this.usersRepository.findById(id);


    if(!product) {
      throw new AppError('Product don\'t found.')
    }

    await this.usersRepository.remove(product);
  }
}


export default DeleteUserService
