
import { inject, injectable } from 'tsyringe';
import { CategoriesRepository } from '../../../repositories/implementations/CategoriesRepository';
import { ICreateCategoryDTO} from '../../../repositories/ICategoriesRepository';
import { Category } from '../../entities/Category';

@injectable()
class CreateCategoryUseCase   {
  constructor(@inject('CategoriesRepository') private categoriesRepository: CategoriesRepository) {}
  execute({ name, description }: ICreateCategoryDTO): Category|Error {
  
  const alreadyExistent = this.categoriesRepository.findByName(name);
  
  if(alreadyExistent)
    throw new Error('Category already existent');
    // return response.status(400).send({ error: true, message: 'Category already existent' });
  
  // const category = categoryRepository.create({ name, description });
  // return response.status(201).send(category);
  
    return this.categoriesRepository.create({name, description});
  }
}

export default CreateCategoryUseCase;