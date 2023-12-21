import express from 'express';
import http from 'http';
import createCors from './config/setting_cors.js';
import routes from './app/routes.js';

async function startApolloServer() {
  const app = express();
  app.use(express.json({ limit: '10mb', extended: true }))
  app.use(express.urlencoded({ limit: '10mb', extended: true }))
  app.use(createCors());
  const httpServer = http.createServer(app);
  await routes(app)

  return { httpServer, app }
}

export default startApolloServer;