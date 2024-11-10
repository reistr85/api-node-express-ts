import { Request, Response } from 'express';
import { inject, injectable, container } from 'tsyringe';

import GetAllCategoriesUseCase from '../../../../domain/useCases/categories/GetAllCategoriesUseCase';
import CreateCategoryUseCase from '../../../../domain/useCases/categories/CreateCategoryUseCase';

class CategoryController {

  constructor(@inject('GetAllCategoriesUseCase') private getAllCategoriesUseCase: GetAllCategoriesUseCase) {}

  index(_: Request, response: Response) {
    // const getAllCategoriesUseCase = container.resolve(GetAllCategoriesUseCase);
    const categories = this.getAllCategoriesUseCase.execute();

    return response.status(200).send(categories);
  }

  create(request: Request, response: Response) {
    try {
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      const result = createCategoryUseCase.execute(request.body);

      return response.status(201).send(result);
    }catch(e: any) {
      return response.status(500).send({ error: true, message: e.message });
    }
  }
}

export default CategoryController;
