import Document from '@core/entities/document.entity';
import { IDocumentDto } from '@core/interfaces/dtos/document.dto';
import IUseCase from '@core/interfaces/i-use-case';
import { IAddDocumentFormData } from '@core/interfaces/request-models/document.request-model';
import DocumentMapper from '@core/lib/mappers/document.mapper';
import IEntityMapper from '@core/lib/mappers/interfaces/i-entity-mapper';
import {
    IDocumentRepository,
    IInternshipRepository
} from '../interfaces/i-entity-operation';

import { ValueNotFoundError } from '@common/errors';
import {
    DocumentFile,
    IUploadDocumentsService
} from '@core/lib/services/i-upload-documents.service';
import fs from 'fs/promises';

export default class AddDocumentUseCase
    implements IUseCase<IAddDocumentFormData, IDocumentDto[]>
{
    private documentRepository: IDocumentRepository;
    private internshipRepository: IInternshipRepository;
    private uploadDocumentsService: IUploadDocumentsService;
    private dataMapper: IEntityMapper<Document, IDocumentDto>;

    public constructor(
        documentRepository: IDocumentRepository,
        internshipRepository: IInternshipRepository,
        uploadDocumentsService: IUploadDocumentsService
    ) {
        this.documentRepository = documentRepository;
        this.internshipRepository = internshipRepository;
        this.uploadDocumentsService = uploadDocumentsService;
        this.dataMapper = new DocumentMapper();
    }

    async perform(formData: IAddDocumentFormData): Promise<IDocumentDto[]> {
        const internship = await this.internshipRepository.findOne(
            formData.internshipId
        );
        if (internship === null) {
            throw new ValueNotFoundError('Internship not found');
        }

        const processedDocuments = await Promise.all(
            formData.documents.map(async (document) => {
                return {
                    ...document,
                    content: await fs.readFile(document.path)
                };
            })
        );

        const levelOfConfidentialityByFile = formData.metadata.reduce(
            (metadata: Record<string, number>, metadataFile) => {
                metadata[`${metadataFile.filename}`] =
                    metadataFile.levelOfConfidentiality;
                return metadata;
            },
            {}
        );

        const filesUrl =
            await this.uploadDocumentsService.uploadDocuments(
                processedDocuments
            );
        const entities = this.transformFormDocumentToEntities(
            processedDocuments,
            filesUrl,
            levelOfConfidentialityByFile,
            formData.internshipId
        );
        const savedEntities =
            await this.documentRepository.insertMany(entities);
        await this.deleteFiles(processedDocuments);

        return savedEntities.map((entity) => this.dataMapper.toDTO(entity));
    }

    private transformFormDocumentToEntities(
        documents: DocumentFile[],
        filesUrlDictionary: Record<string, string>,
        levelOfConfidentialityByFile: Record<string, number>,
        internshipId: string
    ): Document[] {
        return documents.map((document) => {
            return new Document({
                name: document.name,
                path: filesUrlDictionary[`${document.name}`],
                levelOfConfidentiality:
                    levelOfConfidentialityByFile[`${document.originalName}`],
                internshipId
            });
        });
    }

    private async deleteFiles(files: DocumentFile[]): Promise<void> {
        await Promise.all(
            files.map(async (file) => {
                await fs.unlink(file.path);
            })
        );
    }
}
