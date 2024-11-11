import "reflect-metadata";
import "./infra/container";
import "dotenv/config";
import companyRoutes from './infra/routes/company/company.routes'
import bodyParser from "body-parser";
import express from 'express';
import { AppDataSource } from "./infra/typeorm";
import "./infra/container/index"

const app = express();
app.use(express.json());
app.use(companyRoutes)
app.use(bodyParser.json())

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


app.listen(3000, () => console.log('Server is run.'));
