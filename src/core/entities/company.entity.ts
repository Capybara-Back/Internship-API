import Entity from './interfaces/entity.abstract';

interface ICompanyProps {
    name: string;
    address: string;
    city: string;
    zipCode: string;
}

export default class Company extends Entity<ICompanyProps> {}
