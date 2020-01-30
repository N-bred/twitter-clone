import { Router } from 'express';
import { Connection } from 'typeorm';
import { userRoutes } from './user.routes';
import { postRoutes } from './post.routes';
import { userPreferencesRoutes } from './userPreferences.routes';
import { threadRoutes } from './threads.routes';
import { threadCommentRoutes } from './threadComments.routes';
import { followRoutes } from './follows.routes';
import { postLikesRoutes } from './postLikes.routes';
import { postRetweetsRoutes } from './postRetweets.routes';
import { postPicsRoutes } from './postPics.routes';
import { commentLikesRoutes } from './threadLikes.routes';
import { commentRetweetsRoutes } from './threadRetweets.routes';
import { commentPicsRoutes } from './threadPics.routes';

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
  router.use('/plikes', postLikesRoutes(connection));
  router.use('/clikes', commentLikesRoutes(connection));
  router.use('/pretweets', postRetweetsRoutes(connection));
  router.use('/cretweets', commentRetweetsRoutes(connection));
  router.use('/ppics', postPicsRoutes(connection));
  router.use('/cpics', commentPicsRoutes(connection));

  return router;
}
