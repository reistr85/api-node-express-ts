import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express"
import { container } from "tsyringe";
import { CreateUrlDto } from "../../../../../../../aplication/useCases/urls/dtos/create-url.dto";
import { CreateUrlUseCase } from "../../../../../../../aplication/useCases/urls/create-url/create-url.use-case";

export const CreateUrlController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const createUrlDto = plainToInstance(CreateUrlDto, req.body);
    const errors = await validate(createUrlDto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const createUrlUseCase = container.resolve(CreateUrlUseCase);
    const user = await createUrlUseCase.handle(req.user, createUrlDto);

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
}
