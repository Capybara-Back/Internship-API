import Deliverer from '../interfaces/deliverer.abstract';
import { GetApplicantController } from '../../../../adapters/controllers/applicants';
import { getApplicantvalidator } from '../../../../adapters/validators/use-cases/applicants';
import { NextFunction, Request, Response } from 'express';
import { ApplicantsRepositoryFactory } from '../.../../../../database/repositories';

export default class GetApplicantDeliverer extends Deliverer {
    public constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    public async respond(): Promise<void> {
        const applicantsRepository = new ApplicantsRepositoryFactory().create(
            'POSTGRES'
        );

        const repositories = {
            applicants: applicantsRepository
        };

        const getApplicantController = new GetApplicantController(
            getApplicantvalidator,
            repositories
        );

        const mappedHttpRequest = this.mapHttpRequest(this.req);

        try {
            this.res
                .send(
                    await getApplicantController.processRequest(
                        mappedHttpRequest
                    )
                )
                .status(200);
        } catch (err: any) {
            this.handleError(err);
        }
    }
}
