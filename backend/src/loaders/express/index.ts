import * as express from 'express';
import * as dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import authentification from '../authentification';
import config from '../../config.json';

export default async ({ app }: { app: express.Application }) => {
	app.get('/healtz', async (_: express.Request, res: express.Response) => {
		return res.status(200).send(new Date().toISOString());
	});
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
		app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
			authentification(req, res, next);
		});
	}
	return app;
};
