import "reflect-metadata";
import { ICompanyRepository } from "../../domain/interfaces/company/company.interface";
import { TypeORMCompanyRepository } from "../typeorm/repositories/company/typeorm-company.repository";
import { container } from "tsyringe";
import { IUserRepository } from "../../domain/interfaces/user/user.interface";
import { TypeORMUserRepository } from "../typeorm/repositories/user/typeorm-user.repository";
import { AuthenticateUserUseCase } from "../../aplication/useCases/auth/authenticate-user.use-case";
import { AppDataSource } from "../typeorm/index";
import { Company } from "../typeorm/entities/company/company.entity";
import { User } from "../typeorm/entities/user/user.entity";
import { JwtAuthUseCase } from "../../aplication/useCases/auth/jwt-auth.use-case";

container.register<ICompanyRepository>("CompanyRepository", {
  useFactory: () => new TypeORMCompanyRepository(AppDataSource.getRepository(Company)),
});

const userRepositoryInstance = new TypeORMUserRepository(AppDataSource.getRepository(User));
const authRepositoryInstance = new JwtAuthUseCase();

container.registerInstance<IUserRepository>('UserRepository', userRepositoryInstance);

container.register<AuthenticateUserUseCase>("AuthenticateUserUseCase", {
  useFactory: () => new AuthenticateUserUseCase(
    userRepositoryInstance,
    authRepositoryInstance
  ),
});
