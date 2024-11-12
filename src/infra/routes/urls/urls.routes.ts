import { Router } from 'express'
import { CreateUrlController } from '../../http/controllers/api/v1/urls/create-url/create-url.controller'
import { AuthMiddleware } from '../../http/middleware/auth.middleware'

const router = Router()

router.use((req, res, next) => new AuthMiddleware().handle(req, res, next));
router.post('/urls', CreateUrlController)

export default router
