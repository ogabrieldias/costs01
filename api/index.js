const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Export a handler function compatible with Vercel serverless functions
module.exports = (req, res) => {
  server(req, res);
};
