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
        const currentDate = new Date();

        const givenValue = {
            studentId: '7bc5f3f1-ed92-464f-9175-e4d264c5d102',
            academicTutorId: '7bc5f3t5-ed92-464f-9175-e4d264c5d102',
            title: 'Test 1',
            date: currentDate
        };

        const returnedValue = Internship.create(
            {
                studentId: '7bc5f3f1-ed92-464f-9175-e4d264c5d102',
                academicTutorId: '7bc5f3t5-ed92-464f-9175-e4d264c5d102',
                date: currentDate,
                title: 'Test 1'
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
        expect(result['internshipId']).not.toBeNull();
        expect(result['internshipId']).toEqual(
            '7bc5f3f1-ed92-464f-9175-e4d264c5d104'
        );
    });
});
