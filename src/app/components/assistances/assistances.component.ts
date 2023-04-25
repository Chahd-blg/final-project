import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-assistances',
  templateUrl: './assistances.component.html',
  styleUrls: ['./assistances.component.css']
})
export class AssistancesComponent implements OnInit {
  allAssistant: any = [];
  
  constructor(
    private userservice:UsersService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.userservice.getAssistances().subscribe(
      (data)=>{
        this.allAssistant= data.assistances
        console.log("here into pbj from be ",data.assistances);
        
      }
    );
  }
  getAssitInfo(idAssist : number){
    this.router.navigate([`assistInfo/${idAssist}`]);
  }

}
