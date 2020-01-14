import { Router } from 'express';
import { Connection } from 'typeorm';

export function Routes(connection: Connection) {
  const router = Router();

  router.get('/', (req, res) => {
    res.send('Hello world');
  });

  return router;
}
