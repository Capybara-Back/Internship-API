export interface IAddDocumentRequestModel {
    id: string;
    documentName: string;
    documentPath: string;
    leveOfConfidentiality: number;
    internshipId: string;
    file: File;
}
