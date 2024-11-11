import { container } from "tsyringe";
import { GetAllCompaniesUseCase } from "../../../../../../../aplication/useCases/companies/get-companies/get-all-companies.use-case";
import { Request, Response } from "express";

export const GetAllCompaniesController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const getAllCompaniesUseCase = container.resolve(GetAllCompaniesUseCase);
    const companies = await getAllCompaniesUseCase.handle()

    return res.status(200).json(companies);
  } catch (error: any) {
      console.log(error)
      return res.status(400).json({ message: error.message });
  }
}
