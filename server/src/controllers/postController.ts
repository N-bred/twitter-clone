import { Post } from '../models/posts';
import { Connection, Repository } from 'typeorm';
import { Response, Request } from 'express';

export class PostController {
  private repository: Repository<Post>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Post);
  }

  private modifyResponse(post: Post) {
    const { postLikes, postRetweets, postPics } = post;

    delete post.postLikes;
    delete post.postRetweets;
    delete post.postPics;

    return {
      ...post,
      threads: post.threads?.length,
      likes: postLikes?.length,
      retweets: postRetweets?.length,
      pics: postPics,
      user: { id: post.user?.id }
    };
  }

  public getAll = async (req: Request, res: Response) => {
    const posts = await this.repository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.threads', 'threads')
      .leftJoinAndSelect('post.postLikes', 'likes')
      .leftJoinAndSelect('post.postRetweets', 'retweets')
      .leftJoinAndSelect('post.postPics', 'pics')
      .leftJoinAndSelect('post.user', 'user')
      .getMany();

    if (posts) return res.json(posts.map(this.modifyResponse));

    return res.status(404).json({ status: 'There are not posts yet' });
  };

  public getById = async (req: Request, res: Response) => {
    const post = await this.repository
      .createQueryBuilder('post')
      .where('post.id = :id', { id: Number(req.params.id) })
      .leftJoinAndSelect('post.threads', 'threads')
      .leftJoinAndSelect('post.postLikes', 'likes')
      .leftJoinAndSelect('post.postRetweets', 'retweets')
      .leftJoinAndSelect('post.postPics', 'pics')
      .leftJoinAndSelect('post.user', 'user')
      .getOne();

    if (post) return res.json(this.modifyResponse(post));

    return res.status(404).json({ status: 'Post not found' });
  };

  public createPost = async (req: Request, res: Response) => {
    const post = this.repository.create({ ...req.body, user: req.body.userId });

    try {
      this.repository.save(post);
      return res.json({ ...post, status: 'Post created' });
    } catch (e) {
      console.log(e);

      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public updatePost = async (req: Request, res: Response) => {
    try {
      await this.repository.update(req.params.id, req.body);
      const post = this.repository.findOne(req.params.id);

      return res.json({ ...post, status: 'User updated' });
    } catch (e) {
      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    try {
      this.repository.delete(req.params.id);

      return res.json({ status: 'Post deleted' });
    } catch (e) {
      console.log(e);

      return res.sendStatus(500).json({ status: 'Server error' });
    }
  };
}
