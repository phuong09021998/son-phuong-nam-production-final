const { server, express } = require('./app');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Services
require('./services/redis');
require('./services/mongoose');
require('./services/socketIO');

const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    express.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
