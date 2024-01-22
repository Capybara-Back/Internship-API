import IEntityMapper from './i-entity-mapper';
import AcademicTutor from '@core/entities/academic-tutor.entity';
import { IAcademicTutorDto } from '@core/interfaces/dtos/academic-tutor.dto';

export default class AcademicTutorMapper
    implements IEntityMapper<AcademicTutor, IAcademicTutorDto>
{
    public toDomain(raw: { [key: string]: any }): AcademicTutor {
        return new AcademicTutor(
            {
                firstName: raw.firstName,
                lastName: raw.lastName,
                phoneNumber: raw.phoneNumber,
                email: raw.email,
                schoolEmail: raw.email
            },
            raw.id
        );
    }

    public toDTO(academicTutor: AcademicTutor): any {
        return { ...academicTutor.getProps() };
    }
}
