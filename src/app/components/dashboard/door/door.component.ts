import {Component, Input} from '@angular/core';
import {DoorService} from "../../../services/door/door.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css']
})
export class DoorComponent {
  @Input() doorData: any[] =[];

  constructor(
    private doorService:DoorService,
    private router:Router
  ) {
  }

  toggleDoorStatus(id: string, currentStatus: string) {
    // Encuentra el elemento en lightData con el ID correspondiente
    const lightToToggle = this.doorData.find((door: { id: string; }) => door.id === id);

    if (lightToToggle){
      // Realiza el toggle del estado
      lightToToggle.status = currentStatus === 'True' ? 'False' : 'True';

      this.doorService.postStatus(id,lightToToggle.status);
    }
  }

}
