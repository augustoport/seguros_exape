import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../base/base.component";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {Usuario} from "../../model/usuario";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  model: Usuario = new Usuario();
  loginForm!: FormGroup;

  constructor(
    router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      senha: ["", [Validators.required]],
    });
    setTimeout(() => {
      $('#loaderBox').fadeOut();
    }, 1000);
  }

  onLogin() {
    this.model.email = this.loginForm.value.email;
    this.model.senha = this.loginForm.value.senha;

    const arrValidateFields = [
      {value: this.model.email, text: 'Email*,<br>'},
      {value: this.model.senha, text: 'Senha*.<br>'},
    ];

    const stringError = this.validateField(arrValidateFields);

    if (!super.isNullOrUndefined(stringError)) {
      this.showMessage('Atenção', `Preencha os campos corretamente: <br><br> ${stringError}`, 'warning');
      return;
    }

    if (!super.isEMailValid(this.model.email)) {
      return;
    }

    this.userService.login(this.model).subscribe({
      next: (data: any) => {
        this.setToken(data.token);
        this.setId(data.user.id);
        this.router.navigate(['/']).then();
      }
      , error: (err: any) => super.onError(err)
    });
  }

}
