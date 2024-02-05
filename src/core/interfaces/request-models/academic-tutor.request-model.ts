import type { IGetAllRequestModel } from './get-all.request-model';
import { IAddTutorRequestModel } from './tutor.request-model';

export interface IAddAcademicTutorRequestModel extends IAddTutorRequestModel {}

export interface IGetAllAcademicTutorRequestModel extends IGetAllRequestModel {}
