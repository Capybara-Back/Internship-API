import Entity from './interfaces/entity.abstract';

interface IApplicantProps {
    applicantId: string;
}

export default class Applicant extends Entity<IApplicantProps> {
    public static create(
        applicantData: IApplicantProps,
        id: string
    ): Applicant {
        const { applicantId } = applicantData;

        const applicant: IApplicantProps = {
            applicantId
        };

        return new Applicant(applicant, id);
    }
}
