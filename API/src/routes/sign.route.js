import { Router } from 'express';
import authenticate from '../controller/sign.auth.controller';

const signRoute = Router();

// signRoute.post('/auth/signup', authenticate.signUp);
signRoute.post('/auth/login', authenticate.logIN);


export default signRoute;