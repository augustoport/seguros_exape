import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../model/usuario";
import {BaseComponent} from "../../base/base.component";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  model: Usuario = new Usuario();

  constructor(
    router: Router,
    private userService: UserService
  ) {
    super(router)
  }

  ngOnInit(): void {

    this.userService.user.subscribe({
      next: data => {
        if (!this.isNullOrUndefined(data.id)) {
          this.model = data as Usuario;
        }
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
