import { Router } from 'express';
import { Connection } from 'typeorm';
import { UserController } from '../controllers/userController';

export function userRoutes(connection: Connection) {
  const router = Router();

  const userController = new UserController(connection);

  router.get('/all', userController.getAll);

  router.get('/:id', userController.getById);

  router.post('/new', userController.createUser);

  router.put('/:id', userController.updateUser);

  router.delete('/:id', userController.deleteUser);

  return router;
}
