import { Router } from 'express';
import { Connection } from 'typeorm';
import { CommentPicsController } from '../controllers/threadPicsController';

export function commentPicsRoutes(connection: Connection) {
  const router = Router();

  const commentPicsController = new CommentPicsController(connection);

  router.post('/new', commentPicsController.createCommentPic);

  router.delete('/:id', commentPicsController.deleteCommentPic);

  return router;
}
