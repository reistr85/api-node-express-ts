// src/interface/controllers/AuthController.ts
import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "../../../../../../aplication/useCases/auth/authenticate-user.use-case";
import { JwtAuthUseCase } from "../../../../../../aplication/useCases/auth/jwt-auth.use-case";

export class AuthController {
  private authenticateUser: AuthenticateUserUseCase;

  constructor() {
    const userRepository
    const authService = new JwtAuthUseCase();
    this.authenticateUser = new AuthenticateUserUseCase(userRepository, authService);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const token = await this.authenticateUser.execute(email, password);

    if (token) {
      return res.json({ token });
    }

    return res.status(401).json({ error: "Invalid credentials" });
  }
}
