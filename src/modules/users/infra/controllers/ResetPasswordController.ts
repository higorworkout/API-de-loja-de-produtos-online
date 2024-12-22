import { Request, Response } from 'express';
import ResetPasswordService from '../../services/ResetPasswordService';
import { container } from 'tsyringe';


export default class ResetPasswordController {

   public async create(req: Request, res: Response): Promise<Response> {
     const { token, password } = req.body;

     const resetPassword = container.resolve(ResetPasswordService);

      await resetPassword.execute({
        token,
        password
     })

     return res.status(204).json();
   }
}
