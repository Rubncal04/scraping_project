import cors from'cors';
import createError from'http-errors';

const BACKEND_WHITELIST = {
  'http://localhost:3301': true,
  'https://www.bkdssl.horussmartenergyapp.com': true, //PRODUCTION
  'https://www.bkddev.horussmartenergyapp.com': true, //DEVELOPMENT
  'https://www.hsestaging.horussmartenergyapp.com': true, //STAGING
  'connection_controller_header': true //ACTUAL CONTROLLER CONEXION
};

const FRONTEND_WHITELIST = {
  'http://localhost:3000': true,
  'https://www.horussmartenergyapp.com': true, //PRODUCTION
  'https://staging.horussmartenergyapp.com': true, //STAGING
  'https://develop.d2wv4bufcfkh3f.amplifyapp.com': true //DEVELOPMENT
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
