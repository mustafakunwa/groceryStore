import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SessionService } from '../session.service';
import { AuthService, LoaderService } from '../../services';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    public loaderService: LoaderService,
    private _authservice: AuthService,
    private snackbarService: SnackbarService,
    private SessionService: SessionService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    let signUpData = {
      email: this.form.value.uname,
      password: this.form.value.password,
    };
    this.loaderService.show();
    this.SessionService.signIn(signUpData).subscribe(
      res => {
        this.loaderService.hide();
        if (res && res.token) {
          this._authservice.setuserData(res.token)
          this.router.navigate(['/']);
        }
      },
      err => {
        this.loaderService.hide();
        if (err.status == 0) {
          this.snackbarService.openSnackBar('error', 'server connection lost');
        }
        else if (err.status == 400 || err.status == 401 || err.status == 403 || err.status == 404 || err.status == 401) {
          this.snackbarService.openSnackBar('error', err.error.message);
        }
        else if (err.status == 500) {
          this.snackbarService.openSnackBar('error', 'Internal Server Error');
        }
      }
    )

  }
}
