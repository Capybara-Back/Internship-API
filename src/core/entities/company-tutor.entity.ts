import Entity from './interfaces/entity.abstract';
import { ITutorProps } from './tutor.entity';

export interface ICompanyTutorProps extends ITutorProps {
    companyName?: string;
}

export default class CompanyTutor extends Entity<ICompanyTutorProps> {}
