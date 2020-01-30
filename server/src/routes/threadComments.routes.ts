import { Router } from 'express';
import { Connection } from 'typeorm';
import { ThreadsCommentsController } from '../controllers/threadCommentsController';

export function threadCommentRoutes(connection: Connection) {
  const router = Router();

  const threadsCommentsController = new ThreadsCommentsController(connection);

  router.get('/user/:userId', threadsCommentsController.getAllByUser);
  router.get('/thread/:threadId', threadsCommentsController.getAllByThread);
  router.get('/:id', threadsCommentsController.getById);

  router.post('/new', threadsCommentsController.createThread);

  router.put('/:id', threadsCommentsController.updateThread);

  router.delete('/:id', threadsCommentsController.deleteThread);

  return router;
}
