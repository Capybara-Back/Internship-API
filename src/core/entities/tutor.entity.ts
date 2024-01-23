import Entity from './interfaces/entity.abstract';

export interface ITutorProps {
    id?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    companyName?: string;
}

export default abstract class Tutor extends Entity<ITutorProps> {}
