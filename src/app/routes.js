import scrap from './scrap.js';

async function routes(app) {
  app
    .route('/')
    .get((req, res) => {
      res.status(200).send('HORUS BACKEND')
    });

  app
    .route('/boletin')
    .post((req, res) => {
      scrap(req, res);
    });
}

export default routes