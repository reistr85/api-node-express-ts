import { Router } from 'express'
import { CreateCompanyController } from '../../http/controllers/api/v1/company/create-company/create-company.controller'
import { GetAllCompaniesController } from '../../http/controllers/api/v1/company/get-companies/get-all-companies.controller'

const router = Router()

router.post('/company', CreateCompanyController)
router.get('/company', GetAllCompaniesController)

export default router
