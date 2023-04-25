import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-assistant-tab',
  templateUrl: './assistant-tab.component.html',
  styleUrls: ['./assistant-tab.component.css']
})
export class AssistantTabComponent implements OnInit {
  assistants: any = [];
  message:string;

  constructor(
    private userService: UsersService,
  ) { }

  ngOnInit() {
    this.userService.getAssistances().subscribe(
      (data) => {
        this.assistants = data.assistances
        // console.log("here into pbj from be ", data.assistances);
      }
    );
    this.userService.getAssitById
  }

  updateStatus(id) {
    this.userService.updateStatus(id).subscribe(
      (doc) => {
        this.message = doc.message;
        for (let i = 0; i < this.assistants.length; i++) {
          if (this.assistants[i]._id == doc.newAssistant._id) {
            this.assistants[i].status = doc.newAssistant.status;
          }
        }
      }
    )
  }

}
