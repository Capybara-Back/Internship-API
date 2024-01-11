import IApplicantDTO from 'src/core/dtos/applicant.dto';
import Applicant from '../../../entities/applicant.entity';
import IEntityMapper from '../i-entity-mapper';

export default class ApplicantMapper
    implements IEntityMapper<Applicant, IApplicantDTO>
{
    public constructor() {}

    public toDTO(applicant: Applicant): IApplicantDTO {
        return {
            applicantId: applicant.id
        };
    }

    public toDomain(raw: { [key: string]: any }): Applicant {
        return Applicant.create(
            {
                applicantId: raw.id
            },
            raw.id
        );
    }
}
