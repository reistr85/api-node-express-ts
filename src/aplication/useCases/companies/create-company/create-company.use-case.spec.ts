import { CompanyEntity } from "../../../../domain/entities/company/company.entity"
import { ICompanyRepository } from "../../../../domain/interfaces/company/company.interface"
import { AlreadyExistsError } from "../../../../shared/errors/already-exists.error"
import { CreateCompanyDto, CreatedCompanyDto } from "../dtos/create-company.dto"
import { CreateCompanyUseCase } from "./create-company.use-case"

describe('CreateCompanyService - handle', () => {
  let companyRepository: ICompanyRepository
  let companyService: CreateCompanyUseCase

  beforeEach(() => {
    // Criação de um mock para o repositório
    companyRepository = {
      findByUuid: jest.fn(),
      save: jest.fn(),
    } as unknown as ICompanyRepository // Simulando o tipo da interface
    companyService = new CreateCompanyUseCase(companyRepository) // Passando o mock para o serviço
  })

  it('should throw an error if the company already exists', async () => {
    const companyData: CreateCompanyDto = {
      corporateName: 'Test Corp',
      tradeName: 'Test Corp Trade',
      cnpj: '12.345.678/0001-90',
      phone: '123456789',
      email: 'contact@test.com',
    }

    companyRepository.findByUuid = jest.fn().mockResolvedValueOnce(new CompanyEntity(companyData))

    // Expectativa de erro
    await expect(companyService.handle(companyData)).rejects.toThrowError(AlreadyExistsError)
  })

  it('should create and return a company when it does not exist', async () => {
    const companyData: CreateCompanyDto = {
      corporateName: 'Test Corp',
      tradeName: 'Test Corp Trade',
      cnpj: '12.345.678/0001-90',
      phone: '123456789',
      email: 'contact@test.com',
    }

    companyRepository.findByUuid = jest.fn().mockResolvedValueOnce(null)
    companyRepository.save = jest.fn().mockResolvedValueOnce(undefined)

    const result = await companyService.handle(companyData)

    const createdCompany: CreatedCompanyDto = {
      uuid: result.uuid,
      corporateName: 'Test Corp',
      tradeName: 'Test Corp Trade',
      cnpj: '12.345.678/0001-90',
      phone: '123456789',
      email: 'contact@test.com',
      isActive: true,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: null,
    }

    expect(result).toEqual(createdCompany)
    expect(companyRepository.save).toHaveBeenCalledWith(expect.any(CompanyEntity)) // Verifica se save foi chamado com uma instância de CompanyEntity
  })
})
