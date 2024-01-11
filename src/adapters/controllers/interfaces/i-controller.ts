import IHttpRequestModel from './i-http-request.model';

export default interface IController<T> {
    processRequest(req: IHttpRequestModel): Promise<T>;
}
