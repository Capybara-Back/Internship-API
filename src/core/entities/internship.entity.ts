import Entity from './interfaces/entity.abstract';

interface IInternshipProps {
    studentId: string;
    academicTutorId: string;
    date: Date;
    title: string;
}

export default class Internship extends Entity<IInternshipProps> {
    public static create(
        internshipData: IInternshipProps,
        id?: string
    ): Internship {
        const { studentId, date, title, academicTutorId } = internshipData;

        const internship: IInternshipProps = {
            studentId,
            academicTutorId,
            date,
            title
        };

        return new Internship(internship, id || null);
    }
}
