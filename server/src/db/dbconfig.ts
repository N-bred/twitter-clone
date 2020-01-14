import { ConnectionOptions } from 'typeorm';

export const options: ConnectionOptions = {
  type: 'sqlite',
  database: __dirname + '/db/db.sqlite',
  entities: [__dirname + '/models/*.ts'],
  synchronize: true
};
