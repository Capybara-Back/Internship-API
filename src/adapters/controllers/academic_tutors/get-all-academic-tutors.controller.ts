import { IAcademicTutorDto } from '../../../core/interfaces/dtos/academic-tutor.dto';
import GetAllAcademicTutorsUseCase from '../../../core/use-cases/academic-tutors/get-all-academic-tutors.use-case';
import { IAcademicTutorRepository } from '../../../core/use-cases/interfaces/i-entity-operation';
import IController from '../interfaces/i-controller';
import type IHttpRequestModel from '../interfaces/i-http-request.model';

export default class GetAllAcademicTutorsController
    implements IController<IAcademicTutorDto[]>
{
    private academicTutorRepository: IAcademicTutorRepository;

    public constructor(academicTutorRepository: IAcademicTutorRepository) {
        this.academicTutorRepository = academicTutorRepository;
    }

    processRequest(req: IHttpRequestModel): Promise<IAcademicTutorDto[]> {
        const requestModel = {
            querySearch: req.query.q as string
        };
        return new GetAllAcademicTutorsUseCase(
            this.academicTutorRepository
        ).perform(requestModel);
    }
}
