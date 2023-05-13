import * as express from 'express';
import getInfos from './get';
import postInfos from './post';

export default async ({ app }: { app: express.Express }) => {
	await getInfos({ app });
	await postInfos({ app });
};
