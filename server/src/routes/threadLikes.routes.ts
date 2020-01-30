import { Router } from 'express';
import { Connection } from 'typeorm';
import { CommentLikesController } from '../controllers/threadLikesController';

export function commentLikesRoutes(connection: Connection) {
  const router = Router();

  const commentLikesController = new CommentLikesController(connection);

  router.post('/new', commentLikesController.createCommentLike);

  router.delete('/:id', commentLikesController.deleteCommentLike);

  return router;
}
