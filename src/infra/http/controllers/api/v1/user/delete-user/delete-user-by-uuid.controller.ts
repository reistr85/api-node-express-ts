import { Request, Response } from "express"
import { container } from "tsyringe";
import { DeleteUserByUuidUseCase } from "../../../../../../../aplication/useCases/users/delete-user/delete-user-by-uuid.use-case";

export const DeleteUserByUuidController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userUuid = req.params.id

    const deleteUserByUuidUseCase = container.resolve(DeleteUserByUuidUseCase);
    await deleteUserByUuidUseCase.handle(userUuid);

    return res.status(200);
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
}
