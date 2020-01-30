import { Connection, Repository } from 'typeorm';
import { CommentRetweets } from '../models/commentRetweets';
import { Response, Request } from 'express';

export class CommentRetweetsController {
  private repository: Repository<CommentRetweets>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(CommentRetweets);
  }

  public createCommentRetweet = async (req: Request, res: Response) => {
    const commentLike = this.repository.create({ ...req.body, user: req.body.userId, thread: req.body.threadId });
    try {
      await this.repository.save(commentLike);
      return res.json({ ...commentLike, status: 'Comment retweet added' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deleteCommentRetweet = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(req.params.id);
      return res.json({ status: 'Comment retweet deleted' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
