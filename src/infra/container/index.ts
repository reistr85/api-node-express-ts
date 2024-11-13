import "reflect-metadata";
import { ICompanyRepository } from "../../domain/interfaces/company/company.interface";
import { TypeORMCompanyRepository } from "../typeorm/repositories/company/typeorm-company.repository";
import { container } from "tsyringe";
import { IUserRepository } from "../../domain/interfaces/user/user.interface";
import { TypeORMUserRepository } from "../typeorm/repositories/user/typeorm-user.repository";
import { LoginUserUseCase } from "../../aplication/useCases/auth/login-user.use-case";
import { AppDataSource } from "../typeorm/index";
import { Company } from "../typeorm/entities/company/company.entity";
import { User } from "../typeorm/entities/user/user.entity";
import { JwtAuthUseCase } from "../../aplication/useCases/auth/jwt-auth.use-case";
import { IUrlRepository } from "../../domain/interfaces/urls/url.interface";
import { TypeORMUrlRepository } from "../typeorm/repositories/url/url-repository";
import { Url } from "../typeorm/entities/url/url.entity";

const userRepositoryInstance = new TypeORMUserRepository(AppDataSource.getRepository(User));
const authRepositoryInstance = new JwtAuthUseCase();
const urlRepositoryInstance = new TypeORMUrlRepository(AppDataSource.getRepository(Url))

container.register<ICompanyRepository>("CompanyRepository", {
  useFactory: () => new TypeORMCompanyRepository(AppDataSource.getRepository(Company)),
});

container.registerInstance<IUserRepository>('UserRepository', userRepositoryInstance);

container.registerInstance<IUrlRepository>('UrlRepository', urlRepositoryInstance);

container.register<LoginUserUseCase>("LoginUserUseCase", {
  useFactory: () => new LoginUserUseCase(
    userRepositoryInstance,
    authRepositoryInstance
  ),
});
