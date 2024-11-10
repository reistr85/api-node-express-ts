import { Router } from 'express';

import { CategoriesRepository } from '../repositories/implementations/CategoriesRepository';
import CategoryController from '../http/controllers/api/v1/CategoryController';

const categoriesRoutes = Router();
const categoryController = new CategoryController();
// const categoryRepository = new CategoriesRepository();

categoriesRoutes.get('/', categoryController.index)
categoriesRoutes.post('/', categoryController.create)

// categoriesRoutes.get('/:id', (request, response) => {
//   const { id } = request.params;
//   const category = categoryRepository.find(id);

//   if(!category)
//     return response.status(404).send();

//   return response.status(200).send(category);
// })

export { categoriesRoutes };
