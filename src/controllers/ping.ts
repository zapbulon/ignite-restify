import { Server, Request, Response } from 'restify';
import { BaseController } from '@controllers/base';

export class PingController implements BaseController {
    public initialize(restify: Server): void {
        restify.get('/ping', (request: Request, response: Response) => response.send(200, 'pong'));
    }
}
