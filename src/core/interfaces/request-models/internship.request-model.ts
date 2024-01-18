import { IAddAcademicTutorRequestModel } from './academic-tutor.request-model';
import { IAddCompanyTutorRequestModel } from './company-tutor.request-model';

export interface IAddInternsipRequestModel {
    title: string;
    missionDescription: string;
    startDate: Date;
    endDate: Date;
    studentId: string;
    academicTutorId: string;
    academicTutor: IAddAcademicTutorRequestModel;
    companyTutorId: string;
    companyTutor: IAddCompanyTutorRequestModel;
}
