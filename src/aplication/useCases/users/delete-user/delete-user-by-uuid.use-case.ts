import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface";

@injectable()
export class DeleteUserByUuidUseCase{
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) { }

  async handle(uuid: string): Promise<void>{
    if (!uuid) throw new Error('Please enter User Uuid!')
    const user = await this.userRepository.findByUuid(uuid)

    return await this.userRepository.delete(user?.uuid)
  }
}
