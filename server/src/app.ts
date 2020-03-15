import * as express from 'express';
import * as bp from 'body-parser';

export class App {
  private app: express.Application;
  constructor(router: express.Router) {
    this.app = express();
    this.app.use(bp.json());
    this.app.use(bp.urlencoded({ extended: true }));
    this.app.use('/', router);
  }
  public listen(port: number) {
    this.app.listen(port, err => {
      if (err) throw err;

      console.log(`Server listening on port ${port}`);
    });
  }
}
