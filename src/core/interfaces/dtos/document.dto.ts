import { IAcademicTutorDto } from './academic-tutor.dto';
import { ICompanyTutorDto } from './company-tutor.dto';
import { ICompanyDto } from './company.dto';
import { IStudentDto } from './student.dto';

export interface IDocumentDto {
    id: string;
    documentName: string;
    documentPath: string;
    levelOfConfidentiality: number;
    internshipId: string;
    file: File;
}
