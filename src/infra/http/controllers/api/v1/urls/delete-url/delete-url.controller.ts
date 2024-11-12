import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUrlUseCase } from "../../../../../../../aplication/useCases/urls/delete-url/delete-url.use-case";

export const DeleteUrlController = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const shortUrl = req.params.shortUrl
    const deleteUrlUseCase = container.resolve(DeleteUrlUseCase);
    const output = await deleteUrlUseCase.handle(shortUrl, req.user);

    return res.status(200).json(output);
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
}
