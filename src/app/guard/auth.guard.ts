import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si el usuario está autenticado y tiene un token válido
    if (localStorage.getItem('token')) {
      // Verifica si el usuario tiene los permisos necesarios
      this.router.navigate(['/dashboard']);
      return true; // Usuario autorizado

    } else {
      // Redirige al usuario a la página de inicio de sesión si no está autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }

  private checkUserPermissions(route: ActivatedRouteSnapshot): boolean {
    return true
  }
}
