// import router
import { Router } from 'express';


// import controllers
import requestController from '../controller/requestController';
import authenticate from '../controller/sign.auth.controller';

// configure route
const requestRoute = Router();

// all request route
// route to get requests of a loged in user
requestRoute.get('/users/requests/:id/all', authenticate.verify, requestController.allRequest);
// route to get a single request
requestRoute.get('/users/requests/:id', authenticate.verify, requestController.getsingleRequest)
// route to post a request
requestRoute.post('/users/requests', authenticate.verify, requestController.addRequest)
// route to modify a request
requestRoute.put('/users/requests/:id',authenticate.verify, requestController.modifyARequest)

// export requestRoute to index.js
export default requestRoute;
