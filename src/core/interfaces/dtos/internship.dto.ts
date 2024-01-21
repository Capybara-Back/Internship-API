import { IAcademicTutorDto } from './academic-tutor.dto';
import { ICompanyTutorDto } from './company-tutor.dto';
import { ICompanyDto } from './company.dto';
import { IStudentDto } from './student.dto';

export interface IInternshipDto {
    id: string;
    title: string;
    missionDescription: string;
    status: string;
    startDate: Date;
    endDate: Date;
    academicTutor: IAcademicTutorDto;
    companyTutor: ICompanyTutorDto;
    company: ICompanyDto;
    student: IStudentDto;
}
