import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {configUrl} from "../../../env/config";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http:HttpClient
  ) { }


  getPosts(token:any){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'token':token
    })

    // Construye la solicitud personalizada
    const request = new HttpRequest('GET', configUrl.devices, {
      headers: headers,
      responseType: 'json' // Puedes ajustar esto según el tipo de respuesta esperado
    });


    return this.http.request(request)
  }

}
