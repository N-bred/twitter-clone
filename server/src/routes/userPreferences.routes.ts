import { Router } from 'express';
import { Connection } from 'typeorm';
import { UserPreferencesController } from '../controllers/userPreferencesController';

export function userPreferencesRoutes(connection: Connection) {
  const router = Router();

  const userPreferencesController = new UserPreferencesController(connection);

  router.get('/user/:id', userPreferencesController.getById);

  router.post('/new', userPreferencesController.createUserPreferences);

  router.put('/:id', userPreferencesController.updateUserPreferences);

  return router;
}
