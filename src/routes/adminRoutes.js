import { Router } from 'express';

// import controllers
import adminController from '../controller/admin.controller';
import authenticate from '../controller/sign.auth.controller'; 

const adminRoute = Router();

//all admin routes
adminRoute.get('/requests/', authenticate.verify, adminController.getAllRequests);
adminRoute.put('/requests/:id/approve', authenticate.verify, adminController.approveARequest);
adminRoute.put('/requests/:id/disapprove', authenticate.verify, adminController.disapproveARequest);
adminRoute.put('/requests/:id/resolve', authenticate.verify, adminController.resolveARequest);

// export route to index.js(server)
export default adminRoute;