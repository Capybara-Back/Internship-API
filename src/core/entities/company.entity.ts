import Entity from './interfaces/entity.abstract';
import Internship from './internship.entity';

interface ICompanyProps {
    name: string;
    address: string;
    city: string;
    zipCode: string;
}

export default class Company extends Entity<ICompanyProps> {}
