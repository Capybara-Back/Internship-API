import Internship from './internship.entity';
import Entity from './interfaces/entity.abstract';

interface IDocumentProps {
    id: string;
    documentName: string;
    documentPath: string;
    levelOfConfidentiality: number;
    internshipId: string;
    file: Express.Multer.File[];
}

export default class Document extends Entity<IDocumentProps> { }
