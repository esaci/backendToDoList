import * as express from 'express';

interface Todo {
	id: number;
	title: string;
	description: string;
	done: boolean;
}


const database: Todo[] = [
	{
		id: 1,
		title: 'Faire les courses',
		description: 'Acheter du pain, du lait et des oeufs',
		done: false,
	},
	{
		id: 2,
		title: 'Acheter un nouveau téléphone',
		description: 'Acheter un nouveau téléphone',
		done: false,
	},
	{
		id: 3,
		title: 'Acheter un nouveau PC',
		description: 'Acheter un nouveau PC',
		done: false,
	},];

export const getDatabase = async (res: express.Response) => {
	return res.status(200).json({ message: 'Voici le tableau des taches', data: database });
}

export const getDone = async (NomActivite: string, res: express.Response) => {
	const tache = database.find((tache) => tache.title === NomActivite);
	if (!tache) {
		return res.status(404).json({ message: 'Tache non trouvée' });
	}
	if (tache.done) {
		return res.status(400).json({ message: 'Tache déjà terminée' });
	}
	tache.done = true;
	return res.status(200).json({ message: 'Activité terminée', data: NomActivite });
}

export const postAdd = async (req: express.Request, res: express.Response) => {
	if ((!req.body.title) || (!req.body.description)) {
		return res.status(400).json({ message: 'Tache non valide' });
	}
	const newTodo: Todo = {
		id: database.length + 1,
		title: req.body.title,
		description: req.body.description,
		done: false,
	};
	database.push(newTodo);
	return res.status(200).json({ message: 'Tache ajoutée', data: newTodo });
}
