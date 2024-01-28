import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { DocumentFile, IUploadDocumentsService } from "@core/lib/services/i-upload-documents.service";

export default class S3UploadDocumentsService implements IUploadDocumentsService {
    private readonly s3Client: S3;
    private readonly bucketId: string;

    public constructor() {
        this.s3Client = new S3({
            region: process.env.AWS_S3_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            }
        });
        this.bucketId = process.env.AWS_S3_BUCKET_NAME!;
    }

    async uploadDocuments(files: DocumentFile[]): Promise<any[]> {
        const uploadPromises = files.map(async (file) => {
            const params = {
              Bucket: this.bucketId,
              Key: file.name,
              Body: file.content,
              ContentType: file.type
            };

            return await this.s3Client.send(new PutObjectCommand(params));
        });
        return Promise.all(uploadPromises);
    }
}