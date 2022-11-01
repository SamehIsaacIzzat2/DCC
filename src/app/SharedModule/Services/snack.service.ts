import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable()
export class SnackService {

  private instance: MatSnackBarRef<any>;

  //=========Constructor=========
  constructor(private matSnack: MatSnackBar) { }

  //=======Services ==============
  snack(message: string, duration: number = 4000) {
    this.instance = this.matSnack.open(message, "✕", { duration: duration, panelClass: ['white-snackbar'] });
  }

  close() {
    if (this.instance)
      this.instance.dismiss();
  }

}
