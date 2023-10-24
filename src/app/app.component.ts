import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontiot';

  constructor() {
    // Verifica si hay un token en localStorage al cargar la aplicación
    this.checkAndRemoveToken();
  }

  @HostListener('beforeunload', ['$event'])
  onBeforeUnload(event: Event): void {
    // Maneja la eliminación del token al cerrar la pestaña o la ventana
    this.removeToken();
  }

  checkAndRemoveToken(): void {
    const token = localStorage.getItem('token'); // Reemplaza 'mi_token' con el nombre de tu token
    if (token) {
      // Token encontrado, elimínalo
      this.removeToken();
    }
  }

  removeToken(): void {
    localStorage.removeItem('token'); // Reemplaza 'mi_token' con el nombre de tu token
  }

}
