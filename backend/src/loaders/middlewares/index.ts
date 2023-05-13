import * as express from 'express';
import * as dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import config from '../../config.json';

export default async ({ app }: { app: express.Application }) => {
	app.enable('trust proxy');

	const isProd = config.state === 'production';
	dotenv.config();
	app.use(express.json());
	app.use(cors());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(bodyParser.raw());

	if (isProd) {
		app.use(compression());
		app.use(helmet());
	}
	console.log('Express Middlewares Init');
	return app;
};
