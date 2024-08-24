import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainBtnComponent } from "../../shared/main-btn/main-btn.component";
import { AlertErrorComponent } from "../../shared/alert-error/alert-error.component";
import { confirmPassword } from '../../shared/utilites/confirm-password-utlis';
import { signupValidators } from '../../shared/alert-error/validators/register-validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MainBtnComponent, ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  register = new FormGroup({
    name: new FormControl(null, signupValidators.name),
    email: new FormControl(null, signupValidators.email),
    password: new FormControl(null, signupValidators.password),
    rePassword: new FormControl(null)
  }, confirmPassword)



  sendData() {
    if (this.register.valid) {
      console.log(this.register);
    }

  }
}
