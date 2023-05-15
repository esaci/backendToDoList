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

	let i = 0;

	app.get('/TestSequence', (req, res) => {
		// Établir une connexion persistante avec le client
		res.setHeader('Content-Type', 'text/event-stream');
		res.setHeader('Cache-Control', 'no-cache');
		res.setHeader('Connection', 'keep-alive');

		// Séquence de réponses
		let sequence = [
			{ "etape": 1, "message": "Initialisation..." },
			{ "etape": 2, "message": "Chargement des données..." },
			{ "etape": 3, "message": "Traitement en cours..." },
			{ "etape": 4, "message": "Finalisation..." },
			{ "etape": 5, "message": "Terminé !" }
		];
		// if (i > 10) {
		// i = 0;
		// return res.status(500).json({ message: 'Echec' });
		// }
		// Envoyer un objet de la séquence toutes les 2 secondes
		let index = 0;
		let intervalId = setInterval(() => {
			i++;
			if (index === sequence.length) {
				clearInterval(intervalId);
				res.end(); // Terminer la réponse lorsque la séquence est terminée
			} else {
				res.write(`data: ${JSON.stringify(sequence[index])}\n\n`); // Envoyer un objet de la séquence
				index++;
			}
		}, 2000);
	});

	app.get('/sequence', (req, res) => {
		// Séquence de réponses
		let sequence = [
			{ "etape": 1, "message": "Initialisation..." },
			{ "etape": 2, "message": "Chargement des données..." },
			{ "etape": 3, "message": "Traitement en cours..." },
			{ "etape": 4, "message": "Finalisation..." },
			{ "etape": 5, "message": "Terminé !" }
		];
		// if (i > 10) {
		// i = 0;
		// return res.status(500).json({ message: 'Echec' });
		// }
		// Envoyer un objet de la séquence toutes les 2 secondes
		res.status(200).json({ data: sequence });
	});

};
