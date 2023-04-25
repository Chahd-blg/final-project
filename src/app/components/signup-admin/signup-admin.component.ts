import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  signupadminForm : FormGroup ; 
  path: any;
  msgError :any;

  constructor(
    private userService : UsersService,
    private router : Router,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.path = this.router.url;
    console.log(this.path);


    this.signupadminForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern]],
  })
}
signupAdmin(){
  this.signupadminForm.value.role = (this.path == "/adminSubscription") ? "admin" : ((this.path == "/userSubscription") ? "user" : "assistance");

this.userService.signupAdmin(this.signupadminForm.value).subscribe(
  (response) => {
    console.log("here response from BE", response);
    if (response.message == "Error saving user") {
      this.msgError = "Email Exist";
    } else {
      this.router.navigate(["login"]);
    }
  });
  

}





}
