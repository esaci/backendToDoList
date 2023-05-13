import * as express from 'express';
import info from './info';
export default async ({ app }: { app: express.Express }) => {
	await info({ app });
	console.log('Express routes Init');
};
