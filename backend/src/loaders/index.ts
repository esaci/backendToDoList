import * as express from 'express';
import expressLoader from './express';
import middlewares from './middlewares';
import routes from '../routes';

export default async ({ expressApp }: { expressApp: express.Express }) => {
	await expressLoader({ app: expressApp });
	await middlewares({ app: expressApp });
	await routes({ app: expressApp });
	console.log('Express Init!');
};
