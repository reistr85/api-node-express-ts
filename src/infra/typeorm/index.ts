import "reflect-metadata";
import { DataSource } from "typeorm";
import { Company } from "./entities/company/company.entity";
import { User } from "./entities/user/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Company, User],
  migrations: ["./migrations/*.ts"],
  subscribers: [],
});

// Inicialize a conexão com o banco de dados
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Banco de dados conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1); // Finaliza o processo caso a conexão falhe
  }
};
