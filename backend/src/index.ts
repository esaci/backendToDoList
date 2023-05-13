import express from 'express';
import config from './config.json';
import loaders from './loaders';
import http from 'http';
import * as socketIo from "socket.io";

async function startServer() {
	const env = config.state || 'development';
	const PORT = 8100;
	const app = express();
	const server = http.createServer(app);

	const io = new socketIo.Server(server);
	
	io.on("connection", (...params) => {
		console.log(params);
	  });

	await loaders({ expressApp: app });
	app.listen(PORT, () =>
		console.log(`
	🚀 Server ready at: ${config.back_end_url} with env: ${env}`),
	);
}

startServer();
