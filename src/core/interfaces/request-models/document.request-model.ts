import { DocumentFile } from '@core/lib/services/i-upload-documents.service';

export interface IAddDocumentMetadata {
    filename: string;
    levelOfConfidentiality: number;
}

export interface IAddDocumentFormData {
    metadata: IAddDocumentMetadata[];
    internshipId: string;
    documents: DocumentFile[];
}

export interface IAddDocumentRequestModel {
    data: string;
}
