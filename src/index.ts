import { Api } from '@app/api';

// Yeah, I'm a fan of .env files.
require('dotenv').config();

// A dummy wrapper to start the api for us
const server = new Api();
server.start(process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8080);
