import Internship from '@core/entities/internship.entity';
import IEntityMapper from './interfaces/i-entity-mapper';
import { IInternshipDto } from '@core/interfaces/dtos/internship.dto';
import AcademicTutor from '@core/entities/academic-tutor.entity';
import Company from '@core/entities/company.entity';
import CompanyTutor from '@core/entities/company-tutor.entity';
import AcademicTutorMapper from './academic-tutor.mapper';
import CompanyTutorMapper from './company-tutor.mapper';
import CompanyMapper from './company.mapper';
import logger from '@common/logger';
import EntityMapper from './entity.mapper';

export default class InternshipMapper
    extends EntityMapper<Internship, IInternshipDto>
{

    private academicTutorMapper: Pick<IEntityMapper<AcademicTutor, any>, 'toDomain'>;
    private companyTutorMapper: Pick<IEntityMapper<CompanyTutor, any>, 'toDomain'>;
    private companyMapper: Pick<IEntityMapper<Company, any>, 'toDomain'>;

    public constructor() {
        super();
        this.academicTutorMapper = new AcademicTutorMapper();
        this.companyTutorMapper = new CompanyTutorMapper();
        this.companyMapper = new CompanyMapper();
    }

    public toDomain(raw: { [key: string]: any }): Internship {
        delete raw?.academicTutor?.user?.password;
        delete raw?.companyTutor?.user?.password;
        const internship = new Internship({
            studentId: raw.studentId,
            title: raw.title,
            startDate: raw.startDate,
            endDate: raw.endDate,
            status: raw.status,
            missionDescription: raw.missionDescription,
        }, raw.id);

        logger.debug(raw);

        return internship;

    }

    public toDomainWithRelation(raw: { [key: string]: any; }): Internship {
        const internship = this.toDomain(raw);

        internship.setAcademicTutor(this.academicTutorMapper.toDomain(raw.academicTutor));
        internship.setCompany(this.companyMapper.toDomain(raw.company));
        internship.setCompanyTutor(this.companyTutorMapper.toDomain(raw.companyTutor,));

        return internship;
    }

    public toDTO(internship: Internship): any {
        const data = internship.getProps();
        return {
            id: internship.id,
            ...data
        };
    }
}
