import AcademicTutor from '../../../src/core/entities/academic-tutor.entity';
import CompanyTutor from '../../../src/core/entities/company-tutor.entity';
import Company from '../../../src/core/entities/company.entity';
import Internship from '../../../src/core/entities/internship.entity';
import {
    IAcademicTutorRepository,
    ICompanyRepository,
    ICompanyTutorRepository,
    IInternshipRepository
} from '../../../src/core/use-cases/interfaces/i-entity-operation';
import AddInternshipUseCase from '../../../src/core/use-cases/internships/add-internship.use-case';

describe('Add internship use case', () => {
    class MockInternshipsRepository implements IInternshipRepository {
        save(entity: Internship): Promise<Internship> {
            throw new Error('Method not implemented.');
        }
        update(entity: Internship, id: string): Promise<any> {
            throw new Error('Method not implemented.');
        }
        delete(id: string): Promise<true | null> {
            throw new Error('Method not implemented.');
        }
        findAll(): Promise<Internship[]> {
            throw new Error('Method not implemented.');
        }
        findOne(id: string): Promise<any> {
            throw new Error('Method not implemented.');
        }
    }

    class MockAcademicTutorRepository implements IAcademicTutorRepository {
        save(entity: AcademicTutor): Promise<AcademicTutor> {
            throw new Error('Method not implemented.');
        }
        update(entity: AcademicTutor, id: string): Promise<any> {
            throw new Error('Method not implemented.');
        }
        delete(id: string): Promise<true | null> {
            throw new Error('Method not implemented.');
        }
        findAll(): Promise<AcademicTutor[]> {
            throw new Error('Method not implemented.');
        }
        findOne(id: string): Promise<any> {
            throw new Error('Method not implemented.');
        }
    }

    class MockCompanyRepository implements ICompanyRepository {
        save(entity: Company): Promise<Company> {
            throw new Error('Method not implemented.');
        }
        update(entity: Company, id: string): Promise<any> {
            throw new Error('Method not implemented.');
        }
        delete(id: string): Promise<true | null> {
            throw new Error('Method not implemented.');
        }
        findAll(): Promise<Company[]> {
            throw new Error('Method not implemented.');
        }
        findOne(id: string): Promise<any> {
            throw new Error('Method not implemented.');
        }
    }

    class MockCompanyTutorRepository implements ICompanyTutorRepository {
        save(entity: CompanyTutor): Promise<CompanyTutor> {
            throw new Error('Method not implemented.');
        }
        update(entity: CompanyTutor, id: string): Promise<any> {
            throw new Error('Method not implemented.');
        }
        delete(id: string): Promise<true | null> {
            throw new Error('Method not implemented.');
        }
        findAll(): Promise<CompanyTutor[]> {
            throw new Error('Method not implemented.');
        }
        findOne(id: string): Promise<any> {
            throw new Error('Method not implemented.');
        }
    }

    const mockInternshipsRepository = new MockInternshipsRepository();
    const mockAcademicTutorRepository = new MockAcademicTutorRepository();
    const mockCompanyRepository = new MockCompanyRepository();
    const mockCompanyTutorRepository = new MockCompanyTutorRepository();

    test('should return the saved internship', async () => {
        // Given
        const currentDate = new Date('December 17, 1994 03:24:00');

        const givenValue = {
            studentId: '7bc5f3f1-ed92-464f-9175-e4d264c5d102',
            companyId: 'LTD',
            companyTutorId: '7bc5f3f1-ed92-464f-9175-e4d264c5d198',
            academicTutorId: '7bc5f3t5-ed92-464f-9175-e4d264c5d102',
            startDate: currentDate,
            endDate: new Date('December 17, 1995 03:24:00'),
            salary: 1000,
            title: 'Test 1',
            missionDescription: 'description'
        };

        const academicTutorValue = new AcademicTutor({
            id: '7bc5f3t5-ed92-464f-9175-e4d264c5d102',
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '064545545',
            email: 'john.doe@gmail.com',
            schoolEmail: 'john.doe.school@gmail.com'
        });

        mockAcademicTutorRepository.findOne = jest
            .fn()
            .mockResolvedValue(academicTutorValue);

        const companyValue = new Company({
            name: 'LTD',
            address: '123 Road Street',
            city: 'Los Angeles',
            zipCode: '567'
        });

        mockCompanyRepository.findOne = jest
            .fn()
            .mockResolvedValue(companyValue);

        const companyTutorValue = new CompanyTutor({
            id: '7bc5f3f1-ed92-464f-9175-e4d264c5d198',
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '064545545',
            email: 'john.doe@gmail.com'
        });

        mockCompanyTutorRepository.findOne = jest
            .fn()
            .mockResolvedValue(companyTutorValue);

        const returnedValue = new Internship(
            {
                studentId: '7bc5f3f1-ed92-464f-9175-e4d264c5d102',
                company: companyValue,
                companyTutor: companyTutorValue,
                academicTutor: academicTutorValue,
                startDate: currentDate,
                endDate: new Date('December 17, 1995 03:24:00'),
                salary: 1000,
                title: 'Test 1',
                missionDescription: 'description'
            },
            '7bc5f3f1-ed92-464f-9175-e4d264c5d104'
        );

        mockInternshipsRepository.save = jest
            .fn()
            .mockResolvedValue(returnedValue);



        // When
        const result = await new AddInternshipUseCase(
            mockInternshipsRepository,
            mockCompanyRepository,
            mockAcademicTutorRepository,
            mockCompanyTutorRepository
        ).perform(givenValue);

        // Then
        expect(result['id']).not.toBeNull();
        expect(result['id']).toEqual('7bc5f3f1-ed92-464f-9175-e4d264c5d104');
    });
});
