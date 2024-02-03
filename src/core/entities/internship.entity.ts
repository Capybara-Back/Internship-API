import AcademicTutor from './academic-tutor.entity';
import CompanyTutor from './company-tutor.entity';
import Company from './company.entity';
import Entity from './interfaces/entity.abstract';

interface IInternshipProps {
    studentId: string;
    startDate: Date;
    endDate: Date;
    title: string;
    status?: string;
    missionDescription: string;
    company?: Company;
    companyTutor?: CompanyTutor;
    academicTutor?: AcademicTutor;
}

export default class Internship extends Entity<IInternshipProps> {
    public getAcademicTutor(): AcademicTutor | undefined {
        return this.props.academicTutor;
    }

    public setAcademicTutor(academicTutor: AcademicTutor): void {
        this.props.academicTutor = academicTutor;
    }

    public getCompanyTutor(): CompanyTutor | undefined {
        return this.props.companyTutor;
    }

    public setCompanyTutor(companyTutor: CompanyTutor): void {
        this.props.companyTutor = companyTutor;
    }

    public getCompany(): Company | undefined {
        return this.props.company;
    }

    public setCompany(company: Company): void {
        this.props.company = company;
    }
}
