import { Router } from 'express'
import { createCompanyController } from '../../http/controllers/api/v1/company/create-company/create-company.controller'

const router = Router()

router.post('/company', createCompanyController)

export default router
