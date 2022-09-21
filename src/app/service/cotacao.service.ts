import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ServiceBase} from "../base/service.base";
import {Cotacao} from "../model/cotacao";

@Injectable({
  providedIn: 'root'
})
export class CotacaoService extends ServiceBase {

  private userDataSource = new BehaviorSubject<Cotacao>(new Cotacao());
  user = this.userDataSource.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  create(model: any, id_usuario: any) {
    const url = `${this.BASE_URL}cotacao/${id_usuario}`;
    return this.http.post(url, model);
  }

  simulacao(model: any) {
    const url = `${this.BASE_URL}cotacao/processamento`;
    return this.http.post(url, model);
  }

  cotacaoByUser(id_usuario: any) {
    const url = `${this.BASE_URL}cotacao/${id_usuario}`;
    return this.http.get(url);
  }

}
