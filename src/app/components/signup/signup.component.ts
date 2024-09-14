import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainBtnComponent } from "../../shared/main-btn/main-btn.component";
import { AlertErrorComponent } from "../../shared/alert-error/alert-error.component";
import { confirmPassword } from '../../shared/utilites/confirm-password-utlis';
import { signupValidators } from '../../shared/validators/register-validator';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MainBtnComponent, ReactiveFormsModule, AlertErrorComponent, NgClass, TranslateModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  private readonly _AuthService = inject(AuthService);


  private readonly _Router = inject(Router);
  isBtnSubmit: boolean = false;
  registerErrorMessage: string = "";

  register = new FormGroup({
    name: new FormControl(null, signupValidators.name),
    email: new FormControl(null, signupValidators.email),
    password: new FormControl(null, signupValidators.password),
    rePassword: new FormControl(null)
  }, confirmPassword)



  sendData() {
    this.isBtnSubmit = true;

    if (this.register.valid) {
      this._AuthService.signup(this.register.value).subscribe({
        next: (res) => {
          if (res.message == "success") {
            this._Router.navigate(['/login'])
            this.isBtnSubmit = false;
          }
        }
        , error: (err: HttpErrorResponse) => {
          console.log('err');
          this.registerErrorMessage = err.error.message
          this.isBtnSubmit = false;
        }
      }
      )
    }
    // else {
    //   this.register.get('rePassword')?.setValue(""); //error  
    //   this.register.markAllAsTouched()
    // }
    //Optional: when click on Register button show error alert on all input 
    //we can apply this if we didn't apply disabled button until the form is filled correctly
  }
}
