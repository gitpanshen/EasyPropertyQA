import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

enum Colors {
  Danger = '#c9302c',
}

@Injectable()
export class UIContext {

  public handleError(err: any, title?: string, message?: string, dismissCallback?: () => void) {
    console.error(err);
    let errMsg: string;
    if (err['_body']) {
      try {
        errMsg = JSON.parse(err['_body']).err;
      } catch (e) {
        //
      }
    }
    if (!errMsg) {
      errMsg = `${err}`;
    }

    swal({
      title: title ? title : 'Ooops...',
      text: message ? message : `Something went wrong. ${errMsg}`,
      type: 'error',
      confirmButtonColor: Colors.Danger,
      confirmButtonText: 'Dismiss'
    }).then(() => {
      if (dismissCallback) {
        dismissCallback();
      }
    });
  }

}
