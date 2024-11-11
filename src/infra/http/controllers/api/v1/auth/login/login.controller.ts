import { Request, Response } from "express";
import { CreateCompanyUseCase } from "../../../../../../../aplication/useCases/companies/create-company/create-company.use-case";
import { plainToInstance } from "class-transformer";
import { LoginUserUseCase } from "../../../../../../../aplication/useCases/auth/login-user.use-case";
import { LoginDto } from "../../../../../../../aplication/useCases/auth/dtos/login.dto";
import { container } from "tsyringe";
import { validate } from "class-validator";


export const LoginController = async (req: Request, res: Response): Promise<Response> => {
  try {
      const loginDTO = plainToInstance(LoginDto, req.body);

      const errors = await validate(loginDTO);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const loginUserUseCase = container.resolve(LoginUserUseCase);
      const token = await loginUserUseCase.handle(loginDTO);

      return res.status(200).json(token);
  } catch (error: any) {
    console.log(error)
      return res.status(error.statusCode).json({ message: error.message });
  }
}
