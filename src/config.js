

//use for local develoment
//export const API_BASE_URL = 'http://localhost:8081';

//use for production
export const API_BASE_URL = `http://${window.location.href.split('/')[2].split(':')[0]}:8081` || 'http://127.0.0.1:8081';
