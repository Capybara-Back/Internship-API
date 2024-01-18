import { IInternshipRepository } from '../../../src/core/use-cases/interfaces/i-entity-operation';
import AddInternshipUseCase from '../../../src/core/use-cases/internships/add-internship.use-case';
import Internship from '../../../src/core/entities/internship.entity';

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

    const mockInternshipsRepository = new MockInternshipsRepository();

    test('should return the saved internship', async () => {
        // Given
        const currentDate = new Date('December 17, 1994 03:24:00');

        const givenValue = {
            studentId: '7bc5f3f1-ed92-464f-9175-e4d264c5d102',
            companyId: '7bc5f3f1-ed92-464f-9175-k4d264c5d198',
            companyTutorId: '7bc5f3f1-ed92-464f-9175-e4d264c5d198',
            academicTutorId: '7bc5f3t5-ed92-464f-9175-e4d264c5d102',
            startDate: currentDate,
            endDate: new Date('December 17, 1995 03:24:00'),
            title: 'Test 1',
            missionDescription: 'description'
        };

        const returnedValue = new Internship(
            {
                studentId: '7bc5f3f1-ed92-464f-9175-e4d264c5d102',
                companyId: '7bc5f3f1-ed92-464f-9175-k4d264c5d198',
                companyTutorId: '7bc5f3f1-ed92-464f-9175-e4d264c5d198',
                academicTutorId: '7bc5f3t5-ed92-464f-9175-e4d264c5d102',
                startDate: currentDate,
                endDate: new Date('December 17, 1995 03:24:00'),
                title: 'Test 1',
                missionDescription: 'description'
            },
            '7bc5f3f1-ed92-464f-9175-e4d264c5d104'
        );

        const mock = jest.fn().mockResolvedValue(returnedValue);

        mockInternshipsRepository.save = mock;

        // When
        const result = await new AddInternshipUseCase(
            mockInternshipsRepository
        ).perform(givenValue);

        // Then
        expect(result['id']).not.toBeNull();
        expect(result['id']).toEqual('7bc5f3f1-ed92-464f-9175-e4d264c5d104');
    });
});
