import { Connection, Repository } from 'typeorm';
import { User } from '../models/users';
import { Response, Request } from 'express';

export class UserController {
  private repository: Repository<User>;
  constructor(connection: Connection) {
    this.repository = connection.getRepository(User);
  }

  public getAll = async (req: Request, res: Response) => {
    const user = await this.repository.find();
    return res.json(user);
  };
}
