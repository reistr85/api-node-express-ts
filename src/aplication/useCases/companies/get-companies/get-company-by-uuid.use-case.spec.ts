import { GetCompanyByUuidUseCase } from './get-company-by-uuid.use-case';
import { ICompanyRepository } from '../../../../domain/interfaces/company/company.interface';
import { NotExistsError } from '../../../../shared/errors/not-exists.error';
import { CompanyEntity } from '../../../../domain/entities/company/company.entity';

describe('GetCompanyByUuidUseCase', () => {
  let getCompanyByUuidUseCase: GetCompanyByUuidUseCase;
  let mockCompanyRepository: jest.Mocked<ICompanyRepository>;

  beforeEach(() => {
    mockCompanyRepository = {
      findByUuid: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      updateByUuid: jest.fn(),
    };
    getCompanyByUuidUseCase = new GetCompanyByUuidUseCase(mockCompanyRepository);
  });

  it('deve retornar os dados da empresa quando encontrada pelo uuid', async () => {
    // Mockando dados de empresa
    const companyData: CompanyEntity = {
      uuid: '123',
      corporateName: 'Test Corp',
      tradeName: 'Test Trade',
      cnpj: '12.345.678/0001-90',
      phone: '123456789',
      email: 'contact@test.com',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      id: 0
    };

    mockCompanyRepository.findByUuid.mockResolvedValue(companyData);

    const result = await getCompanyByUuidUseCase.handle('123');

    expect(result).toEqual({
      uuid: '123',
      corporateName: 'Test Corp',
      tradeName: 'Test Trade',
      cnpj: '12.345.678/0001-90',
      phone: '123456789',
      email: 'contact@test.com',
      isActive: true,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: null,
    });
  });

  it('deve lançar um NotExistsError quando a empresa não é encontrada pelo uuid', async () => {
    mockCompanyRepository.findByUuid.mockResolvedValue(undefined);

    await expect(getCompanyByUuidUseCase.handle('123')).rejects.toThrow(NotExistsError);
    await expect(getCompanyByUuidUseCase.handle('123')).rejects.toThrow('Company not exists!');
  });
});
