import {Component, OnInit} from '@angular/core';
import {Cotacao} from "../../model/cotacao";
import {Usuario} from "../../model/usuario";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {BaseComponent} from "../../base/base.component";
import {CotacaoService} from "../../service/cotacao.service";

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  modelList: Cotacao[] = [];
  model: Cotacao = new Cotacao();
  modelResponse: Cotacao = new Cotacao();
  modelUser: Usuario = new Usuario();
  cotacaoForm!: FormGroup;

  constructor(
    router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private cotacaoService: CotacaoService
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.cotacaoForm = this.fb.group({
      tipo: ["", [Validators.required]],
      valor: [0, [Validators.required]],
      parcelas: [0, [Validators.required]],
    });
    this.getCotacoes();
    setTimeout(() => {
      $('#loaderBox').fadeOut();
    }, 1000);
  }

  OpenModal() {
    this.model = new Cotacao();
    $('#cotacaoModal').modal('show');
  }

  getCotacoes() {
    this.cotacaoService.cotacaoByUser(localStorage.getItem('id')).subscribe({
      next: (data: any) => {
        this.modelList = data as Cotacao[];
      }
      , error: (err: any) => super.onError(err)
    });
  }

  onSim() {
    this.model.tipo = this.cotacaoForm.value.tipo;
    this.model.parcelas = this.cotacaoForm.value.parcelas;
    this.model.valor = this.cotacaoForm.value.valor;
    this.cotacaoService.simulacao(this.model).subscribe({
      next: (data: any) => {
        this.modelResponse = data as Cotacao;
        this.modelResponse = Object.assign({}, data);
        this.closeModal('cotacaoModal')
        $('#simulacaoModal').modal('show');
      }
      , error: (err: any) => super.onError(err)
    });
  }

  actionSave() {
    this.cotacaoService.create(this.modelResponse, localStorage.getItem('id')).subscribe({
      next: (data: any) => {
        this.modelResponse = data as Cotacao;
        this.getCotacoes();
        this.closeModal('simulacaoModal')
      }
      , error: (err: any) => super.onError(err)
    });
  }
}
