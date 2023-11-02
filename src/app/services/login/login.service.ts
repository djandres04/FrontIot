import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {configUrl} from "../../../env/config";
import {map} from "rxjs/operators";
import {LoginUser} from "../../models/loginUser";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  postLogin(body: LoginUser): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(configUrl.login, body, {headers}).pipe(
      map((response: any) => {
        if (response && response.message === 'bad credentials') {
          return false;
        } else if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/dashboard']);
          return true;
        } else {
          return false;
        }
      })
    );
  }
}

