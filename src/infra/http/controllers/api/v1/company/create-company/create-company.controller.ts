import { Request, Response } from "express";
import { CreateCompanyUseCase } from "../../../../../../../aplication/useCases/companies/create-company/create-company.use-case";
import { plainToInstance } from "class-transformer";
import { CreateCompanyDto } from "../../../../../../../aplication/useCases/companies/dtos/create-company.dto";
import { validate } from "class-validator";
import { container } from "tsyringe";

export const createCompanyController = async (req: Request, res: Response): Promise<Response> => {
  try {
      const createCompanyDTO = plainToInstance(CreateCompanyDto, req.body);

      const errors = await validate(createCompanyDTO);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const createCompanyUseCase = container.resolve(CreateCompanyUseCase);
      const company = await createCompanyUseCase.handle(createCompanyDTO);

      return res.status(201).json(company);
  } catch (error: any) {
      console.log(error)
      return res.status(400).json({ message: error.message });
    }
  }
