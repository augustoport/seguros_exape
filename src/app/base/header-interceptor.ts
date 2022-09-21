import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {finalize} from 'rxjs/operators';

declare var $: any;

@Injectable()
export class HeaderHttpInterceptor implements HttpInterceptor {

  requests = 0;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests = this.requests + 1;
    this.toggleLoader(true);

    if (req.url.indexOf(environment.base_url) <= -1) {
      return next.handle(req).pipe(
        finalize(() => {
          this.requests = this.requests - 1;
          if (this.requests === 0) {
            this.toggleLoader(false);
          }
        })
      );
    }

    const token = localStorage.getItem('token') as string;
    const culture = localStorage.getItem('culture') as string;

    let newHeaders = req.headers;
    if (token != null) {
      newHeaders = newHeaders.append('Authorization', 'Bearer ' + token);
      // authReq = req.clone(
      //   {
      //     headers: req.headers.set('Authorization', 'Bearer ' + token)
      //   }
      // );
    }
    if (culture != null) {
      newHeaders = newHeaders.append('Culture', culture);
    }

    const authReq = req.clone({headers: newHeaders});
    return next.handle(authReq).pipe(
      finalize(() => {
        this.requests = this.requests - 1;
        if (this.requests === 0) {
          this.toggleLoader(false);
          // this.loading.hide();
        }
      })
    );
  }

  toggleLoader(b: boolean) {
    if (!b) {
      $('#loaderBox').fadeOut();
    } else {
      $('#loaderBox').fadeIn();
    }
  }

}
