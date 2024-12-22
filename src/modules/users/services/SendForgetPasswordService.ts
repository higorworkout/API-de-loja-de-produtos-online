import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../infra/typeorm/reposities/UsersRepository";
import UserTokenRepository from "../infra/typeorm/reposities/UsersTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from 'path';
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUserTokensRepository } from "../domain/repositories/IUserTokensRepository";

interface IRequest {
  email: string;
}




@injectable()
class SendForgetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ){}


  public async execute({email}: IRequest): Promise<void> {

      const user = await this.usersRepository.findByEmail(email);

      if(!user) {
        throw new AppError('User does not exists.');
      }

      const { token } = await this.userTokensRepository.generate(user.id)

      const forgotPasswordTemplate = path.resolve(__dirname, '..','views', 'forgot_password.hbs')

      await EtherealMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[API Vendas] Recuperação de Senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
          }
        }
      })

  }
}


export default SendForgetPasswordService;
