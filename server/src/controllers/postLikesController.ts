import { Connection, Repository } from 'typeorm';
import { PostLikes } from '../models/postLikes';
import { Response, Request } from 'express';

export class PostLikesController {
  private repository: Repository<PostLikes>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(PostLikes);
  }

  public createPostLike = async (req: Request, res: Response) => {
    const postLike = this.repository.create({ ...req.body, user: req.body.userId, post: req.body.postId });
    try {
      await this.repository.save(postLike);
      return res.json({ ...postLike, status: 'Post like added' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deletePostLike = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(req.params.id);
      return res.json({ status: 'Post like deleted' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
