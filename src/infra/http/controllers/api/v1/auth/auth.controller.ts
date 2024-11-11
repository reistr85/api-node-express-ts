import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "../../../../../../aplication/useCases/auth/authenticate-user.use-case";
import { container } from "tsyringe";

export class AuthController {
  private authenticateUser: AuthenticateUserUseCase;

  constructor() {
    this.authenticateUser = container.resolve(AuthenticateUserUseCase);
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
