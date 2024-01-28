
export interface DocumentFile {
    name: string;
    content?: Buffer
    type: string;
    path: string;
}

export interface IUploadDocumentsService {
    uploadDocuments(files: DocumentFile[]): Promise<any[]>;
}