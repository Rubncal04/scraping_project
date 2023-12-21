import scrap from './scrap.js';

async function routes(app) {
  app
    .route('/')
    .get((req, res) => {
      res.status(200).send('HORUS BACKEND')
    });

  app
    .route('/boletin')
    .post(scrap);
}

export default routes