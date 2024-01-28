import Entity from './interfaces/entity.abstract';

interface IDocumentProps {
    name: string;
    path: string;
    levelOfConfidentiality: number;
    internshipId: string;
}

export default class Document extends Entity<IDocumentProps> { }
