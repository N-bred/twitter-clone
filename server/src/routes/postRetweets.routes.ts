import { Router } from 'express';
import { Connection } from 'typeorm';
import { PostRetweetsController } from '../controllers/postRetweetsController';

export function postRetweetsRoutes(connection: Connection) {
  const router = Router();

  const postRetweetsController = new PostRetweetsController(connection);

  router.post('/new', postRetweetsController.createPostRetweet);

  router.delete('/:id', postRetweetsController.deletePostRetweet);

  return router;
}
