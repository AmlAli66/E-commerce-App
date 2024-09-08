import { Component, inject, OnInit } from '@angular/core';
import { AlertErrorComponent } from "../../shared/alert-error/alert-error.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { signupValidators } from '../../shared/validators/register-validator';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [AlertErrorComponent, ReactiveFormsModule, NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  isBtnSubmit: boolean = false;
  signinErrorMessage: string = "";
  steps: number = 1;

  forgotPassword = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  verifyResetCode = new FormGroup({
    resetCode: new FormControl(null, Validators.required)
  })
  resetPassword = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, signupValidators.password)
  })



  submitStep1() {
    this.isBtnSubmit = true;

    if (this.forgotPassword.valid) {
      let email: any = this.forgotPassword.get('email')?.value;
      this.resetPassword.get('email')?.setValue(email)
      this._AuthService.forgotPassword(this.forgotPassword.value).subscribe({
        next: (res) => {
          this.steps = 2;
          localStorage.setItem('currentStep', this.steps.toString())
          localStorage.setItem('currentEmail', email)
          this.isBtnSubmit = false;
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

  submitStep2() {
    this.isBtnSubmit = true;

    if (this.verifyResetCode.valid) {
      this._AuthService.verifyResetCode(this.verifyResetCode.value).subscribe({
        next: (res) => {
          this.steps = 3;
          localStorage.setItem('currentStep', this.steps.toString())
          this.isBtnSubmit = false;
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

  submitStep3() {
    this.isBtnSubmit = true;

    if (this.resetPassword.valid) {
      this._AuthService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.steps = 3;
          localStorage.setItem('token', res.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['/home'])
          this.isBtnSubmit = false;
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
  ngOnInit(): void {
    this.steps = Number(localStorage.getItem('currentStep')) || 1
    let currentEmail: any = localStorage.getItem('currentEmail')
    this.resetPassword.get('email')?.setValue(currentEmail)
  }

  // submitStep(formName: FormGroup, step: number = 1) {
  //   this.isBtnSubmit = true;
  //   if (formName.valid) {
  //     if (step == 1) {
  //       let email: any = this.forgotPassword.get('email')?.value;
  //       this.forgotPassword.get('email')?.setValue(email)
  //       this._AuthService.forgotPassword(this.forgotPassword.value).subscribe({
  //         next: (res) => {
  //           this.steps = 2;
  //           localStorage.setItem('currentStep', this.steps.toString())
  //           localStorage.setItem('currentEmail', email)
  //           this.isBtnSubmit = false;
  //         }
  //         , error: (err: HttpErrorResponse) => {
  //           console.log('err');
  //           this.signinErrorMessage = err.error.message
  //           this.isBtnSubmit = false;
  //         }
  //       })
  //     }
  //     if (step == 2) {
  //       this._AuthService.verifyResetCode(this.verifyResetCode.value).subscribe({
  //         next: (res) => {
  //           this.steps = 3;
  //           localStorage.setItem('currentStep', this.steps.toString())
  //           localStorage.setItem('token', res.token);
  //           this.isBtnSubmit = false;
  //         }
  //         , error: (err: HttpErrorResponse) => {
  //           console.log('err');
  //           this.signinErrorMessage = err.error.message
  //           this.isBtnSubmit = false;
  //         }
  //       }
  //       )
  //     }
  //     if (step == 3) {
  //       this._AuthService.resetPassword(this.resetPassword.value).subscribe({
  //         next: (res) => {
  //           this.steps = 3;
  //           localStorage.setItem('token', res.token);
  //           this._AuthService.saveUserData();
  //           this._Router.navigate(['/home'])
  //           this.isBtnSubmit = false;
  //         }
  //         , error: (err: HttpErrorResponse) => {
  //           console.log('err');
  //           this.signinErrorMessage = err.error.message
  //           this.isBtnSubmit = false;
  //         }
  //       }
  //       )
  //     }
  //   }
  // }


}
