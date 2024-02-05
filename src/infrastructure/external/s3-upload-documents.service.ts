import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import logger from '@common/logger';
import {
    DocumentFile,
    IUploadDocumentsService
} from '@core/lib/services/i-upload-documents.service';

export default class S3UploadDocumentsService
    implements IUploadDocumentsService {
    private readonly s3Client: S3;
    private readonly bucketId: string;
    private readonly bucketUrl: string;

    public constructor() {
        const region = process.env.AWS_S3_REGION!;
        this.s3Client = new S3({
            region: region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        });
        this.bucketId = process.env.AWS_S3_BUCKET_NAME!;
        this.bucketUrl = `https://${this.bucketId}.s3.${region}.amazonaws.com`;
    }

    async uploadDocuments(
        files: DocumentFile[]
    ): Promise<Record<string, string>> {
        const errors: string[] = [];
        const uploadPromises = await Promise.all(
            files.map(async (file) => {
                const params = {
                    Bucket: this.bucketId,
                    Key: file.name,
                    Body: file.content,
                    ContentType: file.type
                };

                try {
                    const response = await this.s3Client.send(
                        new PutObjectCommand(params)
                    );
                    if (response.$metadata.httpStatusCode !== 200) {
                        errors.push(file.name);
                    }
                    return { [file.name]: `${this.bucketUrl}/${file.name}` };
                } catch (e) {
                    logger.error(e);
                    throw new Error('Unable to use AWS services');
                }
            })
        );
        logger.error(errors, 'Upload errors');

        return Object.assign({}, ...uploadPromises);
    }
}
