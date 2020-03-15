import { Router } from 'express';
import { Connection } from 'typeorm';
import { FollowsController } from '../controllers/followsController';

export function followRoutes(connection: Connection) {
  const router = Router();

  const followsController = new FollowsController(connection);

  router.get('/user/:userId/followers', followsController.getAllFollowers);

  router.get('/user/:userId/followed', followsController.getAllFollowed);

  router.post('/new', followsController.createFollow);

  router.delete('/:id', followsController.deleteFollow);

  return router;
}
