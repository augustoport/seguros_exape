import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export class ServiceBase {

  public BASE_URL = environment.base_url;

  constructor(public http: HttpClient) {
  }

  public getToken() {
    return localStorage.getItem('token') as string;
  }

  public header() {
    const customHeaders: HttpHeaders = new HttpHeaders();
    customHeaders.append('Content-Type', 'application/json');

    const token = localStorage.getItem('token') as string;

    if (token != null) {
      customHeaders.append('Authorization', 'Bearer ' + token);
    }
    return {headers: customHeaders};
  }

}
