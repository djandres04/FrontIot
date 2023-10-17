import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { configUrl } from 'src/env/config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formRegister:FormGroup=new FormGroup({});

  constructor(
      private router:Router,
      private fb:FormBuilder,
      private http:HttpClient
  ) {
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  ngOnInit():void{
    this.formRegister = this.fb.group({
      valueFirstname:['',Validators.required],
      valueLastname:['',Validators.required],
      valueEmail:['',[Validators.required, Validators.email]],
      valuePassword: ['', Validators.required],
      valueConfirmPassword: ['', Validators.required],
    },{validator:this.passwordMatchValidator}
        );
  };

  onSubmit(){

    if (this.formRegister?.valid) {
      const {valueFirstname, valueLastname, valueEmail, valuePassword} = this.formRegister.value;

      const body={
        "email":valueEmail,
        "password":valuePassword,
        "first_name":valueFirstname,
        "last_name":valueLastname,
      }
      this.http.post(configUrl.register, body, this.httpOptions).subscribe({
        next:(response:any) =>{
          if (response && response.message){
            this.router.navigate(['login']);
          } else {
            this.router.navigate(['register']);
          }
        }
      });

    }
  }


  passwordMatchValidator: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} | null => {
    const password = control.get('valuePassword');
    const confirmPassword = control.get('valueConfirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  };

  loginReg(){
    this.router.navigate(['login'])
  }

}
