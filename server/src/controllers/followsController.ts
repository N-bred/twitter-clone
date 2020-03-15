import { Connection, Repository } from 'typeorm';
import { Follows } from '../models/follows';
import { Response, Request } from 'express';
import { User } from '../models/users';

export class FollowsController {
  private repository: Repository<Follows>;
  private userRepository: Repository<User>;
  constructor(connection: Connection) {
    this.repository = connection.getRepository(Follows);
    this.userRepository = connection.getRepository(User);
  }

  public getAllFollowers = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const followers = await this.userRepository
      .createQueryBuilder('user')
      .where(qb => {
        const subQuery = qb
          .subQuery()
          .select('follows.followerId')
          .from(Follows, 'follows')
          .where('follows.followed = :userId', { userId })
          .getQuery();

        return 'user.id IN ' + subQuery;
      })
      .getMany();

    return res.json(followers);
  };
  public getAllFollowed = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const followed = await this.userRepository
      .createQueryBuilder('user')
      .where(qb => {
        const subQuery = qb
          .subQuery()
          .select('follows.followed')
          .from(Follows, 'follows')
          .where('follows.follower = :userId', { userId })
          .getQuery();

        return 'user.id IN ' + subQuery;
      })
      .getMany();

    return res.json(followed);
  };

  public createFollow = async (req: Request, res: Response) => {
    const follow = this.repository.create(req.body);
    try {
      await this.repository.save(follow);
      return res.json({ ...follow, status: 'Follow added' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deleteFollow = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(req.params.id);
      return res.json({ status: 'Follow deleted' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
