import Document from '@core/entities/document.entity';
import { IDocumentDto } from '@core/interfaces/dtos/document.dto';
import IEntityMapper from './i-entity-mapper';

export default class DocumentMapper
    implements IEntityMapper<Document, IDocumentDto>
{
    public toDomain(raw: { [key: string]: any }): Document {
        return new Document({
            documentName: raw.documentName,
            documentPath: raw.documentPath,
            levelOfConfidentiality: raw.levelOfConfidentiality
            internshipId: raw.internshipId
        });
    }

    public toDTO(document: Document): any {
        return { ...document.getProps() };
    }
}
