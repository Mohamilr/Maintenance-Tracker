import { Router } from 'express';
import adminController from '../controller/admin.controller';


const adminRoute = Router();

//all admin routes
adminRoute.get('/requests/', adminController.getAllRequests);
adminRoute.put('/requests/:id/approve', adminController.approveARequest);

export default adminRoute;