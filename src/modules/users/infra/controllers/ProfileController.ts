import { Request, Response } from 'express';
import UpdateProfileService from '../../services/UpdateProfileService';
import ShowProfileService from '../../services/ShowProfileService';
import { instanceToInstance } from 'class-transformer'
import { container } from 'tsyringe';


export default class ProfileController {
   public async show(req: Request, res: Response): Promise<Response> {
      const showProfile = new ShowProfileService()
      const user_id = req.user.id;

      const user = await showProfile.execute({ user_id });

      return res.json();
   }

   public async update(req: Request, res: Response): Promise<Response> {
     const user_id = req.user.id;
     const { name, email, password, old_password} = req.body;

     const updateProfile = container.resolve(UpdateProfileService);

     const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
     })

     return res.json(instanceToInstance(user))
   }
}
