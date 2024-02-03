export interface DocumentFile {
    originalName: string;
    name: string;
    content?: Buffer;
    type: string;
    path: string;
}

export interface IUploadDocumentsService {
    uploadDocuments(files: DocumentFile[]): Promise<Record<string, string>>;
}
