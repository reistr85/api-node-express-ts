import "reflect-metadata";
import { ICompanyRepository } from "../../domain/interfaces/company/company.interface";
import { TypeORMCompanyRepository } from "../typeorm/repositories/company/typeorm-company.repository";
import { container } from "tsyringe";
import { IUserRepository } from "../../domain/interfaces/user/user.interface";
import { TypeORMUserRepository } from "../typeorm/repositories/user/typeorm-user.repository";
import { AuthenticateUserUseCase } from "../../aplication/useCases/auth/authenticate-user.use-case";

container.register<ICompanyRepository>("CompanyRepository", {
  useClass: TypeORMCompanyRepository,
});

container.register<IUserRepository>("UserRepository", {
  useClass: TypeORMUserRepository,
});

container.register("AuthenticateUserUseCase", {
  useClass: AuthenticateUserUseCase,
});
