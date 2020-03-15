import { Router } from 'express';
import { Connection } from 'typeorm';
import { PostPicsController } from '../controllers/postPicsController';

export function postPicsRoutes(connection: Connection) {
  const router = Router();

  const postPicsController = new PostPicsController(connection);

  router.post('/new', postPicsController.createPostPic);

  router.delete('/:id', postPicsController.deletePostPic);

  return router;
}
