import { IncomingHttpHeaders } from 'http';

interface ParamsDictionary {
    [key: string]: string;
}

interface ParsedQueryString {
    [key: string]:
        | undefined
        | string
        | string[]
        | ParsedQueryString
        | ParsedQueryString[];
}

export default interface IHttpRequestModel {
    query: ParsedQueryString;
    params: ParamsDictionary;
    body: any;
    headers: IncomingHttpHeaders;
}
