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

  return router;
}
