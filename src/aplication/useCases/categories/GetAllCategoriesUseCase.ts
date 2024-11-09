
import { inject, injectable } from 'tsyringe';
import { CategoriesRepository } from '../../../repositories/implementations/CategoriesRepository';
import { Category } from '../../entities/Category';

@injectable()
class GetAllCategoriesUseCase   {
  constructor(@inject('CategoriesRepository') private categoriesRepository: CategoriesRepository) {}
  execute(): Category[] {
    return this.categoriesRepository.all();
  }
}

export default GetAllCategoriesUseCase;
