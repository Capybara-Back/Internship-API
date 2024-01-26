import {IAcademicTutorDto} from "../../../core/interfaces/dtos/academic-tutor.dto";
import IController from "../interfaces/i-controller";
import {IAcademicTutorRepository} from "../../../core/use-cases/interfaces/i-entity-operation";
import GetAllAcademicTutorsUseCase from "../../../core/use-cases/academic-tutors/get-all-academic-tutors.use-case";

export default class GetAllAcademicTutorsController 
    implements IController<IAcademicTutorDto[]> 
{
    private academicTutorRepository: IAcademicTutorRepository;

    public constructor(academicTutorRepository: IAcademicTutorRepository) {
        this.academicTutorRepository = academicTutorRepository;
    }

    processRequest(_: any): Promise<IAcademicTutorDto[]> {
        return new GetAllAcademicTutorsUseCase(
            this.academicTutorRepository
        ).perform(_);
    }
}


