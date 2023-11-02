import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { configUrl } from 'src/env/config';
import {RegisterUser} from "../../models/registerUser";
import {RegisterService} from "../../services/register/register.service";
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formRegister:FormGroup=new FormGroup({});
  messages: any[] = [];
  emailUsing:boolean=false;

  constructor(
      private router:Router,
      private fb:FormBuilder,
      private registerService:RegisterService,
      private messagesModule: MessagesModule
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

      const body:RegisterUser={
        "email":valueEmail,
        "password":valuePassword,
        "first_name":valueFirstname,
        "last_name":valueLastname,
      }

      this.registerService.postRegister(body).subscribe((result: boolean) => {
        if (result) {
          console.log("sucessfully")
          this.addSuccessMessage('Usuario creado exitosamente');
          this.router.navigate(['login'])
        } else {
          this.emailUsing = true;
          console.log("bad")
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

  addSuccessMessage(detail: string) {
    this.messages = [{ severity: 'success', summary: 'Éxito', detail }];
    setTimeout(() => {
      this.clearMessages();
      this.router.navigate(['login']); // Redirigir al componente de inicio de sesión
    }, 5000);
  }

  clearMessages() {
    this.messages = [];
  }
}
