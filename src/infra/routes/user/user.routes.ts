import { Router } from 'express'
import { CreateUserController } from '../../http/controllers/api/v1/user/create-user/create-user.controller'
import { AuthMiddleware } from '../../http/middleware/auth.middleware'
import { GetAllUsersController } from '../../http/controllers/api/v1/user/get-users/get-all-users.controller';

const router = Router()

router.use((req, res, next) => new AuthMiddleware().handle(req, res, next));
router.post('/users', CreateUserController)
router.get('/users', GetAllUsersController)

export default router
