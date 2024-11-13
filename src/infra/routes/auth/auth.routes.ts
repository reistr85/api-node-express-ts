import { Router } from 'express';
import { LoginController } from '../../http/controllers/api/v1/auth/login/login.controller';

const router = Router();

router.post('/auth/login', LoginController)

export default router;
