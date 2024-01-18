import AcademicTutor from './academic-tutor.entity';
import CompanyTutor from './company-tutor.entity';
import Company from './company.entity';
import Entity from './interfaces/entity.abstract';

interface IInternshipProps {
    studentId: string;
    startDate: Date;
    endDate: Date;
    title: string;
    missionDescription: string;
    company?: Company;
    companyId: string;
    companyTutor?: CompanyTutor;
    companyTutorId: string;
    academicTutor?: AcademicTutor;
    academicTutorId: string;
}

export default class Internship extends Entity<IInternshipProps> {}
