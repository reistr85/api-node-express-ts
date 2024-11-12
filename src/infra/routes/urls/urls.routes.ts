import { Router } from 'express'
import { CreateUrlController } from '../../http/controllers/api/v1/urls/create-url/create-url.controller'
import { AuthMiddleware } from '../../http/middleware/auth.middleware'
import { GetAllUrlsController } from '../../http/controllers/api/v1/urls/get-urls/get-all-urls.controller';
import { redirectUrlController } from '../../http/controllers/api/v1/urls/redirect-url/redirect-url.controller';

const router = Router()

router.use((req, res, next) => new AuthMiddleware().handle(req, res, next));
router.post('/urls', CreateUrlController)
router.get('/urls', GetAllUrlsController)
router.get('/urls/redirect/:shortUrl', redirectUrlController)

export default router
