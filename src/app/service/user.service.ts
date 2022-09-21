import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ServiceBase} from "../base/service.base";
import {Usuario} from "../model/usuario";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceBase {

  private userDataSource = new BehaviorSubject<Usuario>(new Usuario());
  user = this.userDataSource.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  login(model: any) {
    const url = `${this.BASE_URL}/login`;
    return this.http.post(url, model);
  }

  logout() {
    const url = `${this.BASE_URL}/logout`;
    return this.http.get(url);
  }

  create(model: any) {
    const url = `${this.BASE_URL}usuario`;
    return this.http.post(url, model);
  }

  getUser(id_usuario: any) {
    const url = `${this.BASE_URL}usuario/${id_usuario}`;
    return this.http.get(url);
  }

  RemoveUser(id_usuario: any) {
    const url = `${this.BASE_URL}usuario/${id_usuario}}`;
    return this.http.delete(url);
  }

  updateUser(user: Usuario) {
    this.userDataSource.next(user);
  }

}
