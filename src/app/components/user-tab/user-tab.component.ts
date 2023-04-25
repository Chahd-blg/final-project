import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit {
  users : any = [];
  constructor(
    private userService : UsersService,
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (data)=>{
        this.users= data.user
        console.log("here into pbj from be ",data.user);
        
      }
    );
  }

}
