import { Router } from 'express'
import { CreateUserController } from '../../http/controllers/api/v1/user/create-user/create-user.controller'

const router = Router()

router.post('/user', CreateUserController)

export default router
