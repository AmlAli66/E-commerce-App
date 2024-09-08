import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { signupValidators } from '../../shared/validators/register-validator';
import { AlertErrorComponent } from "../../shared/alert-error/alert-error.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  isBtnSubmit: boolean = false;
  signinErrorMessage: string = "";

  signinForm = new FormGroup({
    email: new FormControl(null, signupValidators.email),
    password: new FormControl(null, signupValidators.password),
  })



  sendData() {
    this.isBtnSubmit = true;

    if (this.signinForm.valid) {
      this._AuthService.signin(this.signinForm.value).subscribe({
        next: (res) => {
          if (res.message == "success") {
            localStorage.setItem('token', res.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home'])
            this.isBtnSubmit = false;
          }
        }
        , error: (err: HttpErrorResponse) => {
          console.log('err');
          this.signinErrorMessage = err.error.message
          this.isBtnSubmit = false;
        }
      }
      )
    }
  }
}
