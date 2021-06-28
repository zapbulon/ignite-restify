import { Server } from 'restify';

export interface BaseController {
    initialize(restify: Server): void;
}
