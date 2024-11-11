import { Router } from 'express';
import express from 'express'
import { AuthMiddleware } from '../../http/middleware/auth.middleware';
import { AuthController } from '../../http/controllers/api/v1/auth/auth.controller';

const router = Router();
const app = express()

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

app.post("auth/login", (req, res) => authController.login(req, res));
app.get("/protected", authMiddleware.handle, (req, res) => {
  res.json({ message: "You have access to this protected route!" });
});

export default router;
