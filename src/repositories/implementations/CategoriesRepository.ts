import { Category } from "../../domain/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  all(): Category[] {
    return this.categories;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category();
    
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    });
  
    this.categories.push(category)
    return category;
  }

  find(id: string): Category|undefined {
    return this.categories.find((category) => category.id === id);
  }

  findByName(name: string): Category|undefined {
    return this.categories.find((category) => category.name === name);
  }
}

export { CategoriesRepository }