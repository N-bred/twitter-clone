import { ConnectionOptions } from 'typeorm';

export const options: ConnectionOptions = {
  type: 'sqlite',
  database: __dirname + '/src/db/db.sqlite',
  entities: [__dirname + '/src/models/*.ts'],
  synchronize: true,
  logging: true
};
