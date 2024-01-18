import Internship from '@core/entities/internship.entity';
import IEntityMapper from './i-entity-mapper';
import { IInternshipDto } from '@core/interfaces/dtos/internship.dto';

export default class InternshipMapper
    implements IEntityMapper<Internship, IInternshipDto>
{
    public constructor() {}

    public toDomain(raw: { [key: string]: any }): Internship {
        return Internship.create(
            {
                studentId: raw.student.id,
                academicTutorId: raw.academicTutor.id,
                date: raw.date,
                title: raw.title
            },
            raw.id
        );
    }

    public toDTO(internship: Internship): any {
        const data = internship.getProps();
        return {
            id: internship.id,
            ...data
        };
    }
}
