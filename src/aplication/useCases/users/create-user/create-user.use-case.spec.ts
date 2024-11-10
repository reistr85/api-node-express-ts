import { IUserRepository } from '../../../../domain/interfaces/user/user.interface';
import { AlreadyExistsError } from '../../../../shared/errors/already-exists.error';
import { CreateUserDto, CreatedUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../../../../domain/entities/user/user.entity';
import { CreateUserUseCase } from './create-user.use-case';

// Mock do repositório IUserRepository
const mockUserRepository: jest.Mocked<IUserRepository> = {
  findByEmail: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findByUuid: jest.fn(),
  updateByUuid: jest.fn()
};

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(mockUserRepository);
  });

  it('should throw AlreadyExistsError when the user already exists', async () => {
    // Arrange: Mocking o retorno da pesquisa por email
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      companyId: 'company-uuid',
    };

    // Mocking o repositório para retornar um usuário existente
    mockUserRepository.findByEmail.mockResolvedValueOnce(new UserEntity(createUserDto));

    // Act & Assert
    await expect(createUserUseCase.handle(createUserDto)).rejects.toThrow(AlreadyExistsError);
    await expect(createUserUseCase.handle(createUserDto)).rejects.toThrow('User Already Exists');
  });

  it('should create a new user and return CreatedUserDto when the user does not exist', async () => {
      // Arrange: Dados de entrada para criação do usuário
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      companyId: 'company-uuid',
    };

    // Mocking o repositório para retornar `null` (usuário não encontrado)
    mockUserRepository.findByEmail.mockResolvedValueOnce(undefined);

    // Mocking o repositório para simular o salvamento do usuário
    const savedUser = new UserEntity(createUserDto);
    savedUser.uuid = '91216145-5181-4c43-bf62-ac7843f94d12'; // Simulando o UUID gerado
    mockUserRepository.save.mockResolvedValueOnce(savedUser);

    // Act
    const result = await createUserUseCase.handle(createUserDto);

    // Assert: Verificar se o usuário foi salvo corretamente e se o retorno corresponde ao esperado
    expect(result).toEqual({
      uuid: savedUser.uuid,
      name: createUserDto.name, // Corrigido: agora estamos utilizando name corretamente
      email: createUserDto.email, // Corrigido: agora estamos utilizando email corretamente
      companyId: createUserDto.companyId,
      isActive: true,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: null,
    });

    // Verifica se o repositório `save` foi chamado com o usuário correto
    expect(mockUserRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      uuid: expect.any(String),  // Verifica se o UUID é uma string (dinâmico)
      name: createUserDto.name,
      email: createUserDto.email,
      companyId: createUserDto.companyId,
    }));
  });
});
