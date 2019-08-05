import { Router } from 'express';
import adminController from '../controller/admin.controller';


const adminRoute = Router();

adminRoute.get('/requests/', adminController.getAllRequests);

export default adminRoute;