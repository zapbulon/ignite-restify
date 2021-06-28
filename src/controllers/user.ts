import { Server, Request, Response } from 'restify';
import { BadRequestError } from 'restify-errors';

import { BaseController } from '@controllers/base';
import { User } from '@models/user';

export class UserController implements BaseController {
    public initialize(restify: Server): void {
        // OK, this is clearly REST. At some point we kinda have to decide
        // whether we're gonna do stuff like GraphQL or stick with good'ol
        // pure REST. If we do the latter it's kinda important to come up with
        // response structure (success or not) and stick with it.

        restify.get('/users', this.list.bind(this));
        restify.get('/users/:id', this.get.bind(this));
    }

    private async list(request: Request, response: Response): Promise<void> {
        // EZPZ ... well, ok, not much ging on here, but ... come, on. It's TypeORM
        response.send(await User.find({
            order: { username: "ASC" },
            select: ["id", "username", "email", "firstName", "lastName"]
        }));
    }

    private async get(request: Request, response: Response): Promise<void> {
        try {
            const user = await User.findOne(request.params.id,
                { select: ["id", "username", "email", "firstName", "lastName"] }
            );

            response.send(user ? 200 : 404, user);
        } catch (e) {
            response.send(new BadRequestError(e.message));
        }
    }
}
