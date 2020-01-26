import { Router } from 'express';
import { Connection } from 'typeorm';
import { UserController } from '../controllers/userController';

export function Routes(connection: Connection) {
  const router = Router();

  const userController = new UserController(connection);

  router.get('/', (req, res) => {
    res.send('Hello world');
  });

  router.get('/users', userController.getAll);

  router.get('/users/:id', userController.getById);

  router.post('/new/user', userController.createUser);

  router.put('/users', userController.updateUser);

  router.delete('/users', userController.deleteUser);

  return router;
}
