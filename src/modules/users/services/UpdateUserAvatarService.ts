import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import UserRepository from "../infra/typeorm/reposities/UsersRepository";
import path from "path";
import uploadConfig from '@config/upload';
import fs from 'fs';
import DiskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";


interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
   constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName}: IRequest): Promise<User> {
      const storageProvider = new DiskStorageProvider();

      const user = await this.usersRepository.findById(user_id);

      if(!user) {
        throw new AppError('User not found.');
      }

     if(user.avatar) {
       await storageProvider.deleteFile(user.avatar)
     }

     const filename = await storageProvider.saveFile(avatarFileName);

     user.avatar = filename;

     await this.usersRepository.save(user);

     return user;
  }
}


export default UpdateUserAvatarService
