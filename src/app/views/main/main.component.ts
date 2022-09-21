import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../base/base.component";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {CotacaoService} from "../../service/cotacao.service";
import {Usuario} from "../../model/usuario";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {

  model: Usuario = new Usuario()

  constructor(
    router: Router,
    private userService: UserService,
  ) {
    super(router);
  }

  ngOnInit(): void {
    if (!this.isNullOrUndefined(localStorage.getItem('id'))) {
      this.getUser();
    } else {
      this.router.navigate(['/login'])
    }
  }

  getUser() {
    this.userService.getUser(localStorage.getItem('id')).subscribe({
      next: (data: any) => {
        this.model = data as Usuario;
        this.userService.updateUser(this.model);
      }, error: (err: any) => super.onError(err)
    });
  }

}
