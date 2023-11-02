import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {DoorService} from "../../../services/door/door.service";

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
    const doorToToggle = this.doorData.find((door: { id: string; }) => door.id === id);

    if (doorToToggle){
      // Realiza el toggle del estado
      doorToToggle.status = currentStatus === 'True' ? 'False' : 'True';

      this.doorService.postStatus(id,doorToToggle.status)
    }
  }
}
