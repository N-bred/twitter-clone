import { Connection, Repository } from 'typeorm';
import { Threads } from '../models/threads';
import { Response, Request } from 'express';

export class ThreadsController {
  private repository: Repository<Threads>;
  constructor(connection: Connection) {
    this.repository = connection.getRepository(Threads);
  }

  public getAllByUser = async (req: Request, res: Response) => {
    const threads = await this.repository
      .createQueryBuilder('thread')
      .leftJoinAndSelect('thread.user', 'user')
      .where(`user.id = ${req.params.userId}`)
      .getMany();

    return res.json(threads);
  };
  public getAllByPost = async (req: Request, res: Response) => {
    const threads = await this.repository
      .createQueryBuilder('thread')
      .leftJoinAndSelect('thread.post', 'post')
      .where(`post.id = ${req.params.postId}`)
      .getMany();

    return res.json(threads);
  };

  public getById = async (req: Request, res: Response) => {
    const thread = await this.repository.findOne(req.params.id);

    if (!thread) {
      return res.status(404).json({ status: 'Thread not found' });
    }

    return res.json(thread);
  };

  public createThread = async (req: Request, res: Response) => {
    const thread = this.repository.create(req.body);
    try {
      await this.repository.save(thread);
      return res.json({ ...thread, status: 'Thread created' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public updateThread = async (req: Request, res: Response) => {
    try {
      await this.repository.update(req.params.id, req.body);
      const thread = this.repository.findOne(req.params.id);

      return res.json({ ...thread, status: 'Thread updated' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deleteThread = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(req.params.id);
      return res.json({ status: 'Thread deleted' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
