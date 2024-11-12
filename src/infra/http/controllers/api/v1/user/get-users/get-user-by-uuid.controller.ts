import { Request, Response } from "express"
import { container } from "tsyringe";
import { GetUserByUuidUseCase } from "../../../../../../../aplication/useCases/users/get-users/get-user-by-uuid.use-case";

export const GetUserByUuidController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userUuid = req.params.id

    const getUserByUuidUseCase = container.resolve(GetUserByUuidUseCase);
    const user = await getUserByUuidUseCase.handle(userUuid);

    return res.status(201).json(user);
  } catch (error: any) {
    console.log(error)
    return res.status(error.statusCode).json({ message: error.message });
  }
}
