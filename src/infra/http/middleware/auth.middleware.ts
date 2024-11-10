// src/interface/middlewares/AuthMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { JwtAuthUseCase } from "../../../aplication/useCases/auth/jwt-auth.use-case";

export class AuthMiddleware {
  private authService = new JwtAuthUseCase();

  handle(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw res.status(401).json({ error: "Token missing" });
    }

    try {
      const decoded = this.authService.verifyToken(token);
      (req as any).user = decoded;
      next();
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  }
}
