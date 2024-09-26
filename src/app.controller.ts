import { Request, Response } from 'express';
import { OK } from 'http-status';

export class Controller {
  public getHello(req: Request, res: Response): Response {
    return res
      .status(OK)
      .send(
        `Postman Documentation can be found <a href="https://documenter.getpostman.com/view/22684334/2sA3XSC2Jk">here</a>`,
      );
  }
}
