import { PingController } from '@controllers/ping';
import { UserController } from '@controllers/user';

export const CONTROLLERS = [
    new PingController(),
    new UserController(),
];
