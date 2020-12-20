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

const password = new FormControl('', [Validators.required, Validators.minLength(7)]);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    public loaderService: LoaderService,
    private _authservice: AuthService,
    private snackbarService: SnackbarService,
    private SessionService: SessionService,) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, CustomValidators.email]],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }


  onSubmit() {
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    let signUpData = { ...this.form.value };
    delete signUpData.confirmPassword;
    this.loaderService.show();
    this.SessionService.register(signUpData).subscribe(
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
