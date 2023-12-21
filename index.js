import startApolloServer from './src/server.js';
const port = 3301;

async function startServer() {
  const { httpServer } = await startApolloServer();

  await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
  console.log(`Server listening on port ${port}`);
}

startServer().catch((err) => console.error(err));
