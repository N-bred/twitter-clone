import { Connection, Repository } from 'typeorm';
import { ThreadComments } from '../models/threadComments';
import { Response, Request } from 'express';

export class ThreadsCommentsController {
  private repository: Repository<ThreadComments>;
  constructor(connection: Connection) {
    this.repository = connection.getRepository(ThreadComments);
  }

  public getAllByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const comments = await this.repository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    return res.json(comments);
  };
  public getAllByThread = async (req: Request, res: Response) => {
    const { threadId } = req.params;
    const comments = await this.repository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.threads', 'thread')
      .where('thread.id = :threadId', { threadId })
      .getMany();

    return res.json(comments);
  };

  public getById = async (req: Request, res: Response) => {
    const comment = await this.repository.findOne(req.params.id);

    if (!comment) {
      return res.status(404).json({ status: 'Comment not found' });
    }

    return res.json(comment);
  };

  public createThread = async (req: Request, res: Response) => {
    const comment = this.repository.create(req.body);
    try {
      await this.repository.save(comment);
      return res.json({ ...comment, status: 'Comment created' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public updateThread = async (req: Request, res: Response) => {
    try {
      await this.repository.update(req.params.id, req.body);
      const comment = this.repository.findOne(req.params.id);

      return res.json({ ...comment, status: 'Comment updated' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deleteThread = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(req.params.id);
      return res.json({ status: 'Comment deleted' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
