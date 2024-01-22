import Internship from './internship.entity';
import Entity from './interfaces/entity.abstract';

interface IDocumentProps {
    id: string;
    documentName: string;
    documentPath: string;
    leveOfConfidentiality: number;
    internshipId: Internship;
    file: File;
}

export default class Document extends Entity<IDocumentProps> {}
