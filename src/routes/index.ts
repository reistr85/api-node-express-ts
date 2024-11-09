import { Router }from 'express';
import { categoriesRoutes } from './categories.routes';
// import { employeesRoutes } from './employees.routes';
import ProtectedRouteAuth from '../http/middleware/ProtectedRouteAuth'

const router =  Router();
const apiVersion = '/api/v1';

router.use(ProtectedRouteAuth);
router.use(`${apiVersion}/categories`, categoriesRoutes);
// router.use(`${apiVersion}/employees`, employeesRoutes);

console.log(router)
export default router;
