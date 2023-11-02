import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { configUrl } from 'src/env/config';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login/login.service";
import {LoginUser} from "../../models/loginUser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  badcredentials:boolean=false;

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
    private loginService:LoginService
  ) {
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

    const body:LoginUser = {"email":valueEmail,"password":valuePassword};

    this.loginService.postLogin(body).subscribe((loginSuccessful) => {
      if (loginSuccessful) {
        this.router.navigate(['dashboard'])
      } else {
        this.badcredentials=true;
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
