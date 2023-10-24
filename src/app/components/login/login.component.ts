import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { configUrl } from 'src/env/config';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{


  formLogin:FormGroup=new FormGroup({});


  ngOnInit():void{
    this.formLogin = this.fb.group(
      {
        valueEmail: ['',Validators.required],
        valuePassword: ['', Validators.required],
      });
  };

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

  loginPost(){


    if (this.formLogin.invalid){
      this.formLogin.markAllAsTouched();
      for (const key in this.formLogin.controls){
        this.formLogin.controls[key].markAsDirty()

      }
      return;
    }
    const {valueEmail, valuePassword} = this.formLogin.value;

    const body = {"email":valueEmail,"password":valuePassword};

    this.http.post(configUrl.login, body, this.httpOptions).subscribe({
      next:(response:any) =>{
        if (response && response.access_token){
         localStorage.setItem('token',response.access_token)
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  register(){
    this.router.navigate(['register'])
  }

  recover(){
    this.router.navigate(['forgot-password'])
  }


}
