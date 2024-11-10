import { Category } from "../domain/entities/Category";

interface ICreateCategoryDTO {
  name: string,
  description: string
}

interface ICategoriesRepository {
  all(): Category[];
  create({ name, description }: ICreateCategoryDTO): Category;
}

export { ICategoriesRepository, ICreateCategoryDTO };