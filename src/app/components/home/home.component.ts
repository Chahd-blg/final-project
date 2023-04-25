import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeAssistances: any = [];


  constructor(
    private userservice:UsersService,

  ) { }

  ngOnInit() {
    this.userservice.getAssistances().subscribe(
      (data)=>{        
        this.homeAssistances=data.assistances.slice(0,6);
      }
    )
  }

}
