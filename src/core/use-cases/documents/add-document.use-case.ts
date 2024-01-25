import IUseCase from '@core/interfaces/i-use-case';
import { IAddDocumentRequestModel } from '@core/interfaces/request-models/document.request-model';
import Document from '@core/entities/document.entity';
import { IDocumentDto } from '@core/interfaces/dtos/document.dto';
import IEntityMapper from '@core/lib/mappers/i-entity-mapper';
import DocumentMapper from '@core/lib/mappers/document.mapper';
import {
    IDocumentRepository,
    IInternshipRepository
} from '../interfaces/i-entity-operation';

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
});

export default class AddDocumentUseCase
    implements IUseCase<IAddDocumentRequestModel, IDocumentDto>
{
    private documentRepository: IDocumentRepository;
    private internshipRepository: IInternshipRepository;
    private dataMapper: IEntityMapper<Document, IDocumentDto>;

    public constructor(
        documentRepository: IDocumentRepository,
        internshipRepository: IInternshipRepository
    ) {
        this.documentRepository = documentRepository;
        this.internshipRepository = internshipRepository;
        this.dataMapper = new DocumentMapper();
    }

    async perform(
        requestModel: IAddDocumentRequestModel
    ): Promise<IDocumentDto> {
        const document = this.transformRequestModelIntoEntity(requestModel);
        const savedEntity = await this.documentRepository.save(document);

        // BEGIN S3 UPLOAD
        const file = requestModel.file as Express.Multer.File[];

        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME || '',
            Key: file[0].originalname,
            Body: file[0].buffer,
            ContentType: file[0].mimetype
        };

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME || '',
            Key: file[0].originalname,
            Body: file[0].buffer,
            ContentType: file[0].mimetype
        });

        try {
            const response = await client.send(command);
            console.log(response);
            //res.status(200).send('File uploaded to S3 successfully!');
        } catch (error) {
            console.error(error);
            //res.status(500).send('Error uploading file to S3');
        }

        // END S3 UPLOAD

        return this.dataMapper.toDTO(savedEntity);
    }

    transformRequestModelIntoEntity(
        requestModel: IAddDocumentRequestModel
    ): Document {
        const { documentName, levelOfConfidentiality, internshipId, file } =
            requestModel;

        return new Document({
            id: 'todo',
            documentName,
            documentPath: 'b',
            levelOfConfidentiality,
            internshipId,
            file
        });
    }
}
