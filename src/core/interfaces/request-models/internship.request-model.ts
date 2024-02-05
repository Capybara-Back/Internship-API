import { IAddAcademicTutorRequestModel } from './academic-tutor.request-model';
import { IAddCompanyTutorRequestModel } from './company-tutor.request-model';
import { IAddCompanyRequestModel } from './company.request-model';

export interface IAddInternshipRequestModel {
    title: string;
    missionDescription: string;
    startDate: Date;
    endDate: Date;
    salary: number;
    studentId: string;
    companyId?: string;
    company?: IAddCompanyRequestModel;
    academicTutorId?: string;
    academicTutor?: IAddAcademicTutorRequestModel;
    companyTutorId?: string;
    companyTutor?: IAddCompanyTutorRequestModel;
}
