import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchForm : FormGroup
  foundedAssistant: any = [];
  errorMsg:any;
  constructor(
    private formBuilder : FormBuilder,
    private userService : UsersService,
    private router : Router
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      firstName : [""],
    });
  }

  searchAssistant(){
    console.log(this.searchForm.value);
    
    this.userService.searchAssistant(this.searchForm.value).subscribe(
      (doc)=>{
        console.log("obj from db",doc);
        this.foundedAssistant = doc.assistant;
        this.errorMsg = doc.message;
      },
    )
  }

    getAssitInfo(idAssist : number){
    this.router.navigate([`assistInfo/${idAssist}`]);
  }


}
