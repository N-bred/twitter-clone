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

  // public getAll = async (req: Request, res: Response) => {
  //   const user = await this.repository.find();
  //   return res.json(user);
  // };

  public getById = async (req: Request, res: Response) => {
    const user = await this.repository.findOne(req.params.id);

    if (!user) {
      return res.status(404).json({ status: 'User not found' });
    }

    return res.json(user);
  };

  public createUser = async (req: Request, res: Response) => {
    const user = this.repository.create(req.body);
    try {
      await this.repository.save(user);
      return res.json({ ...user, status: 'User created' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    try {
      await this.repository.update(req.body.id, req.body);
      const user = this.repository.findOne(req.body.id);

      return res.json({ ...user, status: 'User updated' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(req.body.id);
      return res.json({ status: 'User deleted' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
