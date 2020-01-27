import { Connection, Repository } from 'typeorm';
import { User } from '../models/users';
import { Response, Request } from 'express';

export class UserController {
  private repository: Repository<User>;
  constructor(connection: Connection) {
    this.repository = connection.getRepository(User);
  }

  public getAll = async (req: Request, res: Response) => {
    // const users = await this.repository.find();

    const users = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .getMany();

    return res.json(
      users.map(arr => {
        delete arr.password;
        delete arr.email;

        return arr;
      })
    );
  };

  public getById = async (req: Request, res: Response) => {
    const user = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .where(`user.id = ${req.params.id}`)
      .getOne();

    if (!user) {
      return res.status(404).json({ status: 'User not found' });
    }

    delete user.password;
    delete user.email;

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
      await this.repository.update(req.params.id, req.body);
      const user = this.repository.findOne(req.params.id);

      return res.json({ ...user, status: 'User updated' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(req.params.id);
      return res.json({ status: 'User deleted' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
