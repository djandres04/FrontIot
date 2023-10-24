import {Component, Input} from '@angular/core';
import {LightService} from "../../../services/light/light.service";

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent {
  @Input() lightData: any[] =[];

  constructor(
    private lightService:LightService
  ) {
  }

  toggleLightStatus(id: string, currentStatus: string) {
    // Encuentra el elemento en lightData con el ID correspondiente
    const lightToToggle = this.lightData.find((light: { id: string; }) => light.id === id);
    let token = "";

    if (lightToToggle){
      // Realiza el toggle del estado
      lightToToggle.status = currentStatus === 'True' ? 'False' : 'True';

      this.lightService.postStatus(id,lightToToggle.status).subscribe();
    }
  }
}
