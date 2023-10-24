import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {configUrl} from "../../../env/config";

@Injectable({
  providedIn: 'root'
})
export class LightService {

  constructor(
    private http:HttpClient
  ) { }


  postStatus(id:any,lightStatus:any){
    let token:any = localStorage.getItem('token');
    const dataToSend = {id, topic: 'light', status: lightStatus };

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`, // Ejemplo de encabezado de autorización
      'Content-Type': 'application/json', // Tipo de contenido
      'token':token
    });

    console.log('JSON a enviar:', dataToSend);

    // Realizar la solicitud POST para actualizar el estado en el servidor
    return this.http.post(configUrl.light,  dataToSend, {headers});
  }
}
