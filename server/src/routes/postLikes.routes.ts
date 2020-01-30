import { Router } from 'express';
import { Connection } from 'typeorm';
import { PostLikesController } from '../controllers/postLikesController';

export function postLikesRoutes(connection: Connection) {
  const router = Router();

  const postLikesController = new PostLikesController(connection);

  router.post('/new', postLikesController.createPostLike);

  router.delete('/:id', postLikesController.deletePostLike);

  return router;
}
