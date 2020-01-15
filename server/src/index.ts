import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { App } from './app';
import { options } from '../dbconfig';
import { Routes } from './routes/routes';

createConnection(options).then((connection: Connection) => {
  const router = Routes(connection);
  const app = new App(router);

  app.listen(3000);
});
