import { Router } from 'express';
import { Connection } from 'typeorm';
import { ThreadsController } from '../controllers/threads.controller';

export function threadRoutes(connection: Connection) {
  const router = Router();

  const threadsController = new ThreadsController(connection);

  router.get('/user/:userId', threadsController.getAllByUser);
  router.get('/post/:postId', threadsController.getAllByPost);
  router.get('/:id', threadsController.getById);

  router.post('/new', threadsController.createThread);

  router.put('/:id', threadsController.updateThread);

  router.delete('/:id', threadsController.deleteThread);

  return router;
}
