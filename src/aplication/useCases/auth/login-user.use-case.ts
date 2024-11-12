import { inject, injectable } from "tsyringe";
import * as bcrypt from 'bcrypt';
import { IUserRepository } from "../../../domain/interfaces/user/user.interface";
import { JwtAuthUseCase } from "./jwt-auth.use-case";
import { LoginDto } from "./dtos/login.dto";
import { LoginResponseDto } from "./dtos/login.dto";
import { UnauthorizedError } from "../../../shared/errors/unauthorized.error";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository, private authService: JwtAuthUseCase
  ) {}

  async handle(loginDto: LoginDto): Promise<LoginResponseDto|UnauthorizedError> {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedError();
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedError();
    }

    const token = await this.authService.generateToken(user);
    console.log(token)
    return {
      token
    } as LoginResponseDto;
  }
}
