import { Router } from 'express';
import { Connection } from 'typeorm';
import { userRoutes } from './user.routes';
import { postRoutes } from './post.routes';
import { userPreferencesRoutes } from './userPreferences.routes';
import { threadRoutes } from './threads.routes';
import { threadCommentRoutes } from './threadComments.routes';
import { followRoutes } from './follows.routes';

export function Routes(connection: Connection) {
  const router = Router();

  router.get('/', (req, res) => {
    res.send('Hello world');
  });

  router.use('/users', userRoutes(connection));
  router.use('/preferences', userPreferencesRoutes(connection));
  router.use('/posts', postRoutes(connection));
  router.use('/threads', threadRoutes(connection));
  router.use('/threads', threadRoutes(connection));
  router.use('/comments', threadCommentRoutes(connection));
  router.use('/follows', followRoutes(connection));

  return router;
}
