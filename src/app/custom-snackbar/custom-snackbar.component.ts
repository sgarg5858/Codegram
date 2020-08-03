import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.css']
})
export class CustomSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
  private _snackRef: MatSnackBarRef<any>,
  ) { }

  ngOnInit(): void {
  }
  closeSnackbar()
  {
    this._snackRef.dismiss();
  }

}
