import { Router } from 'express'
import { CreateCompanyController } from '../../http/controllers/api/v1/company/create-company/create-company.controller'
import { AuthMiddleware } from '../../http/middleware/auth.middleware'

const router = Router()

router.post('/companies', CreateCompanyController)

router.use((req, res, next) => new AuthMiddleware().handle(req, res, next));

export default router
