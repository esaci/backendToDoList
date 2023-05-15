import * as express from 'express';
import { getDatabase, getDone, postAdd } from '../../../service/info';

export default async ({ app }: { app: express.Express }) => {
	app.post('/add', async (req: express.Request, res: express.Response) => {
		console.log('requete pour add', req.body.title);
		await postAdd(req, res);
	});
};