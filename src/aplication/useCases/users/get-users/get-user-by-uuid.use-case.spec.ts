import { UserEntity } from "../../../../domain/entities/user/user.entity";
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface";
import { NotExistsError } from "../../../../shared/errors/not-exists.error";
import { GetUserByUuidOutputDto } from "../dtos/get-user-by-uuid.dto";
import { GetUserByUuidUseCase } from "./get-user-by-uuid.use-case";

describe('GetUserByUuidUseCase', () => {
  let getUserByUuidUseCase: GetUserByUuidUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    // Cria um mock do repositório
    mockUserRepository = {
      findByUuid: jest.fn(),
    } as any;  // Mockando o repositório IUserRepository
    getUserByUuidUseCase = new GetUserByUuidUseCase(mockUserRepository);
  });

  it('should return user data when user exists', async () => {
    // Arrange: Dados simulados para o usuário
    const mockUser = new UserEntity({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',  // Verifique se a senha é necessária ou não
      companyId: 'company-uuid',
    });

    // Configura o mock para retornar o usuário
    mockUserRepository.findByUuid.mockResolvedValueOnce(mockUser);

    // Act: Chama o método `handle`
    const result = await getUserByUuidUseCase.handle('user-uuid');

    // Assert: Verifica se os dados retornados estão corretos
    expect(result).toEqual<GetUserByUuidOutputDto>({
      uuid: mockUser.uuid,
      name: mockUser.name,
      email: mockUser.email,
      companyId: mockUser.companyId,
      isActive: mockUser.isActive,
      createdAt: mockUser.createdAt,
      updatedAt: mockUser.updatedAt,
      deletedAt: mockUser.deletedAt,
    });

    // Verifica se o repositório `findByUuid` foi chamado com o UUID correto
    expect(mockUserRepository.findByUuid).toHaveBeenCalledWith('user-uuid');
  });

  it('should throw NotExistsError when user does not exist', async () => {
    // Arrange: Configura o mock para retornar `null`, simulando que o usuário não foi encontrado
    mockUserRepository.findByUuid.mockResolvedValueOnce(undefined);

    // Act & Assert: Espera que o erro NotExistsError seja lançado
    await expect(getUserByUuidUseCase.handle('user-uuid'))
      .rejects
      .toThrowError(new NotExistsError('User not already exists'));
  });
});
