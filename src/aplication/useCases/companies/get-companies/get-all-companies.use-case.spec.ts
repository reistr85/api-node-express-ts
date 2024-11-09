import { CompanyEntity } from "../../../../domain/entities/company/company.entity";
import { ICompanyRepository } from "../../../../domain/interfaces/company/company.interface";
import { GetAllCompaniesOutputDto } from "../dtos/get-all-companies.dto";
import { GetAllCompaniesUseCase } from "./get-all-companies.use-case";

// Mock para o repositório de empresas
const mockCompanyRepository: jest.Mocked<ICompanyRepository> = {
  find: jest.fn(),
  save: jest.fn(),
  findByUuid: jest.fn(),
  updateByUuid: jest.fn(),
};

describe("GetAllCompaniesUseCase", () => {
  let getAllCompaniesUseCase: GetAllCompaniesUseCase;

  beforeEach(() => {
    getAllCompaniesUseCase = new GetAllCompaniesUseCase(mockCompanyRepository);
  });

  it("should call repository and return the formated list of companies", async () => {
    const mockCompanies: CompanyEntity[] = [
      {
        uuid: "123",
        corporateName: "Test Corp",
        tradeName: "Test Corp Trade",
        cnpj: "12.345.678/0001-90",
        phone: "123456789",
        email: "contact@test.com",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        id: 4
      },
    ];

    mockCompanyRepository.find.mockResolvedValue(mockCompanies);

    const result = await getAllCompaniesUseCase.handle();

    const expectedOutput: GetAllCompaniesOutputDto = {
      companies: mockCompanies.map(company => ({
        uuid: company.uuid,
        corporateName: company.corporateName,
        tradeName: company.tradeName,
        cnpj: company.cnpj,
        phone: company.phone,
        email: company.email,
        isActive: company.isActive,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
        deletedAt: company.deletedAt,
      })),
    };

    expect(mockCompanyRepository.find).toHaveBeenCalled();
    expect(result).toEqual(expectedOutput);
  });

  it("should format correctly output on presentOutput", () => {
    const mockCompanies: CompanyEntity[] = [
      {
        uuid: "123",
        corporateName: "Test Corp",
        tradeName: "Test Corp Trade",
        cnpj: "12.345.678/0001-90",
        phone: "123456789",
        email: "contact@test.com",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        id: 0
      },
    ];

    const result = getAllCompaniesUseCase['presentOutput'](mockCompanies);

    const expectedOutput: GetAllCompaniesOutputDto = {
      companies: mockCompanies.map(company => ({
        uuid: company.uuid,
        corporateName: company.corporateName,
        tradeName: company.tradeName,
        cnpj: company.cnpj,
        phone: company.phone,
        email: company.email,
        isActive: company.isActive,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
        deletedAt: company.deletedAt,
      })),
    };

    expect(result).toEqual(expectedOutput);
  });
});
