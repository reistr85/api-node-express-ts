import { Router } from 'express';
import { AuthMiddleware } from '../../http/middleware/auth.middleware';
import { LoginController } from '../../http/controllers/api/v1/auth/login/login.controller';

const router = Router();

// const authController = new LoginController();
// const authMiddleware = new AuthMiddleware();

router.post('/auth/login', LoginController)

// app.post("/auth/login", (req, res) => authController.login(req, res));
// app.get("/protected", authMiddleware.handle, (req, res) => {
//   res.json({ message: "You have access to this protected route!" });
// });

export default router;
