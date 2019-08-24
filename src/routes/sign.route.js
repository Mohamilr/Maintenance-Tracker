import { Router } from 'express';
import authenticate from '../controller/sign.auth.controller';

// configure route
const signRoute = Router();

// routes
// route to sign up
signRoute.post('/auth/signup', authenticate.signUp);
// route to login
signRoute.post('/auth/login', authenticate.logIN);

// export route to index.js(server)
export default signRoute;