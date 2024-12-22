import { Request, Response } from 'express';
import CreateSessionsService from '../../services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer'
import { container } from 'tsyringe';

export default class SessionsController {
   public async create(req: Request, res: Response): Promise<Response> {
      const { email, password } = req.body;

      const createSessions = container.resolve(CreateSessionsService)

      const user = await createSessions.execute({
        email, password
      });

      return res.json(instanceToInstance(user));
   }
}
