import "reflect-metadata";
import { DataSource } from "typeorm";
import { Company } from "./entities/company/company.entity";
import { User } from "./entities/user/user.entity";
import { Url } from "./entities/url/url.entity";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Company, User, Url],
  migrations: ["./migrations/*.ts"],
  subscribers: [],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Banco de dados conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
};
