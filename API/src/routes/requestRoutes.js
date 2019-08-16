// import router
import { Router } from 'express';


// import controllers
import requestController from '../controller/requestController';
import authenticate from '../controller/sign.auth.controller';

// configure route
const requestRoute = Router();

// all request route
requestRoute.get('/users/requests', authenticate.verify, requestController.allRequest);
requestRoute.get('/users/requests/:id', authenticate.verify, requestController.getsingleRequest)
requestRoute.post('/users/requests', authenticate.verify, requestController.addRequest)
requestRoute.put('/users/requests/:id',authenticate.verify, requestController.modifyARequest)

// export requestRoute to index.js
export default requestRoute;
