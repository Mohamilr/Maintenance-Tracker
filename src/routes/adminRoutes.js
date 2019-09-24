import { Router } from 'express';

// import controllers
import adminController from '../controller/admin.controller';
import authenticate from '../controller/sign.auth.controller'; 

const adminRoute = Router();

//all admin routes
// route to get all requests for admin  user
adminRoute.get('/requests/', authenticate.verify, adminController.getAllRequests);
// route to approve a request
adminRoute.put('/requests/:id/approve', authenticate.verify, adminController.approveARequest);
// route to disapprove a request
adminRoute.put('/requests/:id/disapprove', authenticate.verify, adminController.disapproveARequest);
// route to resolve a request
adminRoute.put('/requests/:id/resolve', authenticate.verify, adminController.resolveARequest);

// export route to index.js(server)
export default adminRoute;