import { Connection, Repository } from 'typeorm';
import { PostRetweets } from '../models/postRetweets';
import { Response, Request } from 'express';

export class PostRetweetsController {
  private repository: Repository<PostRetweets>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(PostRetweets);
  }

  public createPostRetweet = async (req: Request, res: Response) => {
    const postLike = this.repository.create({ ...req.body, user: req.body.userId, post: req.body.postId });
    try {
      await this.repository.save(postLike);
      return res.json({ ...postLike, status: 'Post retweet added' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deletePostRetweet = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(req.params.id);
      return res.json({ status: 'Post retweet deleted' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
