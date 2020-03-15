import { Connection, Repository } from 'typeorm';
import { UserPreferences } from '../models/userPreferences';
import { Response, Request } from 'express';

export class UserPreferencesController {
  private repository: Repository<UserPreferences>;
  constructor(connection: Connection) {
    this.repository = connection.getRepository(UserPreferences);
  }

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userPref = await this.repository
      .createQueryBuilder('userPref')
      .innerJoinAndSelect('userPref.user', 'user')
      .where('user.id = :id', { id })
      .getOne();

    if (!userPref) {
      return res.status(404).json({ status: 'User not found' });
    }

    return res.json(userPref);
  };

  public createUserPreferences = async (req: Request, res: Response) => {
    const userPref = this.repository.create(req.body);
    try {
      await this.repository.save(userPref);
      return res.json({ ...userPref, status: 'User preferences created' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public updateUserPreferences = async (req: Request, res: Response) => {
    try {
      await this.repository.update(req.params.id, req.body);
      const userPref = this.repository.findOne(req.params.id);

      return res.json({ ...userPref, status: 'User preferences updated' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
