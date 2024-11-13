import { Request, Response } from "express";
import { RedirectUrlUseCase } from "../../../../../../../aplication/useCases/urls/redirect-url/redirect-url.use-case";
import { container } from "tsyringe";

export const redirectUrlController = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { shortUrl } = req.params;
    const redirectUrlUseCase = container.resolve(RedirectUrlUseCase);

    const originalUrl = await redirectUrlUseCase.handle(shortUrl, req.user);

    if (!originalUrl) {
      return res.status(404).json({ message: "URL not founded" });
    }

    return res.redirect(originalUrl);
  } catch (error: any) {
    console.log(error)
    return res.status(error.statusCode).json({ message: error.message });
  }
}
