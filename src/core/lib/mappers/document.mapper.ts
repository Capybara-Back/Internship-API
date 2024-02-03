import Document from '@core/entities/document.entity';
import { IDocumentDto } from '@core/interfaces/dtos/document.dto';
import EntityMapper from './entity.mapper';

export default class DocumentMapper extends EntityMapper<
    Document,
    IDocumentDto
> {
    public toDomain(raw: { [key: string]: any }): Document {
        return new Document(
            {
                name: raw.name,
                path: raw.path,
                levelOfConfidentiality: raw.levelOfConfidentiality,
                internshipId: raw.internshipId
            },
            raw.id
        );
    }

    public toDTO(document: Document): any {
        return { ...document.getProps() };
    }
}
