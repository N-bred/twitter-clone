import { Connection, Repository } from 'typeorm';
import { PostPics } from '../models/postPics';
import { Response, Request } from 'express';

export class PostPicsController {
  private repository: Repository<PostPics>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(PostPics);
  }

  public createPostPic = async (req: Request, res: Response) => {
    const postPic = this.repository.create({ ...req.body, user: req.body.userId, post: req.body.postId });
    try {
      await this.repository.save(postPic);
      return res.json({ ...postPic, status: 'Post pic added' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deletePostPic = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(req.params.id);
      return res.json({ status: 'Post pic deleted' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
