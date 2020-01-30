import { Connection, Repository } from 'typeorm';
import { CommentLikes } from '../models/commentLikes';
import { Response, Request } from 'express';

export class CommentLikesController {
  private repository: Repository<CommentLikes>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(CommentLikes);
  }

  public createCommentLike = async (req: Request, res: Response) => {
    const commentLike = this.repository.create({ ...req.body, user: req.body.userId, thread: req.body.threadId });
    try {
      await this.repository.save(commentLike);
      return res.json({ ...commentLike, status: 'Comment like added' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deleteCommentLike = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(req.params.id);
      return res.json({ status: 'Comment like deleted' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
