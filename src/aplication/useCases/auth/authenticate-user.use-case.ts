// src/application/usecases/AuthenticateUser.ts

import { IUserRepository } from "../../../domain/interfaces/user/user.interface";
import { JwtAuthUseCase } from "./jwt-auth.use-case";

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: JwtAuthUseCase
  ) {}

  async execute(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);

    if (user && user.password === password) {
      return this.authService.generateToken(user);
    }

    return null;
  }
}
