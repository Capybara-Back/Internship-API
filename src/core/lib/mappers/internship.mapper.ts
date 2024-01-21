import Internship from '@core/entities/internship.entity';
import IEntityMapper from './i-entity-mapper';
import { IInternshipDto } from '@core/interfaces/dtos/internship.dto';
import AcademicTutor from '@core/entities/academic-tutor.entity';
import Company from '@core/entities/company.entity';

export default class InternshipMapper
    implements IEntityMapper<Internship, IInternshipDto>
{
    public constructor() {}

    public toDomain(raw: { [key: string]: any }): Internship {
        return new Internship(
            {
                studentId: raw.student.id,
                academicTutorId: raw.academicTutor.id,
                academicTutor: new AcademicTutor(raw.academicTutor),
                companyTutorId: raw.companyTutor.id,
                companyTutor: new AcademicTutor(raw.companyTutor),
                companyId: raw.company.id,
                company: new Company(raw.company),
                startDate: raw.startDate,
                status: raw.status,
                endDate: raw.endDate,
                missionDescription: raw.missionDescription,
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
