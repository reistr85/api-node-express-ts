import { Router } from 'express'
import { CreateUserController } from '../../http/controllers/api/v1/user/create-user/create-user.controller'
import { AuthMiddleware } from '../../http/middleware/auth.middleware'

const router = Router()

router.use((req, res, next) => new AuthMiddleware().handle(req, res, next));
router.post('/user', CreateUserController)

export default router
