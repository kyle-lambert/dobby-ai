export const httpStatus = {
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
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  511: 'Network Authentication Required',
} as const;

// const httpStatus = {
//   BAD_REQUEST: { name: 'Bad Request', code: 400 },
//   UNAUTHORIZED: { name: 'Unauthorized', code: 401 },
//   PAYMENT_REQUIRED: { name: 'Payment Required', code: 402 },
//   FORBIDDEN: { name: 'Forbidden', code: 403 },
//   NOT_FOUND: { name: 'Not Found', code: 404 },
//   METHOD_NOT_ALLOWED: { name: 'Method Not Allowed', code: 405 },
//   NOT_ACCEPTABLE: { name: 'Not Acceptable', code: 406 },
//   PROXY_AUTHENTICATION_REQUIRED: {
//     name: 'Proxy Authentication Required',
//     code: 407,
//   },
//   REQUEST_TIMEOUT: { name: 'Request Timeout', code: 408 },
//   CONFLICT: { name: 'Conflict', code: 409 },
//   GONE: { name: 'Gone', code: 410 },
//   LENGTH_REQUIRED: { name: 'Length Required', code: 411 },
//   PRECONDITION_FAILED: { name: 'Precondition Failed', code: 412 },
//   REQUEST_TOO_LONG: { name: 'Request Entity Too Large', code: 413 },
//   REQUEST_URI_TOO_LONG: { name: 'Request-URI Too Long', code: 414 },
//   UNSUPPORTED_MEDIA_TYPE: { name: 'Unsupported Media Type', code: 415 },
//   REQUESTED_RANGE_NOT_SATISFIABLE: {
//     name: 'Requested Range Not Satisfiable',
//     code: 416,
//   },
//   EXPECTATION_FAILED: { name: 'Expectation Failed', code: 417 },
//   IM_A_TEAPOT: { name: "I'm a teapot", code: 418 },
//   INSUFFICIENT_SPACE_ON_RESOURCE: {
//     name: 'Insufficient Space on Resource',
//     code: 419,
//   },
//   METHOD_FAILURE: { name: 'Method Failure', code: 420 },
//   MISDIRECTED_REQUEST: { name: 'Misdirected Request', code: 421 },
//   UNPROCESSABLE_ENTITY: { name: 'Unprocessable Entity', code: 422 },
//   LOCKED: { name: 'Locked', code: 423 },
//   FAILED_DEPENDENCY: { name: 'Failed Dependency', code: 424 },
//   PRECONDITION_REQUIRED: { name: 'Precondition Required', code: 428 },
//   TOO_MANY_REQUESTS: { name: 'Too Many Requests', code: 429 },
//   REQUEST_HEADER_FIELDS_TOO_LARGE: {
//     name: 'Request Header Fields Too Large',
//     code: 431,
//   },
//   UNAVAILABLE_FOR_LEGAL_REASONS: {
//     name: 'Unavailable For Legal Reasons',
//     code: 451,
//   },
//   INTERNAL_SERVER_ERROR: { name: 'Internal Server Error', code: 500 },
//   NOT_IMPLEMENTED: { name: 'Not Implemented', code: 501 },
//   BAD_GATEWAY: { name: 'Bad Gateway', code: 502 },
//   SERVICE_UNAVAILABLE: { name: 'Service Unavailable', code: 503 },
//   GATEWAY_TIMEOUT: { name: 'Gateway Timeout', code: 504 },
//   HTTP_VERSION_NOT_SUPPORTED: { name: 'HTTP Version Not Supported', code: 505 },
//   INSUFFICIENT_STORAGE: { name: 'Insufficient Storage', code: 507 },
//   NETWORK_AUTHENTICATION_REQUIRED: {
//     name: 'Network Authentication Required',
//     code: 511,
//   },
// } as const;

// type HttpStatusConstant = keyof typeof httpStatus;
// type HttpStatusName = (typeof httpStatus)[HttpStatusConstant]['name'];
// type HttpStatusCode = (typeof httpStatus)[HttpStatusConstant]['code'];

// export class HttpError extends Error {
//   public readonly code: HttpStatusCode;
//   public readonly name: HttpStatusName;

//   constructor(message: string, constant: HttpStatusConstant) {
//     super(message);

//     this.code = httpStatus[constant].code;
//     this.name = httpStatus[constant].name;
//   }
// }
