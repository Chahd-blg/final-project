import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  user: any = {};
  path: string;
  imagePreview: any;
  msgError: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
  ) { }

  ngOnInit() {
    this.path = this.router.url;
    console.log(this.path);


    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern]],
      tel: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      adress: ["", [Validators.required]],
      img: [""],

    })
  }

  
  signupUser() {
    console.log("obj from signup inputs : ", this.signupForm.value);
    
    this.signupForm.value.role = (this.path == "/userSubscription") ? "user" : ((this.path == "/admin") ? "admin" : "assistance");

    this.userService.signupUser(this.signupForm.value, this.signupForm.value.img).subscribe(
      (response) => {
        console.log("here response from BE", response);
        if (response.message == "ERROR") {
          this.msgError = "Email Exist";
        } else {
          this.router.navigate(["login"]);
        }
      });
  }

   
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

}
