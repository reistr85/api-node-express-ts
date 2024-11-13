// src/infrastructure/auth/JwtAuthService.ts
import jwt from "jsonwebtoken";
import { UserEntity } from "../../../domain/entities/user/user.entity";

export class JwtAuthUseCase {
  private readonly secret = process.env.JWT_SECRET as string;

  generateToken(user: UserEntity): string {
    return jwt.sign({ name: user.name, email: user.email, companyId: user.companyId}, this.secret, {
      expiresIn: "1h"
    });
  }

  verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, this.secret);
  }
}
