import { Connection, Repository } from 'typeorm';
import { CommentPics } from '../models/commentPics';
import { Response, Request } from 'express';

export class CommentPicsController {
  private repository: Repository<CommentPics>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(CommentPics);
  }

  public createCommentPic = async (req: Request, res: Response) => {
    const commentPic = this.repository.create({ ...req.body, user: req.body.userId, thread: req.body.threadId });
    try {
      await this.repository.save(commentPic);
      return res.json({ ...commentPic, status: 'Comment pic added' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deleteCommentPic = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(req.params.id);
      return res.json({ status: 'Comment pic deleted' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
