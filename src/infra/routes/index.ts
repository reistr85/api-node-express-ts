import { Router } from 'express';
import express from 'express'
import { AuthController } from '../http/controllers/api/v1/auth/auth.controller';
import { AuthMiddleware } from '../http/middleware/auth.middleware';

const router = Router();
const app = express()

const apiVersion = '/api/v1';

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

app.post("/login", (req, res) => authController.login(req, res));
app.get("/protected", authMiddleware.handle, (req, res) => {
  res.json({ message: "You have access to this protected route!" });
});

console.log(router)
export default router;
