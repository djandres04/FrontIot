import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {configUrl} from "../../../env/config";
import {ApiResponse} from "../../models/apiResponse";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DoorService {

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  postStatus(id:any,doorStatus:any){
    let token:any = localStorage.getItem('token');
    const dataToSend = {id, topic: 'door', status: doorStatus };

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`, // Ejemplo de encabezado de autorización
      'Content-Type': 'application/json', // Tipo de contenido
      'token':token
    });

    // Realizar la solicitud POST para actualizar el estado en el servidor
    this.http.post<ApiResponse>(configUrl.door,  dataToSend, {headers}).subscribe(
      (response) => {
        if (response.message === 'Signature has expired') {
          // Redirigir al usuario a la página de inicio de sesión
          this.router.navigate(['login']);
        } else {
          // Aquí puedes manejar la respuesta del POST si es necesario
          return console.log(response);
        }
      },
      (error) => {
        // Manejar otros errores de la solicitud
        console.log(error);

      }
    );
  }

    addDoor(id:string){
        let token:any = localStorage.getItem('token');
        const dataToSend = {id, topic: 'door' };

        const headers = new HttpHeaders({
            "Authorization": `Bearer ${token}`, // Ejemplo de encabezado de autorización
            'Content-Type': 'application/json', // Tipo de contenido
            'token':token
        });

        const body={
            'id':id
        }

        this.http.post(configUrl.doorAdd,body,{headers})
    }

  editDoor(id:string, ubication:string){
    let token:any = localStorage.getItem('token');

    const headers = new HttpHeaders({
        "Authorization": `Bearer ${token}`, // Ejemplo de encabezado de autorización
        'Content-Type': 'application/json', // Tipo de contenido
        'token':token
    });

    const body={
      'id':id,'ubication':ubication
    }


    this.http.put(configUrl.doorEdit,body,{headers})
  }

  deleteDoor(id:string){
      let token:any = localStorage.getItem('token');
      const dataToSend = {id, topic: 'door' };

      const headers = new HttpHeaders({
          "Authorization": `Bearer ${token}`, // Ejemplo de encabezado de autorización
          'Content-Type': 'application/json', // Tipo de contenido
          'token':token
      });

      this.http.delete(configUrl.doorDelete + id ,{headers})

  }



}
