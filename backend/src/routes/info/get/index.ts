import * as express from 'express';
import { getDatabase } from '../../../service/info';
import authentification from '../../../loaders/authentification';

export default async ({ app }: { app: express.Application }) => {
	app.get('', async (_: express.Request, res: express.Response) => {
		return res.status(200).json({ message: 'Bienvenu sur le Backend de la ToDo List' });
	});
	app.get('/getList', async (_: express.Request, res: express.Response) => {
		return getDatabase(res);
	});
	app.get('/done/:NomActivite', async (req: express.Request, res: express.Response) => {
		return res.status(200).json({ message: 'Activité terminée', data: req.params.NomActivite });
	});
	app.get('/auth', authentification, async (_: express.Request, res: express.Response) => {
		return res.status(200).json({ message: 'Authentification réussie' });
	}
	);
};
