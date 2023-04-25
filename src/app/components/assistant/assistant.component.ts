import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {
  @Input() obj: any;

  constructor(

  ) {}

  ngOnInit() {}

}
