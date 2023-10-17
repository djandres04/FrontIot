import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {  }

  isAuthenticated(){
    let auth = localStorage.getItem('auth');

    if (auth){
      return true
    }else{
      return false
    }
  }
}
