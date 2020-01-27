import { Router } from 'express';
import { Connection } from 'typeorm';
import { PostController } from '../controllers/postController';

export function postRoutes(connection: Connection) {
  const router = Router();

  const postController = new PostController(connection);

  router.get('/all', postController.getAll);

  router.get('/:id', postController.getById);

  router.post('/new', postController.createPost);

  router.put('/:id', postController.updatePost);

  router.delete('/:id', postController.deletePost);

  return router;
}
