import { Request, Response } from "express";
import { RedirectUrlUseCase } from "../../../../../../../aplication/useCases/urls/redirect-url/redirect-url.use-case";
import { container } from "tsyringe";

export const redirectUrlController = async (req: Request, res: Response): Promise<Response | void> => {
  const { shortUrl } = req.params;
  const redirectUrlUseCase = container.resolve(RedirectUrlUseCase);

  try {
    const originalUrl = await redirectUrlUseCase.handle(shortUrl);

    if (!originalUrl) {
      return res.status(404).json({ message: "URL not founded" });
    }

    return res.redirect(originalUrl);
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
}
