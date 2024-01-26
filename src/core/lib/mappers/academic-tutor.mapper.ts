import AcademicTutor from '@core/entities/academic-tutor.entity';
import { IAcademicTutorDto } from '@core/interfaces/dtos/academic-tutor.dto';
import EntityMapper from './entity.mapper';

export default class AcademicTutorMapper
    extends EntityMapper<AcademicTutor, IAcademicTutorDto>
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
