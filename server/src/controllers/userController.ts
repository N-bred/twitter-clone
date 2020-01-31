import { Connection, Repository } from 'typeorm';
import { User } from '../models/users';
import { Response, Request } from 'express';

export class UserController {
  private repository: Repository<User>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(User);
  }

  private modifyResponse(user: User) {
    const { followed, followers } = user;
    delete user.followers;

    return { ...user, following: followers?.length, followed: followed?.length };
  }

  public getAll = async (req: Request, res: Response) => {
    const users = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .leftJoinAndSelect('user.followers', 'followers')
      .leftJoinAndSelect('user.followed', 'followed')
      .getMany();

    if (!users) {
      return res.status(404).json({ status: 'Not users found' });
    }

    return res.json(users.map(this.modifyResponse));
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .leftJoinAndSelect('user.followers', 'followers')
      .leftJoinAndSelect('user.followed', 'followed')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      return res.status(404).json({ status: 'User not found' });
    }

    return res.json(this.modifyResponse(user));
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
