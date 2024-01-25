export interface IAddDocumentRequestModel {
    id: string;
    documentName: string;
    documentPath: string;
    levelOfConfidentiality: number;
    internshipId: string;
    file: Express.Multer.File[];
}
