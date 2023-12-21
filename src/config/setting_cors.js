import cors from'cors';
import createError from'http-errors';

const BACKEND_WHITELIST = {
  'http://localhost:4021': true,
  'http://10.0.5.101:4021': true,
  'https://scrap-project.onrender.com': true, //PRODUCTION
};

const FRONTEND_WHITELIST = {
  'http://localhost:5173': true,
  'https://docs-horus-three.vercel.app': true, //PRODUCTION
};

const CORS_OPTION = {
  origin:  (origin, next) => {
    if ((BACKEND_WHITELIST[origin] || FRONTEND_WHITELIST[origin]) || !origin) {
      next(null, true);
    } else {
      next(createError(401, 'Not allowed by CORS'));
    }
  },
  maxAge: 86400,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Accept', 'Content-Type', 'authorization', 'Content-Disposition', 'Access-Control-Allow-Origin'],
};

function createCors(){
  return cors(CORS_OPTION);
}

export default createCors;
