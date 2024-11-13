require('dotenv').config();
import express from 'express';
import "reflect-metadata";
import "./infra/container";
import "./infra/container/index"
import companyRoutes from './infra/routes/company/company.routes'
import authRoute from './infra/routes/auth/auth.routes'
import userRoutes from './infra/routes/user/user.routes'
import urlsRoutes from "./infra/routes/urls/urls.routes";
import { AppDataSource } from "./infra/typeorm";

const app = express();
app.use(express.json());
app.use(companyRoutes)
app.use(authRoute)
app.use(userRoutes)
app.use(urlsRoutes)

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


app.listen(process.env.APP_PORT, () => console.log('Server is run.'));
