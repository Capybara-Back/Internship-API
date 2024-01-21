import Internship from './internship.entity';
import Entity from './interfaces/entity.abstract';

interface IDocumentProps {
    id: string;
    leveOfConfidentiality: number;
    name: string;
    path: string;
    internship: Internship;
}

export default class Document extends Entity<IDocumentProps> {}
