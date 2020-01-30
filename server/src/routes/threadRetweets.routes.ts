import { Router } from 'express';
import { Connection } from 'typeorm';
import { CommentRetweetsController } from '../controllers/threadRetweetsController';

export function commentRetweetsRoutes(connection: Connection) {
  const router = Router();

  const commentRetweetsController = new CommentRetweetsController(connection);

  router.post('/new', commentRetweetsController.createCommentRetweet);

  router.delete('/:id', commentRetweetsController.deleteCommentRetweet);

  return router;
}
