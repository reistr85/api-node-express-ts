import "reflect-metadata";
import "./infra/container";
import express from 'express';
import { categoriesRoutes } from './infra/routes/categories.routes';

const app = express();
app.use(express.json());

app.use('/api/v1/categories', categoriesRoutes);

app.listen(3000, () => console.log('Server is run.'));
