import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {Router} from "@angular/router";
import {HttpEvent, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  dataFromServer: any;

  constructor(
    private dashboardService:DashboardService,
    private router:Router
  ) {}

  ngOnInit() {
    this.getAllPosts()
  }

  getAllPosts(){
    let token= localStorage.getItem('token');

    if(token){
      this.dashboardService.getPosts(token).subscribe((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(event.body)
          this.dataFromServer = event.body;
        }
      });
    }else {
      this.router.navigate(['login']);
    }



  }


}
