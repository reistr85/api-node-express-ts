import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express"
import { container } from "tsyringe";
import { CreateUserDto } from "../../../../../../../aplication/useCases/users/dtos/create-user.dto";
import { CreateUserUseCase } from "../../../../../../../aplication/useCases/users/create-user/create-user.use-case";

export const CreateUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const createUserDto = plainToInstance(CreateUserDto, req.body);
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const createUserUseCase = container.resolve(CreateUserUseCase);
    const user = await createUserUseCase.handle(createUserDto);

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
}
