//import router
import { Router } from 'express';

//import controller
import requestController from '../controller/requestController';

const requestRoute = Router();

//
requestRoute.get('/users/requests', requestController.allRequests)
requestRoute.get('/users/requests/:id', requestController.getsingleRequest)


//export requestRoute to index.js
export default requestRoute;
