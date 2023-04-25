import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup-assist',
  templateUrl: './signup-assist.component.html',
  styleUrls: ['./signup-assist.component.css'],
  
})
export class SignupAssistComponent implements OnInit { 
  signupForm: FormGroup;
  assistance: any = {};
  path: string;
  pdfPreview: any;
  msgError: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
  ) {}

  ngOnInit() {
    this.path = this.router.url;
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern]],
      adress: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      birthday: ["", [Validators.required]],
      cv: [""],

    })

  }

  signupAssistance(){
    console.log("obj from signup inputs : ", this.signupForm.value);
    
    this.signupForm.value.role = (this.path == "/assistSubscription") ? "assistance" : ((this.path == "/userSubscription") ? "user" : "admin");
    this.signupForm.value.status = "not confirmed";
    this.userService.signupAssistance(this.signupForm.value, this.signupForm.value.cv).subscribe(
      (callback)=>{
        console.log("here response from BE", callback);
        if (callback.message == "ERROR") {
          this.msgError = "Email Exist";
        } else {
          this.router.navigate(["login"]);
          
        }

      }
    )
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ cv: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      // Store the PDF file data in a variable for further use, e.g., uploading to a server
      const pdfData = reader.result as ArrayBuffer;
      // Display the PDF file preview, e.g., using a library like ngx-extended-pdf-viewer
      this.pdfPreview = pdfData;
    };
    reader.readAsArrayBuffer(file);
  }

  

}
