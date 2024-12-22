import { Request, Response } from 'express';
import SendForgetPasswordService from '../../services/SendForgetPasswordService';
import { container } from 'tsyringe';


export default class ForgotPasswordController {

   public async create(req: Request, res: Response): Promise<Response> {
     const { email } = req.body;

     const sendForgotPasswordEmail = container.resolve(SendForgetPasswordService);

      await sendForgotPasswordEmail.execute({
      email
     })

     return res.status(204).json();
   }
}
