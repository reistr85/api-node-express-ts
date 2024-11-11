import "reflect-metadata";
import "./infra/container";
import "dotenv/config";
import "./infra/container/index"
import companyRoutes from './infra/routes/company/company.routes'
import authRoute from './infra/routes/auth/auth.routes'
import userRoutes from './infra/routes/user/user.routes'
import express from 'express';
import { AppDataSource } from "./infra/typeorm";

const app = express();
app.use(express.json());
app.use(companyRoutes)
app.use(authRoute)
app.use(userRoutes)

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


app.listen(3000, () => console.log('Server is run.'));
