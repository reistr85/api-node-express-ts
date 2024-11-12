import { Request, Response } from "express";
import { RedirectUrlUseCase } from "../../../../../../../aplication/useCases/urls/redirect-url/redirect-url.use-case";
import { container } from "tsyringe";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateUrlDto } from "../../../../../../../aplication/useCases/urls/dtos/update-url.dto";
import { UpdateUrlUseCase } from "../../../../../../../aplication/useCases/urls/update-url/update-url.use-case";

export const UpdateUrlController = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    let updateUrlDto = plainToInstance(UpdateUrlDto, req.body);
    const errors = await validate(updateUrlDto);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const updateUrlUseCase = container.resolve(UpdateUrlUseCase);
    const updatedUrl = await updateUrlUseCase.handle(updateUrlDto, req.user);

    return res.status(200).json(updatedUrl);
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
}
