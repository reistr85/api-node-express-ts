// import { Router } from 'express';
// import { Category } from '../domain/entities/Category';
// import { CategoryRepository } from '../repositories/CategoryRepository';

// const employeesRoutes = Router();
// const categoryRepository = new CategoryRepository();

// employeesRoutes.get('/', (request, response) => {
//   const categories = categoryRepository.all();
//   return response.status(200).send(categories);
// })

// employeesRoutes.post('/', (request, response) => {
//   const { name, description } = request.body;
  
//   const alreadyExistent = categoryRepository.findByName(name);
//   if(alreadyExistent)
//     return response.status(400).send({ error: true, message: 'Category already existent' });
  
//   const category = categoryRepository.create({ name, description });
//   return response.status(201).send(category);
// })

// employeesRoutes.get('/:id', (request, response) => {
//   const { id } = request.params;
//   const category = categoryRepository.find(id);

//   if(!category)
//     return response.status(404).send();

//   return response.status(200).send(category);
// })

// export { employeesRoutes };