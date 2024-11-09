import { container } from 'tsyringe';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';
import { CategoriesRepository } from '../repositories/implementations/CategoriesRepository';
import GetAllCategoriesUseCase from '../domain/useCases/categories/GetAllCategoriesUseCase';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<GetAllCategoriesUseCase>(
  'GetAllCategoriesUseCase',
  GetAllCategoriesUseCase,
);
