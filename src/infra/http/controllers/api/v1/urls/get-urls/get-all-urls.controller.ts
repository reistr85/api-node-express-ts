import { Request, Response } from "express"
import { container } from "tsyringe";
import { GetAllUrlsUseCase } from "../../../../../../../aplication/useCases/urls/get-urls/get-all-url.use-case";

export const GetAllUrlsController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const getAllUrlsUseCase = container.resolve(GetAllUrlsUseCase);
    const urls = await getAllUrlsUseCase.handle(req.user);

    return res.status(201).json(urls);
  } catch (error: any) {
    console.log(error)
    return res.status(error.statusCode).json({ message: error.message });
  }
}
