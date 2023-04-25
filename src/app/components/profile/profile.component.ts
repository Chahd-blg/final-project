import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profilForm: FormGroup;
  user: any = {};

  oldPassword: string;
  newPassword: string;
  id:any;




  constructor(
    private userService: UsersService,
  ) { }

  ngOnInit() {
    const userId = localStorage.getItem('UserId');
    this.id = userId;

    this.userService.getUserByID(this.id).subscribe(
      (data)=>{
        // console.log("resp from backend user to find", data);
        this.user = data.user
        // console.log("user found in db",this.user);
      }
    )
  }

  // editProfile() {
    
  //   let userToEdit = {
  //     UserId  : this.id ,
  //     oldPassword : this.oldPassword,
  //     newPassword : this.newPassword,
  // }
  // console.log( userToEdit);
  
  //   this.userService.editProfile(userToEdit).subscribe(
  //     (doc) => {
  //       if (doc) {
  //         this.user = doc.savedUser
  //       } else {
  //         alert (doc.error)
  //       }
  //      }
  //   )
    
  // }

}
