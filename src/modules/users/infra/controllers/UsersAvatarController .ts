import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer'
import { container } from 'tsyringe';



export default class UsersAvatarController {
   public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename
    })
      return res.json(instanceToInstance(user));
   }
}
