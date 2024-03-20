export enum HttpStatusCode {
  CONTINUE = 100,

  SWITCHING_PROTOCOLS = 101,

  PROCESSING = 102,

  OK = 200,

  CREATED = 201,

  ACCEPTED = 202,

  NON_AUTHORITATIVE_INFORMATION = 203,

  MULTIPLE_CHOICES = 300,

  MOVED_PERMANENTLY = 301,

  FOUND = 302,

  SEE_OTHER = 303,

  NOT_MODIFIED = 304,

  TEMPORARY_REDIRECT = 307,

  PERMANENT_REDIRECT = 308,

  BAD_REQUEST = 400,

  UNAUTHORIZED = 401,

  PAYMENT_REQUIRED = 402,

  FORBIDDEN = 403,

  NOT_FOUND = 404,

  METHOD_NOT_ALLOWED = 405,

  TOO_MANY_REQUESTS = 429,

  INTERNAL_SERVER_ERROR = 500,

  NOT_IMPLEMENTED = 501,

  BAD_GATEWAY = 502,

  SERVICE_UNAVAILABLE = 503,

  GATEWAY_TIMEOUT = 504,

  HTTP_VERSION_NOT_SUPPORTED = 505,
}

export interface IHttpConfig {
  withCredentials?: boolean;
  url?: string;
  headers?: Record<string, string>;
}

export interface IHttpClient {
  get<R>(url: string, config?: IHttpConfig): Promise<R | void>;
  post<R, D>(url: string, data: D, config?: IHttpConfig): Promise<R | void>;
  patch<R, D>(url: string, data: D, config?: IHttpConfig): Promise<R | void>;
  put<R, D>(url: string, data: D, config?: IHttpConfig): Promise<R | void>;
  delete<R>(url: string, config?: IHttpConfig): Promise<R | void>;
}

export interface IResponse<T = object | object[]> {
  status: HttpStatusCode;
  data: T;
}

export interface IErrorData {
  statusCode: number;
  message: string;
}
