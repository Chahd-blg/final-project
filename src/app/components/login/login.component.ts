import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  user: any = {};
  errormsg: string;
  userIsAuthenticated = false;



  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:["",[Validators.email]],
      tel: ["", [ Validators.minLength(8), Validators.maxLength(8)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12),Validators.pattern]],

    });

    
  }

  login(){
    console.log("here into login obj",this.loginForm.value);
    let obj=this.loginForm.value;
    this.userService.login(obj);
    this.errormsg = this.userService.getErrorMsg()

  
  }

}
