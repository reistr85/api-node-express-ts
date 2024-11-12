import { Router } from 'express'
import { CreateUserController } from '../../http/controllers/api/v1/user/create-user/create-user.controller'
import { AuthMiddleware } from '../../http/middleware/auth.middleware'
import { GetAllUsersController } from '../../http/controllers/api/v1/user/get-users/get-all-users.controller';
import { GetUserByUuidController } from '../../http/controllers/api/v1/user/get-users/get-user-by-uuid.controller';
import { DeleteUserByUuidController } from '../../http/controllers/api/v1/user/delete-user/delete-user-by-uuid.controller';

const router = Router()

router.use((req, res, next) => new AuthMiddleware().handle(req, res, next));
router.post('/users', CreateUserController)
router.get('/users', GetAllUsersController)
router.get('/users/:id', GetUserByUuidController)
router.delete('/users/:id', DeleteUserByUuidController)

export default router
