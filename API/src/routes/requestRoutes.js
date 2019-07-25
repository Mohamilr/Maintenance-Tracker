//import router
import { Router } from 'express';

//import controller
import requestController from '../controller/requestController';

const requestRoute = Router();

// all request route
requestRoute.get('/users/requests', requestController.allRequest);
requestRoute.get('/users/requests/:id', requestController.getsingleRequest)
requestRoute.post('/users/requests', requestController.addRequest)
requestRoute.put('/users/requests/:id', requestController.modifyARequest)

//export requestRoute to index.js
export default requestRoute;
