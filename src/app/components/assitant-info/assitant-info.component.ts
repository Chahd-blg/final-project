import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { DomSanitizer } from '@angular/platform-browser';
//DomSanitizer service to mark the URL as safe and bypass the XSS protection
@Component({
  selector: 'app-assitant-info',
  templateUrl: './assitant-info.component.html',
  styleUrls: ['./assitant-info.component.css']
})
export class AssitantInfoComponent implements OnInit {
  id: any = {};
  assistant : any = {};
  cvUrl: any ;

  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get("id");
    // console.log(this.id);
    this.userService.getUserByID(this.id).subscribe(
      (data)=>{
        this.assistant = data.user
        //encodeURI() is a built-in JavaScript function that is used to encode a URI (Uniform Resource Identifier) by replacing certain characters with their respective UTF-8 escape sequences.
        this.cvUrl = encodeURI(this.assistant.cv);
        //bypassSecurityTrustResourceUrl() method is called with the URL as its argument.
        this.cvUrl= this.sanitizer.bypassSecurityTrustResourceUrl(this.cvUrl);

        // console.log(this.cvUrl); 
        // console.log("here into data of assist from DB", this.assistant);
        
      },
    )

  }

}
