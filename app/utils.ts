import { json } from '@remix-run/server-runtime';
import { User } from '@prisma/client';
import { authenticator } from './services/auth.server';
import { getSession } from './services/session.server';

export function getRedirectParams(request: Request) {
  const redirectTo = new URL(request.url).pathname;
  return new URLSearchParams([['redirectTo', redirectTo]]);
}

export async function getSearchParams(request: Request, name: string) {
  return new URL(request.url).searchParams.get(name);
}

export async function getSessionUserId(request: Request): Promise<User['id']> {
  const session = await getSession(request.headers.get('Cookie'));
  return session.get(authenticator.sessionKey);
}

export async function setSessionUserId(request: Request, userId: User['id']) {
  const session = await getSession(request.headers.get('Cookie'));
  session.set(authenticator.sessionKey, userId);
  return session;
}

export const httpStatus = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Moved Temporarily',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm A Teapot",
  419: 'Insufficient Space On Resource',
  420: 'Method Failure',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  507: 'Insufficient Storage',
  511: 'Network Authentication Required',
} as const;

export type HttpStatusCode = keyof typeof httpStatus;
export type HttpReasonPhrase = (typeof httpStatus)[keyof typeof httpStatus];
export type JsonHttpResponse = {
  response: {
    statusCode: HttpStatusCode;
    reasonPhrase: HttpReasonPhrase;
    message: string | null;
  };
};

export function jsonHttpResponse(statusCode: HttpStatusCode, msg?: string) {
  const reasonPhrase = httpStatus[statusCode];
  const message = msg || null;
  const response = {
    statusCode,
    reasonPhrase,
    message,
  };
  return json<JsonHttpResponse>({ response }, statusCode);
}
