import { Router } from 'express';
import { Connection } from 'typeorm';
import { userRoutes } from './user.routes';
import { postRoutes } from './post.routes';

export function Routes(connection: Connection) {
  const router = Router();

  router.get('/', (req, res) => {
    res.send('Hello world');
  });

  router.use('/users', userRoutes(connection));
  router.use('/posts', postRoutes(connection));

  return router;
}
