import Entity from './interfaces/entity.abstract';
import { ITutorProps } from './tutor.entity';

interface IAcademicTutorProps extends ITutorProps {
    schoolEmail: string;
}

export default class AcademicTutor extends Entity<IAcademicTutorProps> {}
