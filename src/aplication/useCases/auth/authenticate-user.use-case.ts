import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../domain/interfaces/user/user.interface";
import { JwtAuthUseCase } from "./jwt-auth.use-case";

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserRepository') private authService: JwtAuthUseCase
  ) {}

  async execute(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);

    if (user && user.password === password) {
      return this.authService.generateToken(user);
    }

    return null;
  }
}
