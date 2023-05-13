import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
	const apiKey = req.headers['x-api-key'];
	if (apiKey !== '123456789') {
		return res.status(401).json({ error: 'Unauthorized Request' });
	}
	next();
};
