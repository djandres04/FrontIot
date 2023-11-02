import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RegisterUser} from "../../models/registerUser";
import {configUrl} from "../../../env/config";
import {ApiResponse} from "../../models/apiResponse"; // Asume que tienes una interfaz ApiResponse
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  postRegister(body: RegisterUser): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<ApiResponse>(configUrl.register, body, { headers }).pipe(
      map((response: ApiResponse) => response.message === 'User created')
    );
  }
}
