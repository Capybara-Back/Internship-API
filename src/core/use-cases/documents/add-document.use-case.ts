import IUseCase from '@core/interfaces/i-use-case';
import { IAddDocumentFormData, IAddDocumentRequestModel } from '@core/interfaces/request-models/document.request-model';
import Document from '@core/entities/document.entity';
import { IDocumentDto } from '@core/interfaces/dtos/document.dto';
import IEntityMapper from '@core/lib/mappers/interfaces/i-entity-mapper';
import DocumentMapper from '@core/lib/mappers/document.mapper';
import {
    IDocumentRepository,
} from '../interfaces/i-entity-operation';

import { DocumentFile, IUploadDocumentsService } from '@core/lib/services/i-upload-documents.service';
import fs from 'fs/promises';

export default class AddDocumentUseCase
    implements IUseCase<IAddDocumentFormData, IDocumentDto[]>
{
    private documentRepository: IDocumentRepository;
    private uploadDocumentsService: IUploadDocumentsService;
    private dataMapper: IEntityMapper<Document, IDocumentDto>;

    public constructor(
        documentRepository: IDocumentRepository,
        uploadDocumentsService: IUploadDocumentsService
    ) {
        this.documentRepository = documentRepository;
        this.uploadDocumentsService = uploadDocumentsService;
        this.dataMapper = new DocumentMapper();
    }

    async perform(
        formData: IAddDocumentFormData
    ): Promise<IDocumentDto[]> {
        const processedDocuments = await Promise.all(formData.documents.map(async (document) => {
            return {
                ...document,
                content: await fs.readFile(document.path)
            }
        }));

        const response = await this.uploadDocumentsService.uploadDocuments(processedDocuments);

        const entities = this.transformFormDocumentToEntities(processedDocuments, formData.internshipId);
        const savedEntities = await this.documentRepository.insertMany(entities);
        return savedEntities.map(entity => this.dataMapper.toDTO(entity)) ;
    }

    private transformFormDocumentToEntities(documents: DocumentFile[], internshipId: string): Document[] {
        return documents.map((document) => {
            return new Document({
                name: document.name,
                path: document.path,
                levelOfConfidentiality: 1,
                internshipId
            });
        });
    }
}
