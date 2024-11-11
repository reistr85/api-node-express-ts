import "reflect-metadata";
import { ICompanyRepository } from "../../domain/interfaces/company/company.interface";
import { TypeORMCompanyRepository } from "../typeorm/repositories/company/typeorm-company.repository";
import { container } from "tsyringe";
import { IUserRepository } from "../../domain/interfaces/user/user.interface";
import { TypeORMUserRepository } from "../typeorm/repositories/user/typeorm-user.repository";
import { AuthenticateUserUseCase } from "../../aplication/useCases/auth/authenticate-user.use-case";
import { AppDataSource } from "../typeorm/index";
import { Company } from "../typeorm/entities/company/company.entity";


container.register<ICompanyRepository>("CompanyRepository", {
  useFactory: () => new TypeORMCompanyRepository(AppDataSource.getRepository(Company)),
});

container.register<IUserRepository>("UserRepository", {
  useClass: TypeORMUserRepository,
});

container.register("AuthenticateUserUseCase", {
  useClass: AuthenticateUserUseCase,
});
