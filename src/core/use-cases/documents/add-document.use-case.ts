import IUseCase from '@core/interfaces/i-use-case';
import { IAddDocumentRequestModel } from '@core/interfaces/request-models/document.request-model';
import Document from '@core/entities/document.entity';
import { IDocumentDto } from '@core/interfaces/dtos/document.dto';
import IEntityMapper from '@core/lib/mappers/i-entity-mapper';
import DocumentMapper from '@core/lib/mappers/document.mapper';
import { IDocumentRepository } from '../interfaces/i-entity-operation';

export default class AddDocumentUseCase
    implements IUseCase<IAddDocumentRequestModel, IDocumentDto>
{
    private documentRepository: IDocumentRepository;
    private dataMapper: IEntityMapper<Document, IDocumentDto>;

    public constructor(documentRepository: IDocumentRepository) {
        this.documentRepository = documentRepository;
        this.dataMapper = new DocumentMapper();
    }

    async perform(
        requestModel: IAddDocumentRequestModel
    ): Promise<IDocumentDto> {
        const document = this.transformRequestModelIntoEntity(requestModel);
        const savedEntity = await this.documentRepository.save(document);
        return this.dataMapper.toDTO(savedEntity);
    }

    transformRequestModelIntoEntity(
        requestModel: IAddDocumentRequestModel
    ): Document {
        const { documentName, leveOfConfidentiality, file } = requestModel;

        return new Document({
            id,
            documentName,
            documentPath,
            leveOfConfidentiality,
            internshipId:
                internship != null
                    ? new Internship({
                          // TODO
                      })
                    : undefined
        });
    }
}
