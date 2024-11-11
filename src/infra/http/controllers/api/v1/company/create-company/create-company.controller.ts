import { Request, Response } from "express";
import { CreateCompanyUseCase } from "../../../../../../../aplication/useCases/companies/create-company/create-company.use-case";

export class CreateCompanyController {
  constructor(private readonly createCompanyUseCase: CreateCompanyUseCase) { }

  async execute(req: Request, res: Response): Promise<Response>{
    const { corporateName, tradeName, cnpj, email } = req.body;

    try {
      const newCompany = await this.createCompanyUseCase.handle({

      });

      return res.status(201).json(newCompany);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
