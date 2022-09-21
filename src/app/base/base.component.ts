import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

declare var moment: any;
declare var $: any;

export class BaseComponent {

  constructor(public router: Router) {
  }

  labels: any = {
    previousLabel: ' ',
    nextLabel: ' ',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Selecionar Todos',
    unSelectAllText: 'Desmarcar Todos',
    itemsShowLimit: 3,
  };

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setId(id: string) {
    localStorage.setItem('id', id);
  }

  getBaseURL() {
    return environment.base_url;
  }

  showModal(id: any) {
    $('#' + id).modal('show');
  }

  closeModal(id: any) {
    $('#' + id).modal('hide');
  }

  showMessage(t: string, m: string, type: any = null) {
    Swal.fire({
      title: t,
      html: m,
      icon: type,
      confirmButtonColor: '#2CA338',
    });
  }

  confirmMessage(t: string, m: string, callback: any = null) {
    Swal.fire({
      title: t,
      text: m,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#2CA338',
      cancelButtonColor: '#dc3545'
    }).then((result) => {
      if (!this.isNullOrUndefined(result.value) && result.value === true) {
        if (callback != null) {
          callback();
        }
      }
    });
  }

  onError(error: any) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
      return;
    }

    // const e = JSON.parse(error['error']);

    if (error.status === 400) {
      console.log(error);
      this.showMessage('Atenção', error.error.message, 'warning');
      return;
    }

    if (error.status === 500) {
      this.showMessage('Atenção', 'Ocorreu um erro.', 'warning');
      return;
    }
  }

  isNullOrUndefined(value: any) {
    return typeof value === 'undefined' || value == null || value.length === 0;
  }

  validateField(obj: any) {
    let strError = ``;
    obj.map((e: any) => {
      if (this.isNullOrUndefined(e.value)) {
        strError += `${e.text}`;
      }
    });
    return strError;
  }

  isEMailValid(strEmail: string | undefined) {
    const str = strEmail;
    const exp = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    const testResult = exp.test(str!);
    if (!testResult) {
      this.showMessage('Atenção', 'Informe um e-mail válido para prosseguir.', 'warning');
    }
    return testResult;
  }

  handlerViewPassword(type: string = 'password') {
    const input = document.querySelector('#' + type);
    if (input!.getAttribute('type') === 'password') {
      input!.setAttribute('type', 'text');
    } else {
      input!.setAttribute('type', 'password');
    }
  }

  handlerViewPasswordIcon(type: string = 'password') {
    const input = document.querySelector('#' + type);
    return input!.getAttribute('type') === 'password';
  }

  objLocaleDateRangePicker() {
    return {
      customRangeLabel: 'Personalizar',
      format: 'DD/MM/YYYY',
      separator: ' - ',
      applyLabel: 'Aplicar',
      cancelLabel: 'Cancelar',
      daysOfWeek: [
        'Dom',
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sab'
      ],
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ],
      firstDay: 1
    };
  }

  toggleLoader(b: boolean) {
    if (!b) {
      $('#loaderBox').fadeOut();
    } else {
      $('#loaderBox').fadeIn();
    }
  }

}
