// src/infrastructure/auth/JwtAuthService.ts
import jwt from "jsonwebtoken";
import { UserEntity } from "../../../domain/entities/user/user.entity";

export class JwtAuthUseCase {
  private readonly secret = process.env.JWT_SECRET as string;

  generateToken(user: UserEntity): string {
    return jwt.sign({ id: user.companyId, username: user.email }, this.secret, {
      expiresIn: "1h"
    });
  }

  verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, this.secret);
  }
}
