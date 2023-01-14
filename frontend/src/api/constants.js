// API

/////////////// User Service ///////////////
const URL_USER_SVC = 'http://localhost:8000/api/user';

const PREFIX_USER_SVC_SIGNUP = '/signup';
const PREFIX_USER_SVC_SIGNIN = '/signin';
const PREFIX_USER_SVC_SIGNOUT = '/signout';

export const URL_USER_SVC_SIGNUP = URL_USER_SVC + PREFIX_USER_SVC_SIGNUP;
export const URL_USER_SVC_SIGNIN = URL_USER_SVC + PREFIX_USER_SVC_SIGNIN;
export const URL_USER_SVC_SIGNOUT = URL_USER_SVC + PREFIX_USER_SVC_SIGNOUT;

/////////////// Chat Service ///////////////
// Socket
export const URL_CHAT_SVC_SOCKET =  'http://localhost:8002'; 
export const PATH_CHAT_SVC_SOCKET = '/api/chat-service/socket';

// API
const URL_CHAT_SVC = 'http://localhost:8002/api/chat';

const PREFIX_CHAT_SVC_READ = '/read?bottleID=';
const PREFIX_CHAT_SVC_LATEST = '/latest?bottleID=';

export const URL_CHAT_SVC_READ = URL_CHAT_SVC + PREFIX_CHAT_SVC_READ;
export const URL_CHAT_SVC_LATEST = URL_CHAT_SVC + PREFIX_CHAT_SVC_LATEST;

/////////////// Bottle Service ///////////////

const URL_BOTTLE_SVC = 'http://localhost:8001/api/bottle';

const PREFIX_BOTTLE_SVC_CREATE = '/create';
const PREFIX_BOTTLE_SVC_FIND = '/find';
const PREFIX_BOTTLE_SVC_THROW = '/throw';
const PREFIX_BOTTLE_SVC_COLLECT = '/collect';
const PREFIX_BOTTLE_SVC_GET_BOTTLES = '/get';

export const URL_BOTTLE_SERVICE_CREATE = URL_BOTTLE_SVC + PREFIX_BOTTLE_SVC_CREATE;
export const URL_BOTTLE_SERVICE_FIND = URL_BOTTLE_SVC + PREFIX_BOTTLE_SVC_FIND;
export const URL_BOTTLE_SERVICE_THROW = URL_BOTTLE_SVC + PREFIX_BOTTLE_SVC_THROW;
export const URL_BOTTLE_SERVICE_COLLECT = URL_BOTTLE_SVC + PREFIX_BOTTLE_SVC_COLLECT;
export const URL_BOTTLE_SERVICE_GET_BOTTLES = URL_BOTTLE_SVC + PREFIX_BOTTLE_SVC_GET_BOTTLES;
