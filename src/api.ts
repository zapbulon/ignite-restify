import { Server } from 'restify';
import * as restify from 'restify';

import { Connection, createConnection } from 'typeorm';

import { CONTROLLERS } from '@controllers/index';

export class Api {
    private restify: Server;
    private static connection: Connection;

    public static async getConnection(): Promise<Connection> {
        if (Api.connection) {
            return Api.connection;
        }

        // This is all we need as the config is in ormconfig.js (and takes vars from .env)
        Api.connection = await createConnection();

        return Api.connection;
    }

    public start(port: number): void {
        this.restify = restify.createServer();
        this.restify.use(restify.plugins.queryParser());
        this.restify.use(restify.plugins.bodyParser());

        this.addControllers();

        // OK, this is random as shit.
        // It just inits a DB connection no matter if we need it or not
        // A middleware concept can be introduced despite the fact I kinda doubt in production
        // there are many endpoints that don't utilize the DB
        Api.getConnection();

        this.restify.listen(port, () => console.log(`Server is up & running on port ${port}`));
    }

    private addControllers(): void {
        // pretty much allows our "controllers" to register their routes with restify
        // so we can keep things a bit under control and grouped based on some logic
        CONTROLLERS.forEach(controller => controller.initialize(this.restify));
    }
}
